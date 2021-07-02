import db from '../database/index.js';
import Stack from '../struct/Stack.js';
import Queue from '../struct/Queue.js';
import ordenator from '../utils/ordenator.js';
import { shuffleArray } from '../utils/ordenator.js';
import verifyAnswers from '../utils/verifyAnswers.js';

class QuestionController {

  constructor() {
    this.QuestionStack = new Stack();
    this.rankingQueue = new Queue(); 

    this.getQuestions = this.getQuestions.bind(this);
    this.postAnswers = this.postAnswers.bind(this);
    this.getRank = this.getRank.bind(this);
  }

  async getQuestions(req, res) {
    try {
      const result = await db('question')
        .join('alternative', 'question.id_question', '=', 'alternative.id_question')
        .select('question.id_question',
          'question.question_enunciation',    
          'alternative.id_alternative',
          'alternative.alternative_value'
        );

      if (!result) {
        return res.status(400).json({ 'message': 'Não foi encontrado resultados' });
      }

      const resultMap = result.reduce((result, row) => {
        result[row.id_question] = result[row.id_question] || {
          ...row,
          alternatives: []
        };

        result[row.id_question].alternatives.push({
          'id_alternative': row.id_alternative,
          'alternative_value': row.alternative_value
        });

        delete result[row.id_question].id_alternative;
        delete result[row.id_question].alternative_value;

        return result;
      }, {});

      const questionsList = Object.values(resultMap);

      for (let question of questionsList) {
        const questionObject = {
          ...question,
          'userAnswer': 0,
          'pontuation': 0
        };

        this.QuestionStack.add(questionObject);
      }

      let returnedData = [];
     
      for (let i = this.QuestionStack.length(); i > 0 ; i--) {
        const question = this.QuestionStack.pop();
        returnedData.push(question);
      }

      res.status(200).json({ 'data': returnedData });
    } catch (error) {
      res.status(400).json({ 
        'message': 'ocorreu um erro ao executar a operação',
        'erro': error
      });

      console.log(error);
    }
  }

  async postAnswers(req, res) {
    const { stack } = req.body;
    const user = req.auth;

    if (verifyAnswers(stack)) {
      return res.status(400).json({
        Response: 'Por favor preencha todos os campos'
      });
    }

    for (let question of stack) {
      this.QuestionStack.add(question);
    }

    let hits = 0;
    let alternativeArray = [];

    for (let i = this.QuestionStack.length(); i > 0 ; i--) {
      const qt = this.QuestionStack.pop();
      const answeredAlternative = qt.alternatives.filter((alternative) => {
        return alternative.alternative_value == qt.userAnswer
      });
     
      alternativeArray.push(answeredAlternative[0].id_alternative);
    }

    try {
      let rank = {}; 
      let idAlternativeCorrectList = [];

      const answer = await db('alternative')
        .whereIn('id_alternative', alternativeArray)
        .select('id_alternative', 'correct');

      for (let alt of answer) {
        if(alt.correct) {
          idAlternativeCorrectList.push(alt.id_alternative);
        }
      }

      for (let question of stack) {
        if (question.alternatives.some(item => {
            return idAlternativeCorrectList.includes(item.id_alternative);
          })) {
          question.pontuation = 1;
        } else {
          question.pontuation = 0;
        }

        this.QuestionStack.add(question);
      }

      for (let i = this.QuestionStack.length(); i > 0 ; i--) {
        const qt = this.QuestionStack.pop();
      
        hits += qt.pontuation;
      }

      await db('ranking')
        .insert({ 
          scores: hits, 
          id_player: user.id_player,
          player_name: user.name
        })
        .returning('*')
          .then((ranking) => {
            rank = ranking[0];
          })
          .catch(err => {
            console.log(err);
            return res.status(500).json({ 'message': 'ocorreu um erro inesperado' });
          });

      return res.status(200).json({ 
        'ranking' : rank
      });
    } catch (error) {
      console.log(error);
      return res.status(400).json({ 
        'message': 'Ocorreu um erro ao inserir o ranking',
        'error': error
      });
    }
  }

  async getRank(req, res) {

    const ordenation = req.query['orderBy'];
    let rankingArray = [];
    let rankingShuffle;

    try {
      const rankingResult = await db('ranking')
        .join('player', 'player.id_player', '=', 'ranking.id_player')
        .select('ranking.id_ranking', 'ranking.player_name',
         'ranking.scores', 'player.photo')
        .orderBy('scores', 'desc')
        .limit(5)

      if (rankingResult.length > 0) {
        rankingShuffle = shuffleArray(rankingResult);
      }  

      for (let rank of rankingShuffle) {
        this.rankingQueue.enqueue(rank);
      }

      if (!this.rankingQueue.isEmpty()) {
        for (let i = this.rankingQueue.length(); i > 0; i--) {
          rankingArray.push(this.rankingQueue.dequeue());
        }
      }

      ordenator(ordenation, rankingArray);

      return res.status(200).json({ 'ranking': rankingArray })
    } catch (error) {
      console.log(error);
      
      return res.status(500).json({ 
        'messagem': 'Ocorreu um erro inesperado',
        'error': error 
      });
    }
  }
}

export default QuestionController;
