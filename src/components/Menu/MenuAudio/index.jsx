import { useState, useRef } from 'react';
import { useSelector } from 'react-redux';
import styles from './MenuAudio.module.css';
import ArrowRightIcon from '@mui/icons-material/ArrowRight';
import ArrowLeftIcon from '@mui/icons-material/ArrowLeft';

const MenuAudio = ({ audios = [] }) => {
  const { isEnabled } = useSelector(state => state.accessibility);
  const [currentPage, setCurrentPage] = useState(1);
  const audiosPerPage = 4;
  const totalPages = Math.ceil(audios.length / audiosPerPage);

  const startIndex = (currentPage - 1) * audiosPerPage;
  const currentAudios = audios.slice(startIndex, startIndex + audiosPerPage);

  // Компонент карточки аудио с собственным состоянием
  const AudioCard = ({ audio=[] }) => {
    const [isPlaying, setIsPlaying] = useState(false);
    const audioRef = useRef(null);

    const togglePlay = () => {
      if (!audio.src) return; // Защита от отсутствия источника
      
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play();
      }
      setIsPlaying(!isPlaying);
    };

    return (
      <div className={styles.audioCard}>
        <audio
          ref={audioRef}
          src={audio.src}
          onEnded={() => setIsPlaying(false)}
        />
        <span 
          className={`${styles.audioCover} ${isEnabled ? styles.enabledAudioCover : ''}`} 
          onClick={togglePlay}
        />
        <p className={styles.title}>{audio.title || 'Название Аудио'}</p>
      </div>
    );
  };

  if (audios.length === 0) {
    return <div className={styles.contentEmpty}>Нет аудио</div>;
  }

  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <div className={styles.audioGrid}>
          {currentAudios.map((audio, index) => (
            <AudioCard key={`${audio.id || index}-${currentPage}`} audio={audio} />
          ))}
        </div>

        <div className={styles.controls}>
          <div className={styles.pagination_container}>
            <button 
              className={styles.button} 
              onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
            >
              <ArrowLeftIcon style={{ width: '70px', height: '70px' }} />
            </button>
            
            <span className={styles.pagination}>
              {currentPage}/{totalPages}
            </span>
            
            <button 
              className={styles.button} 
              onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
              disabled={currentPage === totalPages}
            >
              <ArrowRightIcon style={{ width: '70px', height: '70px' }} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MenuAudio;