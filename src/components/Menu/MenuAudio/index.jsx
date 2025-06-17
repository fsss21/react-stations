import { useState, useRef } from 'react';

import { useSelector } from 'react-redux';

import styles from './MenuAudio.module.css';
import ArrowRightIcon from '@mui/icons-material/ArrowRight';
import ArrowLeftIcon from '@mui/icons-material/ArrowLeft';


const MenuAudio = ({ audios }) => {
  const { isEnabled  } = useSelector(state => state.accessibility);
  const [currentPage, setCurrentPage] = useState(1);
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef(null);
  const audiosPerPage = 4;
  const totalPages = Math.ceil(audios.length / audiosPerPage);

  const startIndex = (currentPage - 1) * audiosPerPage;
  const currentAudios = audios.slice(startIndex, startIndex + audiosPerPage);

  const baseClass = styles.audioCover
  const enabledClass = isEnabled ? styles.enabledAudioCover : '';

  const togglePlay = () => {
    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play();
    }
    setIsPlaying(!isPlaying);
  };

  const handlePrev = () => {
    setCurrentPage((prev) => Math.max(prev - 1, 1));
  };

  const handleNext = () => {
    setCurrentPage((prev) => Math.min(prev + 1, totalPages));
  };

  if (audios?.length === 0) {
    return <div className={styles.contentEmpty}>Нет аудио</div>;
  }

  return (
    <>
      <div className={styles.container}>
        <div className={styles.content}>
          <div className={styles.audioGrid}>
            {currentAudios.map((audio, index) => (
              <div key={index} className={styles.audioCard}>
                {/* Скрытый аудиоэлемент */}
                <audio ref={audioRef} src={audio.src || 'fallback-audio.mp3'} onEnded={() => setIsPlaying(false)} />
                {/* Кликабельная картинка с иконкой управления */}
                <span className={`${baseClass} ${enabledClass}`} onClick={togglePlay}></span>
                <p className={styles.title}>{audio.title || 'Название Аудио'}</p>
              </div>
            ))}
          </div>

          <div className={styles.controls}>
            <div className={styles.pagination_container}>
              <button className={styles.button} onClick={handlePrev} disabled={currentPage === 1}>
                <ArrowLeftIcon style={{ width: '70px', height: '70px' }} />
              </button>
              <span className={styles.pagination}>
                {currentPage}/{totalPages}
              </span>
              <button className={styles.button} onClick={handleNext} disabled={currentPage === totalPages}>
                <ArrowRightIcon style={{ width: '70px', height: '70px' }} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default MenuAudio;
