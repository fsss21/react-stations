import { useState, useEffect, useRef } from 'react';
import styles from '../FilmsPage.module.css';
import ArrowRightIcon from '@mui/icons-material/ArrowRight';
import ArrowLeftIcon from '@mui/icons-material/ArrowLeft';

const ITEMS_PER_PAGE = 3;

const FilmsTab = ({ items }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [visibleItems, setVisibleItems] = useState([]);
  const videoRefs = useRef([]);

  useEffect(() => {
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    const paginatedItems = items.slice(startIndex, startIndex + ITEMS_PER_PAGE);
    setVisibleItems(paginatedItems);

    return () => {
      videoRefs.current.forEach((video) => {
        if (video) {
          video.pause();
          video.removeAttribute('src');
          video.load();
        }
      });
      videoRefs.current = [];
    };
  }, [items, currentPage]);

  const handleFirstFrame = (video, index) => {
    if (!video || video.readyState < 2) return;

    // Устанавливаем время для захвата первого кадра
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

  const totalPages = Math.ceil(items.length / ITEMS_PER_PAGE);

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };

  if (items.length === 0) {
    return <div className={styles.emptyMessage}>Видео пока нет</div>;
  }

  return (
    <>
      <section className={styles.mediaGrid}>
        {visibleItems.map((item, index) => (
          <div key={`film-${index}-${currentPage}`} className={styles.mediaCard}>
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
            <div className={styles.mediaInfo}>
              <span className={styles.mediaTitle} dangerouslySetInnerHTML={{ __html: item.title }}></span>
            </div>
          </div>
        ))}
      </section>

      {totalPages > 1 && (
        <div className={styles.controls}>
          <div className={styles.pagination_container}>
            <button className={styles.button} onClick={() => handlePageChange(currentPage - 1)} disabled={currentPage === 1}>
              <ArrowLeftIcon style={{ width: '70px', height: '70px' }} />
            </button>
            <span className={styles.pagination}>
              {currentPage}/{totalPages}
            </span>
            <button className={styles.button} onClick={() => handlePageChange(currentPage + 1)} disabled={currentPage === totalPages}>
              <ArrowRightIcon style={{ width: '70px', height: '70px' }} />
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default FilmsTab;
