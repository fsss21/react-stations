import { useLocation, useNavigate } from 'react-router';
import GamesMenu from '../../../components/GamesMenu/index.jsx';
import Footer from '../../../components/Footer/index.jsx';
import styles from './CongratsPage.module.css';
import { useSelector } from 'react-redux';

const CongratsPage = () => {
    const location = useLocation();
    const navigate = useNavigate();
    // Добавляем получение категории из состояния
    const { game, total, score, time, category } = location.state || {};
    const { isEnabled } = useSelector((state) => state.accessibility);

    const gamePaths = {
        пазлы: '/puzzle',
        кроссворд: '/crossword',
        викторина: '/quiz',
    };

    // Обновленная функция для текста поздравления
    const getCongratsText = () => {
        switch(game) {
            case 'пазлы':
                return 'Поздравляем! вы собрали пазл';
            case 'викторина':
                // Разные тексты в зависимости от категории
                switch(category) {
                    case 'excellent':
                        return <>Поздравляем! Вы ответили верно на все вопросы!<br />Идеальный результат!</>;
                    case 'good':
                        return <>Поздравляем! Вы отлично справились!<br />Правильных ответов: {score} из {total}</>;
                    case 'medium':
                        return <>Поздравляем! Хороший результат!<br />Правильных ответов: {score} из {total}</>;
                    case 'basic':
                        return <>Поздравляем! Викторина пройдена!<br />Правильных ответов: {score} из {total}</>;
                    default:
                        return <>Поздравляем! Вы завершили викторину!<br />Правильных ответов: {score} из {total}</>;
                }
            case 'кроссворд':
            default:
                return <>Поздравляем! вы разгадали <br /> кроссворд</>;
        }
    };

    const handleGetCertificate = () => {
        navigate('/certificate-form', { 
            state: { 
                game, 
                score, 
                time,
                category // передаем категорию для сертификата
            } 
        });
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