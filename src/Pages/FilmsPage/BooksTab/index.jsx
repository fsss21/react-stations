import { useState, useEffect } from 'react';
import styles from '../FilmsPage.module.css';
import ArrowRightIcon from '@mui/icons-material/ArrowRight';
import ArrowLeftIcon from '@mui/icons-material/ArrowLeft';

const ITEMS_PER_PAGE = 3;

const BooksTab = ({ items }) => {
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
        return <div className={styles.emptyMessage}>Книг пока нет</div>;
    }

    return (
        <>
            <div className={styles.mediaGrid}>
                {visibleItems.map((item, index) => (
                    <div key={`book-${index}-${currentPage}`} className={styles.mediaCard}>
                        <div className={styles.imageWrapper}>
                            <img src={item.src} alt={item.title} className={styles.mediaContent} loading="lazy" />
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

export default BooksTab;
