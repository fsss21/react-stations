import styles from './QuizModal.module.css';

const QuizModal = ({ isCorrect, onTryAgain, onRevealAnswer, onNextQuestion }) => {
    return (
        <div className={styles.modalOverlay}>
            <div className={styles.modal}>
                <h2>{isCorrect ? 'ВЕРНЫЙ ОТВЕТ!' : 'НЕВЕРНО'}</h2>
                {!isCorrect ? (
                    <div className={styles.modalButtons}>
                        <button className={styles.modalButton} onClick={onTryAgain}>
                            ответить снова
                        </button>
                        <button className={styles.modalButton} onClick={onRevealAnswer}>
                            узнать ответ
                        </button>
                    </div>
                ) : (
                    <button className={styles.nextButton} onClick={onNextQuestion}>
                        далее
                    </button>
                )}
            </div>
        </div>
    );
};

export default QuizModal;
