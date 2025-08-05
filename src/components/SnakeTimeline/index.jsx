import { useState } from 'react';
import { useSelector } from 'react-redux';
import styles from './SnakeTimeline.module.css';

const SnakeTimeline = ({ events = [], columns = 3, rowGap = 200, columnGap = 300, dotRadius = 30 }) => {
  const { isEnabled } = useSelector((state) => state.accessibility);
  const [selectedIndex, setSelectedIndex] = useState(null);

  // Режим доступности: показываем простой список событий
  if (isEnabled) {
    return (
      <div className={styles.container_enabled}>
        <div className={styles.events_enabled}>
          {events.map((evt, index) => (
            <li key={index} className={styles.event_enabled}>
              <span>
                {evt.date} — {evt.description}
              </span>
            </li>
          ))}
        </div>
      </div>
    );
  }

  // Оригинальный таймлайн для обычного режима
  const rowsCount = Math.ceil(events.length / columns);
  const width = columnGap * (columns - 1) + dotRadius * 2 + 245;
  const height = rowsCount * rowGap + dotRadius * 4;

  const xOffset = dotRadius + 115;
  const yOffset = dotRadius + 10;

  const curveR = 40;
  const dash = '20';

  const handleClick = (index) => {
    setSelectedIndex(index);
  };

  // Функция для получения координат точки по индексу
  const getEventPosition = (index) => {
    const row = Math.floor(index / columns);
    const isEvenRow = row % 2 === 0;
    const col = isEvenRow ? index % columns : columns - 1 - (index % columns);

    const x = xOffset + col * columnGap;
    const y = yOffset + row * rowGap;

    return { x, y, row, col };
  };

  // Построение пути змейки
  let d = '';
  for (let i = 0; i < events.length; i++) {
    const { x, y } = getEventPosition(i);

    if (i === 0) {
      d += `M ${x} ${y} `;
    } else {
      const prev = getEventPosition(i - 1);

      // Если переходим на новую строку
      if (prev.row !== getEventPosition(i).row) {
        const dir = prev.row % 2 === 0 ? 1 : -1;
        const curveX = prev.x + dir * curveR;

        d += `L ${curveX} ${prev.y} `;
        d += `A ${curveR} ${curveR} 0 0 ${dir > 0 ? 1 : 0} ${curveX} ${y} `;
        d += `L ${x} ${y} `;
      } else {
        d += `L ${x} ${y} `;
      }
    }
  }

  return (
    <div style={{ position: 'relative', width, height: height + 100 }}>
      <p className={styles.text}>Прикоснитесь к точке на тайм-лайне, чтобы узнать подробнее</p>

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

        <path d={d} stroke="#284146" fill="none" strokeWidth={2} strokeDasharray={dash} strokeLinecap="round" />

        {events.map((evt, i) => {
          const { x, y } = getEventPosition(i);

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

      {selectedIndex !== null && (
        <div className={styles.modal} onClick={() => setSelectedIndex(null)}>
          <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
            <div className={styles.modalTitle} dangerouslySetInnerHTML={{ __html: events[selectedIndex].date }}></div>
            <span dangerouslySetInnerHTML={{ __html: events[selectedIndex].description }}></span>
            <div onClick={() => setSelectedIndex(null)} className={styles.closeButton}>
              <img src="/images/close.svg" alt="Закрыть" />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SnakeTimeline;
