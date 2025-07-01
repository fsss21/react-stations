import { useState, useEffect, useRef } from 'react';
import { useSelector } from 'react-redux';
import styles from '../FilmsPage.module.css';
import ArrowRightIcon from '@mui/icons-material/ArrowRight';
import ArrowLeftIcon from '@mui/icons-material/ArrowLeft';

const ITEMS_PER_PAGE = 3;

// Создаем независимый компонент для аудиоплеера
const AudioPlayer = ({ item }) => {
    const { isEnabled } = useSelector((state) => state.accessibility);
    const [isPlaying, setIsPlaying] = useState(false);
    const audioRef = useRef(null);

    const togglePlay = () => {
        if (isPlaying) {
            audioRef.current.pause();
        } else {
            audioRef.current.play();
        }
        setIsPlaying(!isPlaying);
    };

    const baseClass = styles.audioCover;
    const enabledClass = isEnabled ? styles.audioCover_enabled : '';

    return (
        <section className={styles.mediaCard}>
            <div className={styles.audioWrapper}>
                <audio ref={audioRef} src={item.src || 'fallback-audio.mp3'} preload="none" onEnded={() => setIsPlaying(false)} />
                <span className={`${baseClass} ${enabledClass}`} onClick={togglePlay}></span>
            </div>
            <div className={styles.mediaInfo}>
                <span className={styles.mediaTitle}>{item.title}</span>
            </div>
        </section>
    );
};

const AudioTab = ({ items }) => {
    const [currentPage, setCurrentPage] = useState(1);
    const [visibleItems, setVisibleItems] = useState([]);

    useEffect(() => {
        const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
        setVisibleItems(items.slice(startIndex, startIndex + ITEMS_PER_PAGE));
    }, [items, currentPage]);

    const totalPages = Math.ceil(items.length / ITEMS_PER_PAGE);

    const handlePageChange = newPage => {
        setCurrentPage(newPage);
    };

    if (items.length === 0) {
        return <div className={styles.emptyMessage}>Аудиокниг пока нет</div>;
    }

    return (
        <>
            <section className={styles.mediaGrid}>
                {visibleItems.map((item, index) => (
                    <AudioPlayer
                        key={`audio-${index}-${currentPage}`} // Уникальный ключ с ID и страницей
                        item={item}
                    />
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

export default AudioTab;
