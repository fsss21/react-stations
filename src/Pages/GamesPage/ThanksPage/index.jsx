import { useLocation, useNavigate } from 'react-router-dom';
import GamesMenu from '../../../components/GamesMenu/index.jsx';
import Footer from '../../../components/Footer/index.jsx';
import styles from './ThanksPage.module.css';
import { useSelector } from 'react-redux';

const ThanksPage = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const { game, total, score, time } = location.state || {};
    const { isEnabled } = useSelector((state) => state.accessibility);

    const gamePaths = {
        пазлы: '/puzzle',
        кроссворд: '/crossword',
        викторина: '/quiz',
    };

    const handleGoToMainMenu = () => {
        navigate('/games');
    };

    const handlePlayAgain = () => {
        navigate(gamePaths[game]);
    };
    
    const basicButton = styles.button;
    const enabledButton = isEnabled ? styles.button_enabled : '';
    const basicContent = styles.content;
    const enabledContent = isEnabled ? styles.content_enabled : '';

    return (
        <section className={styles.container}>
            
            <GamesMenu 
                activeGame={game} 
                totalQuestions={total} 
                correctAnswersCount={score} 
                freezeStats={true} 
                initialSeconds={time}  />

            <div className={`${basicContent} ${enabledContent}`}>
                <span className={styles.title}>Благодарим за участие!</span>
                <div className={styles.buttons}>
                    <button className={`${basicButton} ${enabledButton}`} onClick={handleGoToMainMenu}>
                        В главное меню
                    </button>
                    <button className={`${basicButton} ${enabledButton}`} onClick={handlePlayAgain}>
                        Играть снова
                    </button>
                </div>
            </div>
            <Footer />
        </section>
    );
};

export default ThanksPage;
