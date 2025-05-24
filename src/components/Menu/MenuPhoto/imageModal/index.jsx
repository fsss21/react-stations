import { useEffect } from 'react';
import styles from '../MenuPhoto.module.css';

const ImageModal = ({ isOpen, onClose, children }) => {
    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = 'hidden';
        }
        return () => {
            document.body.style.overflow = 'visible';
        };
    }, [isOpen]);

    if (!isOpen) return null;

    return (
        <>
            <div className={styles.modalOverlay} onClick={onClose}>
                <div className={styles.modalContent} onClick={e => e.stopPropagation()}>
                    <div className={styles.clickArea} onClick={onClose}>
                        {children}
                    </div>
                </div>
            </div>
        </>
    );
};

export default ImageModal;
