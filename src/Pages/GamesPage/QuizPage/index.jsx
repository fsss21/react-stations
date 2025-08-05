import { useState, useEffect, useRef, useCallback } from 'react';
import { useNavigate } from 'react-router';

import { useSelector } from 'react-redux';

import styles from './QuizPage.module.css';
import GamesMenu from '../../../components/GamesMenu/index.jsx';
import Footer from '../../../components/Footer/index.jsx';
import QuizModal from './QuizModal';
import { useLanguage } from '../../../LanguageContext';

const QuizPage = () => {
  const navigate = useNavigate();
  const { isEnabled } = useSelector((state) => state.accessibility);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  const [showCorrectAnswer, setShowCorrectAnswer] = useState(false);
  const [correctAnswersCount, setCorrectAnswersCount] = useState(0);
  const [gameSeconds, setGameSeconds] = useState(0);
  const timerRef = useRef(null);
  const { data = {} } = useLanguage();
  const quizData = data.quizData || [];
  const correctAnswersRef = useRef(0);
  const totalQuestionsRef = useRef(quizData.length);
  
  correctAnswersRef.current = correctAnswersCount;

  const currentQuestion = quizData[currentQuestionIndex];

  useEffect(() => {
    return () => {
      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }
    };
  }, []);

  const handleAnswerSelect = (answerId) => {
    if (currentQuestion.multiAnswer) {
      if (selectedAnswers.includes(answerId)) {
        setSelectedAnswers(selectedAnswers.filter((id) => id !== answerId));
      } else {
        setSelectedAnswers([...selectedAnswers, answerId]);
      }
    } else {
      setSelectedAnswers([answerId]);
    }
  };

  const checkAnswer = () => {
    const correctAnswers = currentQuestion.answers.filter((answer) => answer.correct).map((answer) => answer.id);

    const isAnswerCorrect = selectedAnswers.length === correctAnswers.length && selectedAnswers.every((answer) => correctAnswers.includes(answer));

    setIsCorrect(isAnswerCorrect);
    setShowModal(true);

    if (isAnswerCorrect) {
      // Используем функциональное обновление для получения актуального значения
      setCorrectAnswersCount(prev => {
        const newCount = prev + 1;
        // Сохраняем новое значение в ref
        correctAnswersRef.current = newCount;
        return newCount;
      });

      // Автоматический переход при правильном ответе через 3 секунды
      timerRef.current = setTimeout(() => {
        goToNextQuestion();
      }, 3000);
    }
  };

  const handleRevealCorrectAnswer = () => {
    setShowModal(false);
    setShowCorrectAnswer(true);

    // Автоматический переход после показа правильного ответа
    timerRef.current = setTimeout(() => {
      goToNextQuestion();
    }, 2000);
  };

  const getResultCategory = (correct, total) => {
    const percentage = Math.round((correct / total) * 100);
    
    if (percentage === 100) return 'excellent';
    if (percentage >= 75) return 'good';
    if (percentage >= 50) return 'medium';
    if (percentage >= 25) return 'basic';
    return 'beginner';
  };

   const goToNextQuestion = useCallback(() => {
    if (timerRef.current) {
      clearTimeout(timerRef.current);
      timerRef.current = null;
    }

    setSelectedAnswers([]);
    setShowModal(false);
    setShowCorrectAnswer(false);

    if (currentQuestionIndex < quizData.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      // Используем ref для получения актуальных значений
      const finalCorrectCount = correctAnswersRef.current;
      const totalQuestions = totalQuestionsRef.current;
      
      const category = getResultCategory(
        finalCorrectCount, 
        totalQuestions
      );

      navigate('/congrats', {
        state: {
          game: 'викторина',
          score: finalCorrectCount,
          total: totalQuestions,
          time: gameSeconds,
          category: category
        }
      });
    }
  }, [currentQuestionIndex, quizData.length, navigate, gameSeconds]);

  const handleTryAgain = () => {
    if (timerRef.current) {
      clearTimeout(timerRef.current);
      timerRef.current = null;
    }
    setShowModal(false);
    setSelectedAnswers([]);
  };

  useEffect(() => {
    const timer = setInterval(() => {
      setGameSeconds((prev) => prev + 1);
    }, 3000);

    return () => clearInterval(timer);
  }, []);

  const basicQuestion = styles.question;
  const enabledQuestion = isEnabled ? styles.enabled_question : '';
  const basicContent = styles.content;
  const enabledContent = isEnabled ? styles.enabled_content : '';

  return (
    <>
      <section className={styles.container}>
        <GamesMenu correctAnswersCount={correctAnswersRef.current}  totalQuestions={quizData.length} />
        <div className={`${basicContent} ${enabledContent}`}>
          <div className={`${basicQuestion} ${enabledQuestion}`}>
            <span className={styles.number}>вопрос №{currentQuestion.id}</span>
            <span className={styles.text}>
              <span dangerouslySetInnerHTML={{ __html: currentQuestion.question }}></span>
              <br />
              <span className={styles.info}>{currentQuestion?.info}</span>
            </span>
            {currentQuestion.image && (
              <div className={styles.imageContainer}>
                <img src={currentQuestion?.image} alt="Иллюстрация к вопросу" className={styles.questionImage} />
              </div>
            )}
          </div>
          <div className={styles.answers}>
            {currentQuestion.answers.map((answer) => {
              const isSelected = selectedAnswers.includes(answer.id);
              const showAsCorrect = showCorrectAnswer && answer.correct;
              const showAsIncorrect = showCorrectAnswer && isSelected && !answer.correct;

              return (
                <button
                  key={answer.id}
                  className={`${styles.answer} 
                    ${isSelected ? styles.selected : ''}
                    ${showAsCorrect ? styles.correct : ''}
                    ${showAsIncorrect ? styles.incorrect : ''}
                  `}
                  onClick={() => handleAnswerSelect(answer.id)}
                >
                  {answer.id}. {answer.text}
                </button>
              );
            })}
            <div className={styles.buttons}>
              <button
                className={styles.button}
                disabled={currentQuestionIndex === 0}
                onClick={() => {
                  if (timerRef.current) {
                    clearTimeout(timerRef.current);
                    timerRef.current = null;
                  }
                  setCurrentQuestionIndex(Math.max(0, currentQuestionIndex - 1));
                  setSelectedAnswers([]);
                  setShowCorrectAnswer(false);
                }}
              >
                предыдущий <br /> вопрос
              </button>
              <button className={styles.button} disabled={selectedAnswers.length === 0} onClick={checkAnswer}>
                ответить
              </button>
              <button
                className={styles.button}
                disabled={currentQuestionIndex === quizData.length - 1}
                onClick={() => {
                  if (timerRef.current) {
                    clearTimeout(timerRef.current);
                    timerRef.current = null;
                  }
                  setCurrentQuestionIndex(currentQuestionIndex + 1);
                  setSelectedAnswers([]);
                  setShowCorrectAnswer(false);
                }}
              >
                следующий <br /> вопрос
              </button>
            </div>
          </div>
        </div>
        <Footer />
      </section>

      {showModal && <QuizModal isCorrect={isCorrect} onTryAgain={handleTryAgain} onRevealCorrectAnswer={handleRevealCorrectAnswer} autoClose={isCorrect} />}
    </>
  );
};

export default QuizPage;
