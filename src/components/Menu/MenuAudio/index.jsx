import { useState, useRef, useEffect } from 'react';
import { useSelector } from 'react-redux';

import styles from './MenuAudio.module.css';
import ArrowRightIcon from '@mui/icons-material/ArrowRight';
import ArrowLeftIcon from '@mui/icons-material/ArrowLeft';

const MenuAudio = ({ audios = [] }) => {
  const { isEnabled } = useSelector((state) => state.accessibility);
  const [currentPage, setCurrentPage] = useState(1);
  const audiosPerPage = 4;
  const totalPages = Math.ceil(audios.length / audiosPerPage);

  // Состояния для управления аудиоплеером
  const [currentAudioId, setCurrentAudioId] = useState(null);
  const audioRef = useRef(null);

  const startIndex = (currentPage - 1) * audiosPerPage;
  const currentAudios = audios.slice(startIndex, startIndex + audiosPerPage);

  // Обработчик переключения аудио
  const handleAudioToggle = (audio) => {
    // Если кликнули на текущее аудио
    if (currentAudioId === audio.src) {
      // Переключить паузу/воспроизведение
      if (audioRef.current.paused) {
        audioRef.current.play();
      } else {
        audioRef.current.pause();
      }
    }
    // Если кликнули на новое аудио
    else {
      // Остановить предыдущее аудио
      if (audioRef.current) {
        audioRef.current.pause();
      }

      // Установить новое аудио
      setCurrentAudioId(audio.src);

      // Обновить источник и воспроизвести
      setTimeout(() => {
        if (audioRef.current) {
          audioRef.current.src = audio.src;
          audioRef.current.play();
        }
      }, 0);
    }
  };

  // Остановить воспроизведение при смене страницы
  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.pause();
      setCurrentAudioId(null);
    }
  }, [currentPage]);

  // Компонент карточки аудио
  const AudioCard = ({ audio }) => {
    const isCurrent = currentAudioId === audio.src;
    const isPlaying = isCurrent && audioRef.current && !audioRef.current.paused;

    return (
      <div className={styles.audioCard}>
        <span
          className={`${styles.audioCover} 
            ${isEnabled ? styles.enabledAudioCover : ''}
            ${isPlaying ? styles.playing : ''}`}
          onClick={() => handleAudioToggle(audio)}
        />
        <p className={styles.title} dangerouslySetInnerHTML={{ __html: audio.title }}></p>
      </div>
    );
  };

  if (audios.length === 0) {
    return <div className={styles.contentEmpty}>Нет аудио</div>;
  }

  return (
    <div className={styles.container}>
      {/* Скрытый аудио-элемент для управления воспроизведением */}
      <audio ref={audioRef} onEnded={() => setCurrentAudioId(null)} style={{ display: 'none' }} />

      {audios.length === 1 ? ( 
        // Отображение для единственной записи
      <div className={styles.singleAudioContainer} >
        <AudioCard audio={audios[0]} />
      </div>
      ) : (
        // Стандартное отображение
        <div className={styles.content}>
        <div className={styles.audioGrid}>
          {currentAudios.map((audio, index) => (
            <AudioCard key={`${audio.src || index}-${currentPage}`} audio={audio} />
          ))}
        </div>

        <div className={styles.controls}>
          <div className={styles.pagination_container}>
            <button className={styles.button} onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))} disabled={currentPage === 1}>
              <ArrowLeftIcon style={{ width: '70px', height: '70px' }} />
            </button>

            <span className={styles.pagination}>
              {currentPage}/{totalPages}
            </span>

            <button className={styles.button} onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))} disabled={currentPage === totalPages}>
              <ArrowRightIcon style={{ width: '70px', height: '70px' }} />
            </button>
          </div>
        </div>
      </div>
      )}
    </div>
  );
};

export default MenuAudio;
