import styles from './MainPage.module.css';
import { Link } from 'react-router';

import { useSelector } from 'react-redux';

import Header from '../../components/Header';
import Footer from '../../components/Footer';
import { useLanguage } from '../../LanguageContext';

const MainPage = () => {
  const { isEnabled } = useSelector((state) => state.accessibility);
  const { data } = useLanguage();

  const baseClass = styles.main;
  const enabledClass = isEnabled ? styles.main_enabled : '';

  return (
    <>
      <section className={styles.container}>
        <Header />
        <div className={`${baseClass} ${enabledClass}`}>
          <Link className={styles.button_main} to="/history">
            {data.buttonHistory}
          </Link>
          <Link className={styles.button_main} to="/personali">
            {data.buttonPersonali}
          </Link>
          <Link className={styles.button_main} to="/films">
            {data.buttonFilms}
          </Link>
          <Link className={styles.button_main} to="/games">
            {data.buttonGames}
          </Link>
        </div>
        <Footer />
      </section>
    </>
  );
};

export default MainPage;
