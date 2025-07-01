import { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router'; // Добавляем useNavigate
import styles from './GamesMenu.module.css';
import { useLanguage } from '../../LanguageContext';
import { useSelector } from 'react-redux';
import Header from '../Header';

const GamesMenu = ({
  correctAnswersCount = 0,
  totalQuestions = 10,
  completedPuzzles = 0,
  totalPuzzles = 3,
  activeGame: activeGameFromProps,
  freezeStats = false,
  initialSeconds = 0,
  hideStats = false,
  solvedCrosswords = 0,
  totalCrosswords = 10,
  currentPieces = 0,
  totalPieces = 0
}) => {
  const { isEnabled } = useSelector((state) => state.accessibility);
  const [seconds, setSeconds] = useState(initialSeconds);
  const [isRunning, setIsRunning] = useState(false);
  const location = useLocation();
  const navigate = useNavigate(); // Хук для навигации
  const { data } = useLanguage();

  const getActiveGameFromPath = () => {
    if (location.pathname.includes('/puzzle')) return 'пазлы';
    if (location.pathname.includes('/crossword')) return 'кроссворд';
    if (location.pathname.includes('/quiz')) return 'викторина';
    return null;
  };

  const activeGame = activeGameFromProps || getActiveGameFromPath();

  const formatTime = (totalSeconds) => {
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;
    return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  };

  // Обработчики навигации
  const handlePuzzleClick = () => {
    setSeconds(0); // Сброс таймера
    navigate('/puzzle'); // Переход на страницу пазлов
  };

  const handleCrosswordClick = () => {
    setSeconds(0);
    navigate('/crossword'); // Переход на страницу кроссворда
  };

  const handleQuizClick = () => {
    setSeconds(0);
    navigate('/quiz'); // Переход на страницу викторины
  };

  useEffect(() => {
    if (freezeStats || hideStats) {
      setIsRunning(false);
      return;
    }

    let interval;
    if (activeGame) {
      setIsRunning(true);
      interval = setInterval(() => {
        setSeconds((prev) => prev + 1);
      }, 1000);
    } else {
      setIsRunning(false);
    }

    return () => {
      if (interval) clearInterval(interval);
      if (!activeGame) setSeconds(0);
    };
  }, [activeGame, freezeStats, hideStats]);

  const getAnswersText = () => {
    switch (activeGame) {
      case 'пазлы':
        return `${currentPieces}/${totalPieces} ${data.puzzlesProgress}`;
      case 'кроссворд':
        return `${data.crosswordProgress} ${solvedCrosswords}/${totalCrosswords}`;
      case 'викторина':
        return `${data.quizProgress} ${correctAnswersCount}/${totalQuestions}`;
      default:
        return data.selectGame;
    }
  };

  const basicClass = styles.button;
  const enabledClass = isEnabled ? styles.button_enabled : '';
  const basicTimer = styles.timer;
  const enabledTimer = isEnabled ? styles.timer_enabled : '';

  return (<>
    <Header />
    <div className={styles.container}>
      <div className={styles.buttons}>
        <button
          className={`${`${basicClass} ${enabledClass}`} ${activeGame === 'пазлы' ? (isEnabled ? styles.enabledActive : styles.active) : ''}`}
          onClick={handlePuzzleClick} // Обработчик для пазлов
        >
          {data.tabPuzzles}
        </button>
        <button
          className={`${`${basicClass} ${enabledClass}`} ${activeGame === 'кроссворд' ? (isEnabled ? styles.enabledActive : styles.active) : ''}`}
          onClick={handleCrosswordClick} // Обработчик для кроссворда
        >
          {data.tabCrossword}
        </button>
        <button
          className={`${`${basicClass} ${enabledClass}`} ${activeGame === 'викторина' ? (isEnabled ? styles.enabledActive : styles.active) : ''}`}
          onClick={handleQuizClick} // Обработчик для викторины
        >
          {data.tabQuiz}
        </button>
      </div>

      <div className={`${styles.timer} ${isEnabled ? enabledTimer : basicTimer}`}>
        {!hideStats && (
          <>
            {isEnabled ? (
              <>
              <span className={styles.answersEnabled}>{getAnswersText()}</span>
              <span className={styles.timeEnabled}>{formatTime(seconds)}</span>
              </>
            ) : (
              <>
              <span className={styles.answers}>{getAnswersText()}</span>
              <span className={styles.time}>{formatTime(seconds)}</span>
              </>
            )}
          </>
        )}
      </div>
    </div>
    </>
  );
};

export default GamesMenu;
