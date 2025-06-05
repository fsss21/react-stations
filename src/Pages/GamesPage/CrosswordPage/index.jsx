import { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router';
import GamesMenu from '../../../components/GamesMenu';
import styles from './CrosswordPage.module.css';
import { crosswordData } from '../../../data';
import Footer from '../../../components/Footer';

const CrosswordPage = () => {
    const navigate = useNavigate();
    const [grid, setGrid] = useState([]);
    const [selectedClue, setSelectedClue] = useState(null);
    const [inputValue, setInputValue] = useState('');
    const [message, setMessage] = useState(null);
    const [solvedCount, setSolvedCount] = useState(0);
    const [allRevealed, setAllRevealed] = useState(false);
    const [words, setWords] = useState([...crosswordData.words]);

    const initializeGrid = useCallback(() => {
        const newGrid = Array(crosswordData.size)
            .fill()
            .map(() =>
                Array(crosswordData.size)
                    .fill()
                    .map(() => ({
                        value: '',
                        clueIds: [],
                        solved: false,
                        revealed: false,
                    }))
            );

        crosswordData.words.forEach(word => {
            const { start, direction, word: text, id } = word;
            let { row, col } = start;

            for (let i = 0; i < text.length; i++) {
                if (row < crosswordData.size && col < crosswordData.size) {
                    newGrid[row][col] = {
                        ...newGrid[row][col],
                        value: text[i],
                        clueIds: [...newGrid[row][col].clueIds, id],
                    };
                }

                if (direction === 'horizontal') col++;
                else row++;
            }
        });

        return newGrid;
    }, [crosswordData.size, crosswordData.words]);

    useEffect(() => {
        setGrid(initializeGrid());
    }, [initializeGrid]);

    const handleCellClick = (row, col) => {
        if (allRevealed) return;

        const cell = grid[row]?.[col];
        if (cell && cell.clueIds.length > 0) {
            const clueId = cell.clueIds.find(clueId => !words.find(w => w.id === clueId).solved);
            if (clueId) {
                const clue = words.find(w => w.id === clueId);
                setSelectedClue(clue);
                setInputValue('');
                setMessage(null);
            }
        }
    };

    const checkWord = useCallback(() => {
        if (!selectedClue) return;

        if (inputValue.toUpperCase() === selectedClue.word) {
            setWords(prevWords => prevWords.map(w => (w.id === selectedClue.id ? { ...w, solved: true } : w)));

            const newSolvedCount = solvedCount + 1;
            setSolvedCount(newSolvedCount);

            setMessage(`Верно! Осталось разгадать ${10 - newSolvedCount} слов из 10`);

            setGrid(prevGrid => {
                const newGrid = JSON.parse(JSON.stringify(prevGrid));
                const { start, direction, word: text } = selectedClue;
                let { row, col } = start;

                for (let i = 0; i < text.length; i++) {
                    if (row < crosswordData.size && col < crosswordData.size) {
                        newGrid[row][col] = {
                            ...newGrid[row][col],
                            solved: true,
                        };
                    }

                    direction === 'horizontal' ? col++ : row++;
                }
                return newGrid;
            });

            if (newSolvedCount === 10) {
                setTimeout(() => {
                    navigate('/congrats', {
                        state: {
                            game: 'кроссворд',
                            score: 10,
                            total: 10,
                        },
                    });
                }, 1500);
            }

            setTimeout(() => {
                setSelectedClue(null);
                setMessage(null);
            }, 1500);
        } else {
            setMessage('Неверно, попробуйте снова');
        }
    }, [selectedClue, inputValue, solvedCount, navigate, words]);

    // НОВАЯ ФУНКЦИЯ: Показать несколько букв выбранного слова
    const revealPartialHint = () => {
        if (!selectedClue || selectedClue.solved) return;

        const { start, direction, word: text } = selectedClue;
        let { row, col } = start;

        // Находим неоткрытые позиции
        const hiddenIndices = [];
        for (let i = 0; i < text.length; i++) {
            const cell = grid[row]?.[col];
            if (cell && !cell.revealed && !cell.solved) {
                hiddenIndices.push(i);
            }
            direction === 'horizontal' ? col++ : row++;
        }

        if (hiddenIndices.length === 0) return;

        // Выбираем случайные позиции для открытия (1-2 буквы)
        const lettersToReveal = Math.min(2, hiddenIndices.length);
        const indicesToReveal = [];
        for (let i = 0; i < lettersToReveal; i++) {
            const randomIndex = Math.floor(Math.random() * hiddenIndices.length);
            indicesToReveal.push(hiddenIndices[randomIndex]);
            hiddenIndices.splice(randomIndex, 1);
        }

        // Обновляем сетку
        setGrid(prevGrid => {
            const newGrid = JSON.parse(JSON.stringify(prevGrid));
            let r = start.row;
            let c = start.col;

            for (let i = 0; i < text.length; i++) {
                if (indicesToReveal.includes(i)) {
                    newGrid[r][c] = {
                        ...newGrid[r][c],
                        revealed: true,
                    };
                }

                direction === 'horizontal' ? c++ : r++;
            }
            return newGrid;
        });

        setMessage(`Открыто ${lettersToReveal} буквы в слове!`);
    };

    const handleSubmit = e => {
        e.preventDefault();
        if (selectedClue && inputValue.trim()) {
            checkWord();
        }
    };

    const handleKeyDown = e => {
        if (e.key === 'Enter') {
            handleSubmit(e);
        }
    };

    return (
        <div className={styles.container}>
            <GamesMenu activeGame="кроссворд" solvedCrosswords={solvedCount} totalCrosswords={10} />

            <div className={styles.crosswordContainer}>
                <div className={styles.grid}>
                    {grid.map((row, rowIndex) => (
                        <div key={rowIndex} className={styles.row}>
                            {row.map((cell, colIndex) => {
                                if (!cell) return null;

                                const isEmpty = !cell.value;
                                const isSelected = selectedClue && cell.clueIds.includes(selectedClue.id);
                                const isSolved = cell.solved;
                                const isRevealed = cell.revealed;

                                return (
                                    <div
                                        key={`${rowIndex}-${colIndex}`}
                                        className={`
                                            ${styles.cell}
                                            ${isEmpty ? styles.empty : ''}
                                            ${isSelected ? styles.selected : ''}
                                            ${isSolved ? styles.solved : ''}
                                        `}
                                        onClick={() => !allRevealed && handleCellClick(rowIndex, colIndex)}
                                    >
                                        {(isSolved || isRevealed) && cell.value}
                                        {!isEmpty && !isSolved && !isRevealed && cell.clueIds[0]?.charAt(0)}
                                    </div>
                                );
                            })}
                        </div>
                    ))}
                </div>

                <div className={styles.controls}>
                    {selectedClue ? (
                        <form onSubmit={handleSubmit} className={styles.form}>
                            <h3>Подсказка:</h3>
                            <p>{selectedClue.clue}</p>

                            <div className={styles.inputGroup}>
                                <input type="text" value={inputValue} onChange={e => setInputValue(e.target.value)} onKeyDown={handleKeyDown} autoFocus />
                            </div>

                            <div className={styles.buttonGroup}>
                                <button type="submit" className={styles.submitButton}>
                                    Проверить
                                </button>
                                <button type="button" className={styles.hintButton} onClick={revealPartialHint} disabled={selectedClue.solved}>
                                    Подсказка (1-2 буквы)
                                </button>
                            </div>
                        </form>
                    ) : (
                        <div className={styles.instructions}>
                            <p>
                                Нажмите на любое загаданное
                                <br /> слово, чтобы начать игру
                            </p>
                        </div>
                    )}

                    {message && (
                        <div className={message.includes('Верно') ? styles.successMessage : styles.errorMessage}>
                            <p>{message}</p>
                            {message.includes('Неверно') && <p className={styles.hint}>Нажмите на любое загаданное слово, чтобы продолжить игру</p>}
                        </div>
                    )}
                </div>
            </div>
            <Footer />
        </div>
    );
};

export default CrosswordPage;
