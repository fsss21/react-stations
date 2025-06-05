import styles from './GamesPage.module.css';
import { Link } from 'react-router';

import Header from '../../components/Header';
import Footer from '../../components/Footer';

import quiz from '../../assets/quiz_img.png';
import crossword from '../../assets/crossword_img.png';
import puzzle from '../../assets/puzzle_img.png';

const GamesPage = () => {
    return (
        <>
            <div className={styles.container}>
                <Header />
                <div className={styles.buttons}>
                    <Link to="/puzzle">
                        <button className={styles.button}>
                            пазлы <br />
                            <img src={puzzle} alt="" />
                        </button>
                    </Link>
                    <Link to="/crossword">
                        <button className={styles.button}>
                            кроссворд
                            <img src={crossword} alt="" />
                        </button>
                    </Link>
                    <Link to="/quiz">
                        <button className={styles.button}>
                            викторина
                            <img src={quiz} alt="" />
                        </button>
                    </Link>
                </div>
                <Footer />
            </div>
        </>
    );
};

export default GamesPage;
