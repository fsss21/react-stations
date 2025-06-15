import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router';
import { JigsawPuzzle } from 'react-jigsaw-puzzle/lib';
import 'react-jigsaw-puzzle/lib/jigsaw-puzzle.css';
import ArrowRightIcon from '@mui/icons-material/ArrowRight';
import styles from './PuzzlePage.module.css';
import GamesMenu from '../../../components/GamesMenu/index.jsx';
import Footer from '../../../components/Footer/index.jsx';
import { puzzleData, difficultyLevels } from '../../../data/games.js';

const PuzzlePage = () => {
  const navigate = useNavigate();
  const [selectedPuzzle, setSelectedPuzzle] = useState(null);
  const [selectedDifficulty, setSelectedDifficulty] = useState('medium');
  const [gameStarted, setGameStarted] = useState(false);
  const [completedPuzzles, setCompletedPuzzles] = useState(0);
  const [totalPuzzles, setTotalPuzzles] = useState(puzzleData.length);
  const [gameSeconds, setGameSeconds] = useState(0);
  const [timerActive, setTimerActive] = useState(false);
  const [currentPuzzleTime, setCurrentPuzzleTime] = useState(0);
  const [showHint, setShowHint] = useState(false);

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

  const handleBackToSelection = () => {
    setGameStarted(false);
    setTimerActive(false);
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
    return (
      <div className={styles.container}>
        <GamesMenu hideStats={true} />
        <div className={styles.selectionContainer}>
          <div className={styles.puzzles}>
            {puzzleData.map((puzzle) => (
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
          <h2 className={styles.title}>
            уровень <br /> сложности
          </h2>

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
            Начать игру
          </button>
        </div>
        <Footer />
      </div>
    );
  }

  const difficulty = difficultyLevels.find((l) => l.id === selectedDifficulty);
  const puzzlePieces = difficulty.rows * difficulty.columns; // Вычисляем количество деталей

  return (
    <div className={styles.container}>
      {/* Передаем количество деталей в GamesMenu */}
      <GamesMenu completedPuzzles={completedPuzzles} totalPuzzles={totalPuzzles} initialSeconds={gameSeconds} puzzlePieces={puzzlePieces} />

      <div className={styles.gameContainer}>
        <button className={styles.backButton} onClick={handleBackToSelection}>
          ← Выбрать другой пазл
        </button>

        <div className={styles.puzzleArea}>
          <div className={styles.hintPanel}>
            <button className={styles.hintToggle} onClick={() => setShowHint(!showHint)}>
              {showHint ? 'Убрать подсказку' : 'Открыть подсказку'}
            </button>

            {showHint && <img src={selectedPuzzle.imageSrc} alt="Подсказка" className={styles.hintImage} />}
          </div>

          <div className={styles.puzzleWrapper}>
            <JigsawPuzzle imageSrc={selectedPuzzle.imageSrc} rows={difficulty.rows} columns={difficulty.columns} onSolved={handlePuzzleComplete} />
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default PuzzlePage;
