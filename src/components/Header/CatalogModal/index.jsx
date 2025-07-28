import { useState, useEffect, useRef } from 'react';
import styles from '../Header.module.css';

import { useSelector } from 'react-redux';

import ClearIcon from '@mui/icons-material/Clear';
import { useLanguage } from '../../../LanguageContext';

const CatalogModal = ({ onClose, onSelectExhibit }) => {
  const { isEnabled } = useSelector((state) => state.accessibility);
  const [visibleCount, setVisibleCount] = useState(4);
  const modalRef = useRef(null);
  const { data } = useLanguage();
  const exhibitsData = data.exhibitsData || [];
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

  const catalogClass = styles.catalogModal;
  const catalogEnabled = isEnabled ? styles.catalogModal_enabled : '';
  const basicClass = styles.modalHeader;
  const enabledClass = isEnabled ? styles.modalHeader_enabled : '';

  return (
    <div className={styles.modalOverlay}>
      <div ref={modalRef} className={`${catalogClass} ${catalogEnabled}`}>
        {/* Шапка модального окна */}
        <div className={`${basicClass} ${enabledClass}`}>
          <span className={styles.title}>спасательные операции. каталог экспонатов</span>
          <div className={styles.navButtons}>
            <button onClick={onClose} className={styles.closeButton}>
              <ClearIcon />
            </button>
          </div>
        </div>

        <div className={styles.modalContent}>
          <div className={styles.exhibitsGrid}>
            {exhibitsData.slice(0, visibleCount).map((exhibit) => (
              <div key={exhibit.id} className={styles.exhibitCard} onClick={() => handleExhibitClick(exhibit)}>
                <img src={exhibit.images?.[0]} alt={exhibit.name} className={styles.thumbnail} />
                {/* Отдельный блок для названия с собственным классом */}
                <div className={styles.exhibitNameContainer}>
                  <span className={styles.exhibitName} dangerouslySetInnerHTML={{ __html: exhibit.name}}></span>
                </div>
              </div>
            ))}
          </div>

          {exhibitsData.length > 0 && visibleCount < exhibitsData.length && (
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
