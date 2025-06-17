import { useState, useEffect } from 'react';
import { useLocation } from 'react-router';
import styles from './GamesMenu.module.css';

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
    totalPieces = 0,
}) => {
    const [seconds, setSeconds] = useState(initialSeconds);
    const [isRunning, setIsRunning] = useState(false);
    const location = useLocation();

    const getActiveGameFromPath = () => {
        if (location.pathname.includes('/puzzle')) return 'пазлы';
        if (location.pathname.includes('/crossword')) return 'кроссворд';
        if (location.pathname.includes('/quiz')) return 'викторина';
        return null;
    };

    const activeGame = activeGameFromProps || getActiveGameFromPath();

    const formatTime = totalSeconds => {
        const minutes = Math.floor(totalSeconds / 60);
        const seconds = totalSeconds % 60;
        return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
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
                setSeconds(prev => prev + 1);
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
                // Всегда показываем текущий прогресс деталей
                return `${currentPieces}/${totalPieces} деталей`;
            case 'кроссворд':
                return `угадано ${solvedCrosswords}/${totalCrosswords}`;
            case 'викторина':
                return `верных ответов ${correctAnswersCount}/${totalQuestions}`;
            default:
                return 'выберите игру';
        }
    };

    return (
        <div className={styles.container}>
            <div className={styles.buttons}>
                <button className={`${styles.button} ${activeGame === 'пазлы' ? styles.active : ''}`}>пазлы</button>
                <button className={`${styles.button} ${activeGame === 'кроссворд' ? styles.active : ''}`}>кроссворд</button>
                <button className={`${styles.button} ${activeGame === 'викторина' ? styles.active : ''}`}>викторина</button>
            </div>

            <div className={styles.timer}>
                {!hideStats && (
                    <>
                        <span className={styles.answers}>{getAnswersText()}</span>
                        <span className={styles.time}>{formatTime(seconds)}</span>
                    </>
                )}
                <button className={styles.ru}>ru</button>
            </div>
        </div>
    );
};

export default GamesMenu;