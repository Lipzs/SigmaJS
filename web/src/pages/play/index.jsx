import React, { useState, useEffect } from 'react';
import Header from '../../components/header';
import { Link } from 'react-router-dom';

import happy from '../../assets/working.png';
import sad from '../../assets/sad.png';

import {
  Button,
  Progress,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
} from '@chakra-ui/react';

import questionService from '../../services/questionService';
import apiService from '../../services/apiService';

import './styles.css';

export default function Play() {
  const [questionNumber, setQuestionNumber] = useState(0);
  const [questions, setQuestions] = useState([]);
  const [answeredQuestions, setAnsweredQuestions] = useState([]);
  const [progressValue, setProgressValue] = useState(0);
  const [score, setScore] = useState('');
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [message, setMessage] = useState('');
  const [modalImg, setModalImg] = useState(happy);
  const [error, setError] = useState(false);

  const questionsPerPage = 1;

  async function awserQuestion(alternativeValue, idQuestion) {
    if (questionNumber < 9) {
      setQuestionNumber(questionNumber + 1);
    } else if (questionNumber === 9) {
      try {
        const newArray = questionService(
          idQuestion,
          alternativeValue,
          questions
        );
        setAnsweredQuestions(newArray);
        const attempt = await apiService.post('/answers', {
          stack: answeredQuestions[0],
        });
        console.log(attempt.data);
        setScore(attempt.data.ranking.scores);
        if (score < 6) {
          setMessage('Não fique triste, tente novamente!');
          setModalImg(sad);
        } else {
          setModalImg(happy)
          setMessage('Parabéns!!!');
        }
        onOpen();
      } catch (error) {
        console.log(error)
        setMessage('Não foi possivel concluir sua tentativa');
        setError(true);
        setModalImg(sad);
        onOpen();
      }
    }
    setProgressValue(progressValue + 10);
    const newArray = questionService(idQuestion, alternativeValue, questions);
    setAnsweredQuestions(newArray);
  }

  async function getQuestions() {
    try {
      const questionRequestResponse = await apiService.get('/getQuestions');
      setQuestions(questionRequestResponse.data.data);
      console.log(questionRequestResponse.data);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    getQuestions();
  }, []);

  return (
    <>
      <Header />
      <div className="questionContainer">
        {questions
          .slice(
            questionNumber * questionsPerPage,
            questionNumber * questionsPerPage + questionsPerPage
          )
          .map((question, index) => {
            return (
              <>
                <div className="questionBox">
                  <div className="questionNumber">
                    <span>{questionNumber + 1}</span>
                  </div>
                  <div className="question">
                    <h1>{question.question_enunciation}</h1>
                  </div>
                </div>
                <div className="alternativesRow" direction="row">
                  {question.alternatives.map((alternative) => {
                    return (
                      <Button
                        className="alternatives"
                        colorScheme="whatsapp"
                        value={alternative.alternative_value}
                        onClick={(e) => {
                          awserQuestion(e.target.value, question.id_question);
                        }}
                      >
                        {alternative.alternative_value}
                      </Button>
                    );
                  })}
                </div>
              </>
            );
          })}
        <Progress
          value={progressValue}
          className="progress"
          colorScheme="whatsapp"
        />
      </div>

      <Modal
        isCentered
        onClose={onClose}
        isOpen={isOpen}
        motionPreset="slideInBottom"
      >
        <ModalOverlay />
        <ModalContent className="modal">
          <ModalHeader className="modalTitle">Pontuação final</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <div className="pointMessage">
              <h2>{error ? 'Lamentamos,' : `Você fez um total de ${score} pontos` }</h2>
              <h2>{message}</h2>
            </div>
            <div className="pointImg">
              <img src={modalImg} alt="Parabéns" />
            </div>
          </ModalBody>
          <ModalFooter className="modalFooter">
            <Link to="/home">
              <Button colorScheme="whatsapp">Página inicial</Button>
            </Link>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}
