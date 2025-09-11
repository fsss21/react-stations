import { useState, useEffect, useRef } from 'react';
import { useSelector } from 'react-redux';
import styles from '../FilmsPage.module.css';
import ArrowRightIcon from '@mui/icons-material/ArrowRight';
import ArrowLeftIcon from '@mui/icons-material/ArrowLeft';

const FilmsTab = ({ items }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [visibleItems, setVisibleItems] = useState([]);
  const videoRefs = useRef([]);
  const audioRefs = useRef([]);
  const { isEnabled } = useSelector((state) => state.accessibility);

  // Определяем тип контента
  const contentType = items.length > 0 ? 
    items[0].type || items[0].src.split('.').pop().toLowerCase() : 
    null;

  // Устанавливаем количество элементов на странице в зависимости от типа
  const ITEMS_PER_PAGE = contentType === 'mp3' || contentType === 'audio' ? 4 : 3;

  useEffect(() => {
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    const paginatedItems = items.slice(startIndex, startIndex + ITEMS_PER_PAGE);
    setVisibleItems(paginatedItems);

    return () => {
      // Очистка рефов
      videoRefs.current.forEach((video) => {
        if (video) {
          video.pause();
          video.removeAttribute('src');
          video.load();
        }
      });

      audioRefs.current.forEach((audio) => {
        if (audio) {
          audio.pause();
          audio.removeAttribute('src');
          audio.load();
        }
      });

      videoRefs.current = [];
      audioRefs.current = [];
    };
  }, [items, currentPage]);

  const handleFirstFrame = (video, index) => {
    if (!video || video.readyState < 2) return;

    video.currentTime = 0.1;
    video.addEventListener(
      'seeked',
      () => {
        const canvas = document.createElement('canvas');
        canvas.width = video.videoWidth;
        canvas.height = video.videoHeight;
        const ctx = canvas.getContext('2d');
        ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
        video.setAttribute('poster', canvas.toDataURL('image/jpeg'));
      },
      { once: true }
    );
  };

  // Обработчик клика по аудио обложке
  const handleAudioClick = (index, item) => {
    const audio = audioRefs.current[index];
    if (!audio) return;

    // Если аудио уже воспроизводится, ставим на паузу
    if (!audio.paused) {
      audio.pause();
      return;
    }

    // Останавливаем все другие аудио
    audioRefs.current.forEach((a, i) => {
      if (a && i !== index) {
        a.pause();
        // Сбрасываем текущее время для других аудио
        a.currentTime = 0;
      }
    });

    // Устанавливаем src и воспроизводим
    audio.src = item.src;
    audio.load();
    audio.play().catch(error => {
      console.error('Ошибка воспроизведения аудио:', error);
    });
  };

  // Обработчик окончания воспроизведения аудио
  const handleAudioEnded = (index) => {
    const audio = audioRefs.current[index];
    if (audio) {
      audio.currentTime = 0;
    }
  };

  const totalPages = Math.ceil(items.length / ITEMS_PER_PAGE);

  const baseClass = styles.audioCover;
  const enabledClass = isEnabled ? styles.audioCover_enabled : '';

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
    // При смене страницы останавливаем все аудио
    audioRefs.current.forEach(audio => {
      if (audio) {
        audio.pause();
        audio.currentTime = 0;
      }
    });
  };

  if (items.length === 0) {
    return <div className={styles.emptyMessage}>Файлов пока нет</div>;
  }

  return (
    <>
      <section className={styles.mediaGrid}>
        {visibleItems.map((item, index) => {
          // Определяем тип текущего элемента
          const itemType = item.type || item.src.split('.').pop().toLowerCase();
          const isAudio = itemType === 'mp3' || itemType === 'audio';

          return (
            <div key={`media-${index}-${currentPage}`} className={styles.mediaCard}>
              {isAudio ? (
                // Верстка для аудио
                <div className={styles.audioWrapper}>
                  <span 
                    className={`${baseClass} ${enabledClass}`} 
                    
                    onClick={() => handleAudioClick(index, item)}
                  />
                  <audio
                    ref={(el) => (audioRefs.current[index] = el)}
                    onEnded={() => handleAudioEnded(index)}
                    
                    preload="none"
                  />
                </div>
              ) : (
                // Верстка для видео
                <div className={styles.videoWrapper}>
                  <video
                    ref={(el) => {
                      videoRefs.current[index] = el;
                      if (el) {
                        el.addEventListener('loadedmetadata', () => handleFirstFrame(el, index));
                      }
                    }}
                    loop
                    playsInline
                    controls
                    src={item.src}
                    className={styles.mediaContent}
                    preload="metadata"
                  />
                </div>
              )}
              <div className={styles.mediaInfo}>
                <span className={styles.mediaTitle} dangerouslySetInnerHTML={{ __html: item.title }}></span>
              </div>
            </div>
          );
        })}
      </section>

      {totalPages > 1 && (
        <div className={styles.controls}>
          <div className={styles.pagination_container}>
            <button 
              className={styles.button} 
              onClick={() => handlePageChange(currentPage - 1)} 
              disabled={currentPage === 1}
            >
              <ArrowLeftIcon style={{ width: '70px', height: '70px' }} />
            </button>
            <span className={styles.pagination}>
              {currentPage}/{totalPages}
            </span>
            <button 
              className={styles.button} 
              onClick={() => handlePageChange(currentPage + 1)} 
              disabled={currentPage === totalPages}
            >
              <ArrowRightIcon style={{ width: '70px', height: '70px' }} />
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default FilmsTab;