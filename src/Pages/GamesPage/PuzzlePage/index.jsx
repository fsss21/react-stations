import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router';
import { useLanguage } from '../../../LanguageContext.jsx';
import CustomPuzzle from './CustomPuzzle';
import ArrowRightIcon from '@mui/icons-material/ArrowRight';
import ArrowLeftIcon from '@mui/icons-material/ArrowLeft'; // Добавлена новая иконка
import styles from './PuzzlePage.module.css';
import GamesMenu from '../../../components/GamesMenu/index.jsx';
import Footer from '../../../components/Footer/index.jsx';

const PuzzlePage = () => {
  const navigate = useNavigate();
  const touchStartX = useRef(0);
  const touchStartY = useRef(0);
  const [selectedPuzzle, setSelectedPuzzle] = useState(null);
  const [selectedDifficulty, setSelectedDifficulty] = useState('medium');
  const [gameStarted, setGameStarted] = useState(false);
  const [completedPuzzles, setCompletedPuzzles] = useState(0);
  const { data = {} } = useLanguage();
  const puzzleData = data.puzzleData;
  const difficultyLevels = data.difficultyLevels;
  const [totalPuzzles, setTotalPuzzles] = useState(puzzleData.length);
  const [gameSeconds, setGameSeconds] = useState(0);
  const [timerActive, setTimerActive] = useState(false);
  const [currentPuzzleTime, setCurrentPuzzleTime] = useState(0);
  const [showHint, setShowHint] = useState(false);
  const [currentSlide, setCurrentSlide] = useState(0); // Новое состояние для слайдера
  const [currentCorrectPieces, setCurrentCorrectPieces] = useState(0);
  const [currentTotalPieces, setCurrentTotalPieces] = useState(0);

  const handleTouchStart = (e) => {
    touchStartX.current = e.touches[0].clientX;
    touchStartY.current = e.touches[0].clientY;
  };

  const handleTouchMove = (e) => {
    if (!touchStartX.current || !touchStartY.current) return;

    const touchX = e.touches[0].clientX;
    const touchY = e.touches[0].clientY;

    const diffX = Math.abs(touchX - touchStartX.current);
    const diffY = Math.abs(touchY - touchStartY.current);

    // Блокируем только горизонтальные свайпы
    if (diffX > diffY && diffX > 10) {
      e.preventDefault();
    }
  };

  // Функции для навигации по слайдеру
  const goToPrevSlide = () => {
    setCurrentSlide((prev) => Math.max(0, prev - 1));
  };

  const goToNextSlide = () => {
    setCurrentSlide((prev) => Math.min(Math.ceil(puzzleData.length / 3) - 1, prev + 1));
  };

  // Вычисляем пазлы для текущего слайда
  const getVisiblePuzzles = () => {
    const startIndex = currentSlide * 3;
    return puzzleData.slice(startIndex, startIndex + 3);
  };

  // Вычисляем количество деталей для текущего уровня сложности
  const getCurrentPuzzlePieces = () => {
    const difficulty = difficultyLevels.find((l) => l.id === selectedDifficulty);
    return difficulty ? difficulty.rows * difficulty.columns : 0;
  };

  const handleStartGame = () => {
    if (selectedPuzzle) {
      setGameStarted(true);
      setTimerActive(true);
      setCurrentPuzzleTime(0);
      setShowHint(false);
      setCurrentCorrectPieces(0);
      setCurrentTotalPieces(getCurrentPuzzlePieces());
    }
  };

  const handlePuzzleComplete = () => {
    navigate('/congrats', {
      state: {
        game: 'пазлы',
        total: totalPuzzles,
        score: completedPuzzles + 1,
        time: currentPuzzleTime
      }
    });

    setCompletedPuzzles((prev) => prev + 1);
    setGameStarted(false);
    setTimerActive(false);

    const updatedPuzzleData = puzzleData.map((puzzle) => (puzzle.id === selectedPuzzle.id ? { ...puzzle, completed: true } : puzzle));
  };

  const handlePuzzleProgress = (correctPieces, totalPieces) => {
    setCurrentCorrectPieces(correctPieces);
    setCurrentTotalPieces(totalPieces);
  };

  const handleBackToSelection = () => {
    setGameStarted(false);
    setTimerActive(false);
    setCurrentCorrectPieces(0);
    setCurrentTotalPieces(0);
  };

  // Таймер
  useEffect(() => {
    let interval;
    if (timerActive) {
      interval = setInterval(() => {
        setGameSeconds((prev) => prev + 1);
        setCurrentPuzzleTime((prev) => prev + 1);
      }, 1000);
    }
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [timerActive]);

  // Загрузка сохраненного прогресса
  useEffect(() => {
    const savedProgress = localStorage.getItem('puzzleProgress');
    if (savedProgress) {
      const { completed, seconds } = JSON.parse(savedProgress);
      setCompletedPuzzles(completed);
      setGameSeconds(seconds);
    }
  }, []);

  // Сохранение прогресса
  useEffect(() => {
    localStorage.setItem(
      'puzzleProgress',
      JSON.stringify({
        completed: completedPuzzles,
        seconds: gameSeconds
      })
    );
  }, [completedPuzzles, gameSeconds]);

  if (!gameStarted) {
    const visiblePuzzles = getVisiblePuzzles();
    const isFirstSlide = currentSlide === 0;
    const isLastSlide = currentSlide === Math.ceil(puzzleData.length / 3) - 1;

    return (
      <section className={styles.container}>
        <GamesMenu hideStats={true} />
        <div className={styles.selectionContainer}>
          <div className={styles.sliderContainer}>
            <button className={`${styles.sliderButton} ${isFirstSlide ? styles.disabled : ''}`} onClick={goToPrevSlide} disabled={isFirstSlide}>
              <ArrowLeftIcon />
            </button>

            <div className={styles.puzzles}>
              {visiblePuzzles.map((puzzle) => (
                <div
                  key={puzzle.id}
                  className={`${styles.puzzleCard} ${selectedPuzzle?.id === puzzle.id ? styles.selected : ''}`}
                  onClick={() => setSelectedPuzzle(puzzle)}
                >
                  <div className={styles.statusIndicator}>{puzzle.completed ? '✓' : ''}</div>
                  <img src={puzzle.imageSrc} alt={puzzle.title} className={styles.puzzleImage} />
                </div>
              ))}
            </div>

            <button className={`${styles.sliderButton} ${isLastSlide ? styles.disabled : ''}`} onClick={goToNextSlide} disabled={isLastSlide}>
              <ArrowRightIcon />
            </button>
          </div>

          {/* <div className={styles.sliderDots}>
            {Array.from({ length: Math.ceil(puzzleData.length / 3) }).map((_, index) => (
              <span 
                key={index} 
                className={`${styles.dot} ${currentSlide === index ? styles.activeDot : ''}`}
                onClick={() => setCurrentSlide(index)}
              />
            ))}
          </div> */}

          <p className={styles.title}>{data.difficultyTitle}</p>

          <div className={styles.difficultyContainerVertical}>
            {difficultyLevels.map((level) => (
              <div
                key={level.id}
                className={`${styles.difficultyItem} ${selectedDifficulty === level.id ? styles.selectedItem : ''}`}
                onClick={() => setSelectedDifficulty(level.id)}
              >
                <div className={styles.difficultyLabel}>
                  {selectedDifficulty === level.id && <ArrowRightIcon className={styles.arrowIcon} />}
                  <span className={`${styles.difficultyName} ${selectedDifficulty === level.id ? styles.selectedText : ''}`}>
                    {level.name}
                    {selectedDifficulty === level.id && <div className={styles.difficultyDescription}>{level.description}</div>}
                  </span>
                </div>
              </div>
            ))}
          </div>

          <button className={styles.startButton} onClick={handleStartGame} disabled={!selectedPuzzle}>
            {data.startGame}
          </button>
        </div>
        <Footer />
      </section>
    );
  }

  const difficulty = difficultyLevels.find((l) => l.id === selectedDifficulty);
  const puzzlePieces = difficulty.rows * difficulty.columns;

  return (
    <section className={styles.container}>
      <GamesMenu
        completedPuzzles={completedPuzzles}
        totalPuzzles={totalPuzzles}
        initialSeconds={gameSeconds}
        currentPieces={currentCorrectPieces}
        totalPieces={currentTotalPieces}
      />

      <div className={styles.gameContainer}>
        <button className={styles.backButton} onClick={handleBackToSelection}>
          {data.backToPuzzleSelection}
        </button>

        <div className={styles.puzzleArea} onTouchStart={handleTouchStart} onTouchMove={handleTouchMove}>
          <div className={styles.hintPanel}>
            <button className={styles.hintToggle} onClick={() => setShowHint(!showHint)}>
              {showHint ? data.hideHint : data.showHint}
            </button>

            {showHint && <img src={selectedPuzzle.imageSrc} alt={data.hintImageAlt} className={styles.hintImage} />}
          </div>

          <CustomPuzzle
            imageSrc={selectedPuzzle.imageSrc}
            rows={difficulty.rows}
            columns={difficulty.columns}
            onSolved={handlePuzzleComplete}
            onProgressChange={handlePuzzleProgress}
          />
        </div>
      </div>

      <Footer />
    </section>
  );
};

export default PuzzlePage;
