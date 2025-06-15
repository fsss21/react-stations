import { useLocation } from 'react-router';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toggleAccessibility, setColorScheme } from '../../store/accessibilitySlice';
import styles from './Header.module.css';
import CatalogModal from './CatalogModal';
import ExhibitDetailModal from './CatalogModal/ExhibitDetailModal';
import { useLanguage } from '../../LanguageContext';

const Header = () => {
  const location = useLocation();
  const isMainPage = location.pathname === '/main';
  const isGamesPage = location.pathname === '/games';

  const dispatch = useDispatch();
  const { isEnabled, colorScheme, schemes } = useSelector((state) => state.accessibility);
  const handleSchemeChange = (scheme) => {
    dispatch(setColorScheme(scheme));
  };

  const { data, lang, toggleLang } = useLanguage();

  // Состояния для управления модальными окнами
  const [isCatalogOpen, setIsCatalogOpen] = useState(false);
  const [selectedExhibit, setSelectedExhibit] = useState(null);

  return (
    <div className={styles.header}>
      {/* Всегда отображаем colorPicker при включенной доступности */}
      {isEnabled && (
        <div className={styles.colorPicker}>
          {Object.entries(schemes).map(
            ([key, [bgColor, textColor]]) =>
              key !== 'default' && (
                <span
                  key={key}
                  className={styles.colorCircle}
                  style={{
                    backgroundColor: bgColor,
                    border: colorScheme === key ? '2px solid #ff0000' : '1px solid #ccc'
                  }}
                  onClick={() => handleSchemeChange(key)}
                  title={`Схема ${key.replace('scheme', '')}`}
                >
                  <span style={{ color: textColor }}>Ц</span>
                </span>
              )
          )}
        </div>
      )}
      {/* Показываем первые три кнопки везде, кроме /games */}
      {!isGamesPage && (
        <>
          <button onClick={() => dispatch(toggleAccessibility())} className={`${styles.button_header} ${isMainPage ? styles.button_header_main : ''}`}>
            {isEnabled ? data.accessibilityNormal : data.accessibilityToggle}
          </button>
          <button onClick={() => setIsCatalogOpen(true)} className={`${styles.button_header} ${isMainPage ? styles.button_header_main : ''}`}>
            {data.catalog}
          </button>
          <button className={`${styles.button_header} ${isMainPage ? styles.button_header_main : ''}`}>{data.audioguide}</button>
        </>
      )}

      {/* Кнопка "ru" всегда отображается с разными стилями */}
      <button
        onClick={toggleLang}
        className={`${styles.button_header} ${isMainPage ? styles.button_header_main : ''} 
                ${isGamesPage ? styles.button_header_games : ''}`}
      >
        {lang}
      </button>
      {/* Модальное окно каталога */}
      {isCatalogOpen && (
        <CatalogModal
          onClose={() => setIsCatalogOpen(false)}
          onSelectExhibit={(exhibit) => {
            setSelectedExhibit(exhibit);
            // Каталог автоматически закроется при выборе экспоната
          }}
        />
      )}

      {/* Модальное окно деталей экспоната */}
      {selectedExhibit && (
        <ExhibitDetailModal
          exhibit={selectedExhibit}
          onClose={() => setSelectedExhibit(null)}
          onBackToCatalog={() => {
            setSelectedExhibit(null);
            setIsCatalogOpen(true);
          }}
        />
      )}
    </div>
  );
};

export default Header;
