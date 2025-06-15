import React, { useState } from 'react';

const SnakeTimeline = ({ events = [], columns = 3, rowGap = 200, columnGap = 300, dotRadius = 30 }) => {
  const rowsCount = Math.ceil(events.length / columns);
  const width = columnGap * (columns - 1) + dotRadius * 2 + 245;
  const height = rowsCount * rowGap + dotRadius * 4;

  const xOffset = dotRadius + 115;
  const yOffset = dotRadius + 10;

  // State для модалки
  const [selectedIndex, setSelectedIndex] = useState(null);

  // Функция-обработчик клика
  const handleClick = (index) => {
    setSelectedIndex(index);
  };

  // Координаты для пути змейки
  const curveR = 40; // радиус дуги
  const dash = '20'; // длина штриха и пробела

  let d = '';
  for (let row = 0; row < rowsCount; row++) {
    // Индексы колонок (змейкой)
    const order = row % 2 === 0 ? [...Array(columns).keys()] : [...Array(columns).keys()].reverse();

    for (let j = 0; j < order.length; j++) {
      const idx = row * columns + order[j];
      if (idx >= events.length) break;

      const [x, y] = [xOffset + order[j] * columnGap, yOffset + row * rowGap];

      if (row === 0 && j === 0) {
        d += `M ${x} ${y} `;
      } else {
        // Если обычный переход в том же ряду — просто линия
        d += `L ${x} ${y} `;
      }

      // Если это последняя точка ряда и не последний ряд — добавляем обход
      if (j === order.length - 1 && row < rowsCount - 1) {
        const nextY = yOffset + (row + 1) * rowGap;
        const dir = row % 2 === 0 ? 1 : -1; // если слева направо — вправо, иначе влево

        // 1) Горизонтальный выход от (x,y) к (x + dir*curveR, y)
        d += `L ${x + dir * curveR} ${y} `;

        d += `A ${curveR} ${curveR} 0 0 ${dir > 0 ? 1 : 0} ${x + dir * curveR} ${nextY} `;
        // 3) Горизонтальный заход к (x, nextY)
        d += `L ${x} ${nextY} `;
      }
    }
  }

  return (
    <div style={{ position: 'relative', width, height: height + 100 }}>
      <p
        style={{
          margin: '40px 0 20px 40px',
          fontSize: '26px',
          color: '#223843',
          fontStyle: 'italic',
        }}
      >
        Прикоснитесь к точке на тайм-лайне, чтобы узнать подробнее
      </p>
      <svg width={width} height={height}>
        <defs>
          <filter id="dropShadow" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur in="SourceAlpha" stdDeviation="3" result="blur" />
            <feOffset in="blur" dx="2" dy="2" result="offsetBlur" />
            <feMerge>
              <feMergeNode in="offsetBlur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {/* Линия */}
        <path d={d} stroke="#284146" fill="none" strokeWidth={2} strokeDasharray={dash} strokeLinecap="round" />

        {/* Точки и подписи */}
        {events.map((evt, i) => {
          const row = Math.floor(i / columns);
          const col = i % columns;
          const x = xOffset + col * columnGap;
          const y = yOffset + row * rowGap;

          return (
            <g key={i} style={{ cursor: 'pointer' }} onClick={() => handleClick(i)}>
              <circle cx={x} cy={y} r={dotRadius} fill="#A10F0F" stroke="#fff" strokeWidth={10} filter="url(#dropShadow)" />
              <text x={x} y={y + dotRadius + 50} textAnchor="middle" fontSize={38} fill="#A10F0F">
                {evt.date}
              </text>
            </g>
          );
        })}
      </svg>

      {/* Модалка */}
      {selectedIndex !== null && (
        <div
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
            display: 'flex',
            alignItems: 'center',

            // justifyContent: 'center',
          }}
          onClick={() => setSelectedIndex(null)}
        >
          <div
            style={{
              marginLeft: '200px',
              position: 'relative',
              padding: '48px',
              border: '3px solid #162F33',
              background: '#fff',
              maxWidth: '900px',
              maxHeight: '90%',
              overflowY: 'auto',
              fontSize: '26px',
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <h2 style={{ fontSize: '54px', marginBottom: '20px', color: '#A00F0F' }}>{events[selectedIndex].date}</h2>

            {events[selectedIndex].description}
            <div onClick={() => setSelectedIndex(null)} style={{ position: 'absolute', top: 15, right: 15 }}>
              <img src="/images/close.svg" alt="" />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SnakeTimeline;
