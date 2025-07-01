import styles from './QuizModal.module.css';
import { useSelector } from 'react-redux';

const QuizModal = ({ isCorrect, onTryAgain, onRevealCorrectAnswer, autoClose }) => {
  const { isEnabled } = useSelector((state) => state.accessibility);

  const basicClass = styles.modal;
  const enabledClass = isEnabled ? styles.modal_enabled : '';


  return (
    <section className={styles.modalOverlay}>
      <div className={`${basicClass} ${enabledClass}`}>
        <span className={styles.modalTitle}>
          {isCorrect ? 'ВЕРНЫЙ ОТВЕТ!' : 'НЕВЕРНО!'}
        </span>
        <div className={styles.modalButtons}>
          {!isCorrect && (
            <>
              <button className={styles.modalButton} onClick={onTryAgain}>
                Попробовать снова
              </button>
              <button className={styles.modalButton} onClick={onRevealCorrectAnswer}>
                Узнать правильный ответ
              </button>
            </>
          )}
          
          {isCorrect && !autoClose && (
            <button className={styles.modalButton} onClick={onRevealCorrectAnswer}>
              Следующий вопрос
            </button>
          )}
        </div>
      </div>
    </section>
  );
};

export default QuizModal;