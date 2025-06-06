import { useLocation } from 'react-router';
import styles from './Header.module.css';

const Header = () => {
    const location = useLocation();
    const isMainPage = location.pathname === '/main';
    const isGamesPage = location.pathname === '/games';

    return (
        <div className={styles.header}>
            {/* Показываем первые три кнопки везде, кроме /games */}
            {!isGamesPage && (
                <>
                    <button className={`${styles.button_header} ${isMainPage ? styles.button_header_main : ''}`}>
                        Версия для <br /> слабовидящих
                    </button>
                    <button className={`${styles.button_header} ${isMainPage ? styles.button_header_main : ''}`}>
                        каталог <br /> экспонатов
                    </button>
                    <button className={`${styles.button_header} ${isMainPage ? styles.button_header_main : ''}`}>
                        аудиогид <br /> по приложению
                    </button>
                </>
            )}

            {/* Кнопка "ru" всегда отображается с разными стилями */}
            <button
                className={`${styles.button_header} ${isMainPage ? styles.button_header_main : ''} 
                ${isGamesPage ? styles.button_header_games : ''}`}
            >
                ru
            </button>
        </div>
    );
};

export default Header;
