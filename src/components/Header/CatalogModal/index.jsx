import { useState, useEffect, useRef } from 'react';
import styles from '../Header.module.css';

import ClearIcon from '@mui/icons-material/Clear';
import { useLanguage } from '../../../LanguageContext';

const CatalogModal = ({ onClose, onSelectExhibit }) => {
  const [visibleCount, setVisibleCount] = useState(4);
  const modalRef = useRef(null);
  const { data } = useLanguage();

  // Закрытие модального окна при клике вне его области
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        onClose();
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [onClose]);

  const handleExhibitClick = (exhibit) => {
    onSelectExhibit(exhibit);
    onClose(); // Закрываем каталог при выборе экспоната
  };

  return (
    <div className={styles.modalOverlay}>
      <div ref={modalRef} className={styles.catalogModal}>
        {/* Шапка модального окна */}
        <div className={styles.modalHeader}>
          <span className={styles.title}>спасательные операции. каталог экспонатов</span>
          <div className={styles.navButtons}>
            <button onClick={onClose} className={styles.closeButton}>
              <ClearIcon />
            </button>
          </div>
        </div>

        <div className={styles.modalContent}>
          <div className={styles.exhibitsGrid}>
            {data.exhibitsData.slice(0, visibleCount).map((exhibit) => (
              <div key={exhibit.id} className={styles.exhibitCard} onClick={() => handleExhibitClick(exhibit)}>
                <img src={exhibit.images[0]} alt={exhibit.name} className={styles.thumbnail} />
                {/* Отдельный блок для названия с собственным классом */}
                <div className={styles.exhibitNameContainer}>
                  <span className={styles.exhibitName}>{exhibit.name}</span>
                </div>
              </div>
            ))}
          </div>

          {visibleCount < data.exhibitsData.length && (
            <button className={styles.loadMore} onClick={() => setVisibleCount((prev) => prev + 2)}>
              Показать еще
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default CatalogModal;
