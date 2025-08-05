import React, { useState, useEffect, useRef } from 'react';
import styles from './CustomPuzzle.module.css';

const CustomPuzzle = ({ imageSrc, rows, columns, onSolved, onProgressChange }) => {
  const [pieces, setPieces] = useState([]);
  const [selectedPiece, setSelectedPiece] = useState(null);
  const [isComplete, setIsComplete] = useState(false);
  const [correctPieces, setCorrectPieces] = useState(0);
  const imageRef = useRef(null);
  const containerRef = useRef(null);

  // Инициализация пазла
  useEffect(() => {
    if (imageSrc && rows && columns) {
      // Небольшая задержка для загрузки изображения
      const timer = setTimeout(() => {
        initializePuzzle();
      }, 100);

      return () => clearTimeout(timer);
    }
  }, [imageSrc, rows, columns]);

  const initializePuzzle = () => {
    const totalPieces = rows * columns;
    const pieceWidth = 100 / columns;
    const pieceHeight = 100 / rows;

    // Создаем правильные позиции (оригинальные позиции для фона)
    const originalPositions = [];
    for (let row = 0; row < rows; row++) {
      for (let col = 0; col < columns; col++) {
        const pieceId = row * columns + col;
        originalPositions.push({
          id: pieceId,
          row,
          col,
          x: col * pieceWidth,
          y: row * pieceHeight,
          width: pieceWidth,
          height: pieceHeight,
          originalX: col * pieceWidth,
          originalY: row * pieceHeight,
          // Правильное вычисление позиции фона для каждого куска
          backgroundX: columns > 1 ? (col * 100) / (columns - 1) : 0,
          backgroundY: rows > 1 ? (row * 100) / (rows - 1) : 0
        });
      }
    }

    // Перемешиваем позиции для начального расположения
    const shuffled = [...originalPositions].sort(() => Math.random() - 0.5);
    const shuffledPieces = originalPositions.map((piece, index) => ({
      ...piece,
      x: shuffled[index].x,
      y: shuffled[index].y
    }));

    setPieces(shuffledPieces); // Устанавливаем перемешанные позиции
  };

  const handlePieceClick = (pieceId) => {
    if (selectedPiece === null) {
      // Первый клик - выбираем кусок
      setSelectedPiece(pieceId);
    } else if (selectedPiece === pieceId) {
      // Клик по тому же куску - отменяем выбор
      setSelectedPiece(null);
    } else {
      // Второй клик - меняем местами куски
      swapPieces(selectedPiece, pieceId);
      setSelectedPiece(null);
    }
  };

  const swapPieces = (piece1Id, piece2Id) => {
    setPieces((prevPieces) => {
      const newPieces = [...prevPieces];
      const piece1Index = newPieces.findIndex((p) => p.id === piece1Id);
      const piece2Index = newPieces.findIndex((p) => p.id === piece2Id);

      if (piece1Index !== -1 && piece2Index !== -1) {
        // Меняем позиции
        const tempX = newPieces[piece1Index].x;
        const tempY = newPieces[piece1Index].y;
        newPieces[piece1Index].x = newPieces[piece2Index].x;
        newPieces[piece1Index].y = newPieces[piece2Index].y;
        newPieces[piece2Index].x = tempX;
        newPieces[piece2Index].y = tempY;

        // Проверяем, правильно ли расположены куски
        checkCompletion(newPieces);
      }

      return newPieces;
    });
  };

  const checkCompletion = (currentPieces) => {
    const correctPiecesCount = currentPieces.filter((piece) => {
      return piece.x === piece.originalX && piece.y === piece.originalY;
    }).length;

    setCorrectPieces(correctPiecesCount);

    // Вызываем callback для передачи прогресса в родительский компонент
    if (onProgressChange) {
      onProgressChange(correctPiecesCount, currentPieces.length);
    }

    const isComplete = correctPiecesCount === currentPieces.length;

    if (isComplete) {
      setIsComplete(true);
      setTimeout(() => {
        onSolved();
      }, 500);
    }
  };

  const getPieceStyle = (piece) => {
    const isSelected = selectedPiece === piece.id;
    const isInCorrectPosition = piece.x === piece.originalX && piece.y === piece.originalY;

    return {
      left: `${piece.x}%`,
      top: `${piece.y}%`,
      width: `${piece.width}%`,
      height: `${piece.height}%`,
      backgroundImage: `url(${imageSrc})`,
      backgroundPosition: `${piece.backgroundX}% ${piece.backgroundY}%`,
      backgroundSize: `${100 * columns}% ${100 * rows}%`,
      border: isSelected ? '3px solid #ff6b6b' : isInCorrectPosition ? '2px solid #51cf66' : '2px solid #fff',
      boxShadow: isSelected ? '0 0 10px rgba(255, 107, 107, 0.8)' : 'none',
      zIndex: isSelected ? 10 : 1
    };
  };

  if (!imageSrc || pieces.length === 0) {
    return <div>Загрузка пазла...</div>;
  }

  return (
    <div className={styles.puzzleContainer} ref={containerRef}>
      <div className={styles.puzzleBoard}>
        {pieces.map((piece) => (
          <div key={piece.id} className={styles.puzzlePiece} style={getPieceStyle(piece)} onClick={() => handlePieceClick(piece.id)} />
        ))}
      </div>

      {selectedPiece !== null && <div className={styles.instruction}>Выберите место для перемещения куска</div>}

      {isComplete && (
        <div className={styles.completionOverlay}>
          <div className={styles.completionMessage}>Пазл собран!</div>
        </div>
      )}
    </div>
  );
};

export default CustomPuzzle;
