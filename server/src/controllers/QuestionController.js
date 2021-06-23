import db from "../database/index.js";
import Stack from "../struct/Stack.js";

class QuestionController {

  constructor() {
    this.QuestionStack = new Stack();

    this.getQuestions = this.getQuestions.bind(this);
    this.postAnswers = this.postAnswers.bind(this);
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
      const answer = await db("alternative")
        .whereIn('id_alternative', alternativeArray)
        .select('id_alternative', 'correct');

      for(let alt of answer) {
        if(alt.correct) {
          hits += 1;
        }
      }

      await db('ranking')
        .insert({ scores: hits, id_player: user.id_player })
        .returning('*')
          .then((ranking) => {
            rank = ranking[0];
          })
          .catch(err => {
            console.log(err)
          });

      return res.status(200).json({ 
        'acertos: ': hits,
        'usuario' : user,
        'ranking' : rank
      });
    } catch (error) {
      console.log(error);
      return res.status(400).json({ 'error': error })
    }
  }

  async getRank(req, res) {
    try {
      const rankingResult = await db('ranking')
        .select('*')

      return res.status(200).json({ 'ranking': rankingResult })
    } catch (error) {
      console.log(error)
    }
  }
}

export default QuestionController;
