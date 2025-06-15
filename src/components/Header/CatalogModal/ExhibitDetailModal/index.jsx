import { useState, useEffect, useRef } from 'react';
import styles from '../../Header.module.css';
import AppsIcon from '@mui/icons-material/Apps';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import ClearIcon from '@mui/icons-material/Clear';

const ExhibitDetailModal = ({ exhibit, onClose, onBackToCatalog }) => {
    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    const [isFullscreen, setIsFullscreen] = useState(false);
    const modalRef = useRef(null);

    useEffect(() => {
        const handleClickOutside = event => {
            if (modalRef.current && !modalRef.current.contains(event.target) && !isFullscreen) {
                onClose();
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [onClose, isFullscreen]);

    const handlePrev = () => {
        setCurrentImageIndex(prev => (prev === 0 ? exhibit.images.length - 1 : prev - 1));
    };

    const handleNext = () => {
        setCurrentImageIndex(prev => (prev === exhibit.images.length - 1 ? 0 : prev + 1));
    };

    const handleBackToCatalog = () => {
        onClose(); // Закрываем текущее модальное окно
        onBackToCatalog(); // Открываем каталог
    };

    return (
        <div className={styles.modalOverlay}>
            <div ref={modalRef} className={styles.detailModal}>
                {/* Верхняя панель навигации */}
                <div className={styles.modalHeader}>
                    <span className={styles.title}>спасательные операции. каталог экспонатов</span>
                    <div className={styles.navButtons}>
                        <button onClick={handlePrev} className={styles.navButton}>
                            <ArrowBackIosNewIcon />
                        </button>
                        <button onClick={handleNext} className={styles.navButton}>
                            <ArrowForwardIosIcon />
                        </button>
                        <button onClick={handleBackToCatalog} className={styles.gridButton}>
                            <AppsIcon />
                        </button>
                        <button onClick={onClose} className={styles.closeButton}>
                            <ClearIcon />
                        </button>
                    </div>
                </div>

                {/* Основное содержимое */}
                <div className={styles.detailContent}>
                    <div className={styles.infoSection}>
                        <h2 className={styles.exhibitTitle}>{exhibit.name}</h2>
                        <div className={styles.details}>
                            <p>
                                <strong>Дата:</strong> {exhibit.date}
                            </p>
                            <p>
                                <strong>Материал:</strong> {exhibit.material}
                            </p>
                            <p>
                                <strong>Размеры:</strong> {exhibit.size}
                            </p>
                        </div>
                        <div className={styles.description}>{exhibit.description}</div>
                    </div>
                    <div className={styles.imageSection}>
                        <img src={exhibit.images[currentImageIndex]} alt={exhibit.name} onClick={() => setIsFullscreen(true)} className={styles.mainImage} />

                        {/* Пагинация */}
                        <div className={styles.pagination}>
                            {exhibit.images.map((_, index) => (
                                <button
                                    key={index}
                                    className={`${styles.paginationDot} ${index === currentImageIndex ? styles.active : ''}`}
                                    onClick={() => setCurrentImageIndex(index)}
                                />
                            ))}
                        </div>
                    </div>
                </div>
            </div>

            {/* Полноэкранный режим */}
            {isFullscreen && (
                <div className={styles.fullscreenOverlay} onClick={() => setIsFullscreen(false)}>
                    <img src={exhibit.images[currentImageIndex]} alt={exhibit.name} className={styles.fullscreenImage} />
                </div>
            )}
        </div>
    );
};

export default ExhibitDetailModal;
