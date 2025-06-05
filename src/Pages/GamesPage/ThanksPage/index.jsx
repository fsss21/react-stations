import { useLocation, useNavigate } from 'react-router-dom';
import GamesMenu from '../../../components/GamesMenu/index.jsx';
import Footer from '../../../components/Footer/index.jsx';
import styles from './ThanksPage.module.css';

const ThanksPage = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const { game } = location.state || {};

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

    return (
        <div className={styles.container}>
            {/* Передаем hideStats=true чтобы скрыть статистику */}
            <GamesMenu activeGame={game} hideStats={true} />

            <div className={styles.content}>
                <h1 className={styles.title}>Благодарим за участие!</h1>
                <div className={styles.buttons}>
                    <button className={styles.button} onClick={handleGoToMainMenu}>
                        В главное меню
                    </button>
                    <button className={styles.button} onClick={handlePlayAgain}>
                        Играть снова
                    </button>
                </div>
            </div>
            <Footer />
        </div>
    );
};

export default ThanksPage;
