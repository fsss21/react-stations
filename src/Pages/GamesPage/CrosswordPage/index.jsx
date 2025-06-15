import { useState, useEffect, useCallback, useRef, useMemo } from 'react';
import { useNavigate } from 'react-router';
import GamesMenu from '../../../components/GamesMenu';
import styles from './CrosswordPage.module.css';
import { crosswordData } from '../../../data/games';
import Footer from '../../../components/Footer';
import Keyboard from 'react-simple-keyboard';
import 'react-simple-keyboard/build/css/index.css';
import BackspaceIcon from '@mui/icons-material/Backspace';

const CrosswordPage = () => {
  const navigate = useNavigate();
  const [grid, setGrid] = useState([]);
  const [selectedClue, setSelectedClue] = useState(null);
  const [inputValue, setInputValue] = useState('');
  const [message, setMessage] = useState(null);
  const [solvedCount, setSolvedCount] = useState(0);
  const [allRevealed, setAllRevealed] = useState(false);
  const [hintVisible, setHintVisible] = useState(false); // Состояние видимости подсказки
  const keyboardRef = useRef(null);

  const crosswordWords = useMemo(
    () =>
      crosswordData.words.map((word) => ({
        ...word,
        word: word.word.toUpperCase()
      })),
    []
  );

  const [words, setWords] = useState([...crosswordWords]);

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
            revealed: false
          }))
      );

    crosswordWords.forEach((word) => {
      const { start, direction, word: text, id } = word;
      let { row, col } = start;

      for (let i = 0; i < text.length; i++) {
        if (row < crosswordData.size && col < crosswordData.size) {
          newGrid[row][col] = {
            ...newGrid[row][col],
            value: text[i].toUpperCase(),
            clueIds: [...newGrid[row][col].clueIds, id]
          };
        }

        if (direction === 'horizontal') col++;
        else row++;
      }
    });

    return newGrid;
  }, [crosswordData.size, crosswordWords]);

  useEffect(() => {
    setGrid(initializeGrid());
  }, [initializeGrid]);

  const handleCellClick = (row, col) => {
    if (allRevealed) return;

    const cell = grid[row]?.[col];
    if (cell && cell.clueIds.length > 0) {
      const clueId = cell.clueIds.find((clueId) => !words.find((w) => w.id === clueId).solved);
      if (clueId) {
        const clue = words.find((w) => w.id === clueId);
        setSelectedClue(clue);
        setInputValue('');
        setMessage(null);
        setHintVisible(false); // Сбрасываем видимость подсказки при выборе нового слова
      }
    }
  };

  const checkWord = useCallback(() => {
    if (!selectedClue) return;

    const userInput = inputValue.replace(/\s+/g, '').toUpperCase();

    if (userInput === selectedClue.word) {
      setWords((prevWords) => prevWords.map((w) => (w.id === selectedClue.id ? { ...w, solved: true } : w)));

      const newSolvedCount = solvedCount + 1;
      setSolvedCount(newSolvedCount);

      setMessage(`Верно! Осталось разгадать ${10 - newSolvedCount} слов из 10`);

      setGrid((prevGrid) => {
        const newGrid = JSON.parse(JSON.stringify(prevGrid));
        const { start, direction, word: text } = selectedClue;
        let { row, col } = start;

        for (let i = 0; i < text.length; i++) {
          if (row < crosswordData.size && col < crosswordData.size) {
            newGrid[row][col] = {
              ...newGrid[row][col],
              solved: true
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
              total: 10
            }
          });
        }, 1500);
      }

      setTimeout(() => {
        setSelectedClue(null);
        setMessage(null);
        setHintVisible(false); // Сбрасываем видимость подсказки при решении
      }, 1500);
    } else {
      setMessage('Неверно, попробуйте снова');
    }
  }, [selectedClue, inputValue, solvedCount, navigate, words]);

  // Обновленная функция для управления подсказками
  const toggleHint = () => {
    if (!selectedClue || selectedClue.solved) return;

    if (hintVisible) {
      // Закрываем подсказку - скрываем все открытые буквы
      setGrid((prevGrid) => {
        const newGrid = JSON.parse(JSON.stringify(prevGrid));
        const { start, direction, word: text } = selectedClue;
        let { row, col } = start;

        for (let i = 0; i < text.length; i++) {
          if (row < crosswordData.size && col < crosswordData.size) {
            if (!newGrid[row][col].solved) {
              newGrid[row][col] = {
                ...newGrid[row][col],
                revealed: false
              };
            }
          }

          direction === 'horizontal' ? col++ : row++;
        }
        return newGrid;
      });
      setHintVisible(false);
      setMessage('Подсказка скрыта');
    } else {
      // Открываем подсказку - показываем несколько букв
      const { start, direction, word: text } = selectedClue;
      let { row, col } = start;

      const hiddenIndices = [];
      for (let i = 0; i < text.length; i++) {
        const cell = grid[row]?.[col];
        if (cell && !cell.revealed && !cell.solved) {
          hiddenIndices.push(i);
        }
        direction === 'horizontal' ? col++ : row++;
      }

      if (hiddenIndices.length === 0) return;

      const hintCount = Math.min(5, Math.max(3, Math.floor(text.length * 0.3)));
      const lettersToReveal = Math.min(hintCount, hiddenIndices.length);
      const indicesToReveal = [];
      for (let i = 0; i < lettersToReveal; i++) {
        const randomIndex = Math.floor(Math.random() * hiddenIndices.length);
        indicesToReveal.push(hiddenIndices[randomIndex]);
        hiddenIndices.splice(randomIndex, 1);
      }

      setGrid((prevGrid) => {
        const newGrid = JSON.parse(JSON.stringify(prevGrid));
        let r = start.row;
        let c = start.col;

        for (let i = 0; i < text.length; i++) {
          if (indicesToReveal.includes(i)) {
            newGrid[r][c] = {
              ...newGrid[r][c],
              revealed: true
            };
          }

          direction === 'horizontal' ? c++ : r++;
        }
        return newGrid;
      });

      setHintVisible(true);
      setMessage(`Открыто ${lettersToReveal} букв(ы) в слове!`);
    }
  };

  const revealAllAnswers = () => {
    setGrid((prevGrid) => {
      const newGrid = JSON.parse(JSON.stringify(prevGrid));
      return newGrid.map((row) => row.map((cell) => (cell.value ? { ...cell, solved: true, revealed: true } : cell)));
    });

    setWords((prevWords) => prevWords.map((word) => ({ ...word, solved: true })));

    setSolvedCount(10);
    setAllRevealed(true);
    setMessage('Все ответы открыты!');

    setTimeout(() => {
      navigate('/congrats', {
        state: {
          game: 'кроссворд',
          score: 10,
          total: 10
        }
      });
    }, 1500);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (selectedClue && inputValue.trim()) {
      checkWord();
    }
  };

  const onKeyboardChange = (input) => {
    setInputValue(input);
  };

  const onKeyPress = (button) => {
    if (button === '{bksp}') {
      setInputValue((prev) => prev.slice(0, -1));
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
                <input type="text" value={inputValue} onChange={(e) => setInputValue(e.target.value)} autoFocus style={{ textTransform: 'uppercase' }} />
              </div>

              <div className={styles.buttonGroup}>
                <div className={styles.allButtons}>
                  <button type="button" className={styles.button} onClick={() => setSelectedClue(null)}>
                    отмена
                  </button>
                  <button type="button" className={styles.button} onClick={toggleHint} disabled={selectedClue.solved || allRevealed}>
                    {hintVisible ? 'Скрыть подсказку' : 'Открыть подсказку'}
                  </button>
                </div>
                <div className={styles.allButtons}>
                  <button type="submit" className={styles.button}>
                    ок
                  </button>
                  <button className={styles.button} onClick={revealAllAnswers} disabled={allRevealed}>
                    Открыть все ответы
                  </button>
                </div>
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

          {/* Клавиатура отображается только при выборе слова */}
          {selectedClue && (
            <div className={styles.keyboardWrapper}>
              <Keyboard
                keyboardRef={(r) => (keyboardRef.current = r)}
                layout={{
                  default: ['Й Ц У К Е Н Г Ш Щ З Х Ъ', 'Ф Ы В А П Р О Л Д Ж Э', 'Я Ч С М И Т Ь Б Ю {bksp}']
                }}
                onChange={onKeyboardChange}
                onKeyPress={onKeyPress}
                display={{
                  '{bksp}': '⌫'
                }}
                buttonTheme={[
                  {
                    class: styles.keyboardDefaultBtn, // Ваш класс для обычных кнопок
                    buttons: 'Й Ц У К Е Н Г Ш Щ З Х Ъ Ф Ы В А П Р О Л Д Ж Э Я Ч С М И Т Ь Б Ю'
                  },
                  {
                    class: `${styles.keyboardDeleteBtn} hg-button hg-button-bksp`, // Добавлены обязательные классы
                    buttons: '{bksp}'
                  }
                ]}
                theme={`hg-theme-default ${styles.keyboardTheme}`}
              />
            </div>
          )}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default CrosswordPage;
