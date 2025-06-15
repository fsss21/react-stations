import { useState, useEffect } from 'react';
import styles from '../FilmsPage.module.css';
import ArrowRightIcon from '@mui/icons-material/ArrowRight';
import ArrowLeftIcon from '@mui/icons-material/ArrowLeft';

const ITEMS_PER_PAGE = 3;

const FilmsTab = ({ items }) => {
    const [currentPage, setCurrentPage] = useState(1);
    const [visibleItems, setVisibleItems] = useState([]);

    useEffect(() => {
        const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
        const paginatedItems = items.slice(startIndex, startIndex + ITEMS_PER_PAGE);
        setVisibleItems(paginatedItems);

        // Очистка предыдущих видео при обновлении
        return () => {
            const videos = document.querySelectorAll('video');
            videos.forEach(video => {
                if (!video.parentNode || !document.body.contains(video.parentNode)) {
                    video.pause();
                    video.removeAttribute('src');
                    video.load();
                }
            });
        };
    }, [items, currentPage]);

    const totalPages = Math.ceil(items.length / ITEMS_PER_PAGE);

    const handlePageChange = newPage => {
        setCurrentPage(newPage);
    };

    if (items.length === 0) {
        return <div className={styles.emptyMessage}>Видео пока нет</div>;
    }

    return (
        <>
            <div className={styles.mediaGrid}>
                {visibleItems.map((item, index) => (
                    <div key={`film-${index}-${currentPage}`} className={styles.mediaCard}>
                        <div className={styles.videoWrapper}>
                            <video loop playsInline controls src={item.src} className={styles.mediaContent} preload="none" />
                        </div>
                        <div className={styles.mediaInfo}>
                            <h3 className={styles.mediaTitle}>{item.title}</h3>
                        </div>
                    </div>
                ))}
            </div>

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
