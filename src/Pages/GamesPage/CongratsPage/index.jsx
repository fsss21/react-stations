import { useLocation, useNavigate } from 'react-router-dom';
import GamesMenu from '../../../components/GamesMenu/index.jsx';
import Footer from '../../../components/Footer/index.jsx';
import styles from './CongratsPage.module.css';
import { useSelector } from 'react-redux';

const CongratsPage = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const { game, total, score, time } = location.state || {};
    const { isEnabled } = useSelector((state) => state.accessibility);

    const gamePaths = {
        пазлы: '/puzzle',
        кроссворд: '/crossword',
        викторина: '/quiz',
    };

    const getCongratsText = () => {
        switch(game) {
            case 'пазлы':
                return 'Поздравляем! вы собрали пазл';
            case 'викторина':
                return <>Поздравляем! вы ответили <br /> верно на все вопросы</>;
            case 'кроссворд':
            default:
                return <>Поздравляем! вы разгадали <br /> кроссворд</>;
        }
    };

    const handleGetCertificate = () => {
        navigate('/certificate-form', { state: { game, score, time } });
    };

    const handlePlayAgain = () => {
        navigate(gamePaths[game]);
    };

    const basicClass = styles.button;
    const enabledClass = isEnabled ? styles.button_enabled : '';
    const basicContent = styles.content;
    const enabledContent = isEnabled ? styles.content_enabled : '';

    return (
        <section className={styles.container}>
            <GamesMenu 
                activeGame={game} 
                totalQuestions={total} 
                correctAnswersCount={score} 
                freezeStats={true} 
                initialSeconds={time} 
            />

            <div className={`${basicContent} ${enabledContent}`}>
                <span className={styles.congratsText}>
                    {getCongratsText()}
                </span>

                <div className={styles.buttons}>
                    <button className={`${basicClass} ${enabledClass}`} onClick={handleGetCertificate}>
                        Получить грамоту
                    </button>
                    <button className={`${basicClass} ${enabledClass}`} onClick={handlePlayAgain}>
                        Играть снова
                    </button>
                </div>
            </div>
            <Footer />
        </section>
    );
};

export default CongratsPage;