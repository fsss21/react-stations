import { useLocation } from 'react-router';

import styles from './Header.module.css';

const Header = () => {
    const location = useLocation();
    const isMainPage = location.pathname === '/main';

    return (
        <>
            <div className={styles.header}>
                <button className={`${styles.button_header} ${isMainPage ? styles.button_header_main : ''}`}>
                    Версия для <br /> слабовидящих
                </button>
                <button className={`${styles.button_header} ${isMainPage ? styles.button_header_main : ''}`}>
                    каталог <br /> экспонатов
                </button>
                <button className={`${styles.button_header} ${isMainPage ? styles.button_header_main : ''}`}>
                    аудиогид <br /> по приложению
                </button>
                <button className={`${styles.button_header} ${isMainPage ? styles.button_header_main : ''}`}>ru</button>
            </div>
        </>
    );
};

export default Header;
