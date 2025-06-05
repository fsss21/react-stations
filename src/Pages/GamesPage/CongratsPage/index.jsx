import { useLocation, useNavigate } from 'react-router-dom';
import GamesMenu from '../../../components/GamesMenu/index.jsx';
import Footer from '../../../components/Footer/index.jsx';
import styles from './CongratsPage.module.css';

const CongratsPage = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const { game, total, score, time } = location.state || {};

    const gamePaths = {
        пазлы: '/puzzle',
        кроссворд: '/crossword',
        викторина: '/quiz',
    };

    const handleGetCertificate = () => {
        navigate('/certificate-form', { state: { game, score, time } });
    };

    const handlePlayAgain = () => {
        navigate(gamePaths[game]);
    };

    return (
        <div className={styles.container}>
            {/* Передаем финальную статистику и замораживаем таймер */}
            <GamesMenu activeGame={game} totalQuestions={total} correctAnswersCount={score} freezeStats={true} initialSeconds={time} />

            <div className={styles.content}>
                <h1 className={styles.congratsText}>
                    Поздравляем! вы ответили <br /> верно на все вопросы
                </h1>

                <div className={styles.buttons}>
                    <button className={styles.button} onClick={handleGetCertificate}>
                        Получить грамоту
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

export default CongratsPage;
