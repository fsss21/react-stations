import styles from './MainPage.module.css';
import { Link } from 'react-router';

import { useSelector } from 'react-redux';

import Header from '../../components/Header';
import Footer from '../../components/Footer';



const MainPage = () => {
    const { isEnabled  } = useSelector(state => state.accessibility);

    const baseClass = styles.main;
    const enabledClass = isEnabled ? styles.main_enabled : '';
    
    return (
        <>
            <div className={styles.container}>
                <Header />
                <div className={`${baseClass} ${enabledClass}`}>
                    <Link className={styles.button_main} to="/history">
                        исторический обзор
                    </Link>
                    <Link className={styles.button_main} to="/personali">
                        персоналии
                    </Link>
                    <Link className={styles.button_main} to="/films">
                        фильмы <br /> и книги
                    </Link>
                    <Link className={styles.button_main} to="/games">
                        игры
                    </Link>
                </div>
                <Footer />
            </div>
        </>
    );
};

export default MainPage;
