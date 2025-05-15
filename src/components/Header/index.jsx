import styles from './Header.module.css';

const Header = () => {
    return (
        <>
            <div className={styles.header}>
                <button className={styles.button_header}>
                    Версия для <br /> слабовидящих
                </button>
                <button className={styles.button_header}>
                    каталог <br /> экспонатов
                </button>
                <button className={styles.button_header}>
                    аудиогид <br /> по приложению
                </button>
                <button className={styles.button_header}>ru</button>
            </div>
        </>
    );
};

export default Header;
