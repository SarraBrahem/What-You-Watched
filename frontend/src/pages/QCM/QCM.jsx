import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Header from '../../components/Header/QcmHeader';
import Footer from '../../components/Footer/Footer';
import QcmEndScreen from './QcmEndScreen';
import axios from 'axios';

const Qcm = () => {
  const { type } = useParams();
  const [questions, setQuestions] = useState([]);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [userAnswers, setUserAnswers] = useState([]);
  const [isQuizFinished, setIsQuizFinished] = useState(false);
  const [isAnswerSelected, setIsAnswerSelected] = useState(false);
  const [key, setKey] = useState(0);


  useEffect(() => {
    async function fetchQuestions() {
      try {
        const response = await axios.get(`https://what-you-watched-backend.vercel.app/api/questions/${type}/questions`);
        setQuestions(response.data);
      } catch (error) {
        console.error("Error fetching questions:", error);
      }
    }
    fetchQuestions();
  }, [type]);

  const handleAnswerOptionClick = (answer) => {
    setIsAnswerSelected(true);
    const updatedUserAnswers = [...userAnswers, { [questions[currentQuestion].tags[0]]: answer }];
    setUserAnswers(updatedUserAnswers);

    setTimeout(() => {
      const nextQuestion = currentQuestion + 1;
      if (nextQuestion < questions.length) {
        setCurrentQuestion(nextQuestion);
        setIsAnswerSelected(false);
      } else {
        setIsQuizFinished(true);
      }
    }, 500);
  };

  const handleRestart = () => {
    setIsQuizFinished(false);
    setCurrentQuestion(0);
    setUserAnswers([]);
    setIsAnswerSelected(false);
    setKey(prevKey => prevKey + 1);
  };

  return (
    <div key={key} className='bg-gradient-to-b from-blue-700 to-blue-400'>
      <Header />
      {isQuizFinished ? (
        <QcmEndScreen type={type} userAnswers={userAnswers} onRestart={handleRestart} />
      ) : (
        <div className={`container p-8 transition-all duration-500 transform ${!isAnswerSelected ? 'scale-100' : 'scale-95'}`}>
          <div className="qcm container p-8 text-white">
            {questions.length > 0 && (
              <>
                <div className={`question-section mb-4 transition-opacity duration-500 ${!isAnswerSelected ? 'opacity-100' : 'opacity-0'}`}>
                  <div className="question-count text-lg mb-2">
                    Question {currentQuestion + 1}/{questions.length}
                  </div>
                  <div className="question-text text-xl font-semibold">{questions[currentQuestion].question}</div>
                </div>
                <div className="answer-section grid grid-cols-2 gap-4">
                  {questions[currentQuestion].options.map((answerOption, index) => (
                    <button key={index} onClick={() => handleAnswerOptionClick(answerOption)}
                      className="bg-blue-500 text-white border-2 p-4 rounded hover:bg-blue-700 transition duration-300 ease-in-out">
                      {answerOption}
                    </button>
                  ))}
                </div>
              </>
            )}
          </div>
        </div>
      )}
      <div className='bg-white'>
        <Footer />
      </div>
    </div>
  );
};

export default Qcm;
