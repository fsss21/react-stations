import styles from './GamesPage.module.css';
import { Link } from 'react-router-dom';

import { useSelector } from 'react-redux';

import Header from '../../components/Header';
import Footer from '../../components/Footer';

import quiz from '../../assets/quiz_img.png';
import crossword from '../../assets/crossword_img.png';
import puzzle from '../../assets/puzzle_img.png';
import { useLanguage } from '../../LanguageContext';

const GamesPage = () => {
  const { isEnabled } = useSelector((state) => state.accessibility);
  const { data } = useLanguage();
  return (
    <>{isEnabled ? (
      <section className={styles.container}>
        <Header />
        <div className={styles.buttons_enabled}>
          <Link className={styles.button} to="/puzzle">
            {data.tabPuzzles} <br />
          </Link>
          <Link className={styles.button} to="/crossword">
            {data.tabCrossword}
          </Link>
          <Link className={styles.button} to="/quiz">
            {data.tabQuiz}
          </Link>
        </div>
        <Footer />
      </section>
    ) : (
      <div className={styles.container}>
        <Header />
        <div className={styles.buttons}>
          <Link className={styles.button} to="/puzzle">
              {data.tabPuzzles} <br />
              <img src={puzzle} alt="" />
          </Link>
          <Link className={styles.button} to="/crossword">
              {data.tabCrossword}
              <img src={crossword} alt="" />
          </Link>
          <Link className={styles.button} to="/quiz">
              {data.tabQuiz}
              <img src={quiz} alt="" />
          </Link>
        </div>
        <Footer />
      </div>
    )}
    </>
  );
};

export default GamesPage;
