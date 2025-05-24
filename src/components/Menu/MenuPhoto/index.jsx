import styles from './MenuPhoto.module.css';
import { useState } from 'react';
import ArrowRightIcon from '@mui/icons-material/ArrowRight';
import ArrowLeftIcon from '@mui/icons-material/ArrowLeft';
import FullscreenIcon from '@mui/icons-material/Fullscreen';

import ImageModal from './imageModal';

const MenuPhoto = ({ images }) => {
    const [currentPhoto, setCurrentPhoto] = useState(1);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const totalPhotos = images.length;

    const handlePrev = () => {
        setCurrentPhoto(prev => Math.max(prev - 1, 1));
    };

    const handleNext = () => {
        setCurrentPhoto(prev => Math.min(prev + 1, totalPhotos));
    };

    return (
        <>
            <div className={styles.container}>
                <ImageModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
                    <img className={styles.imageFullscreen} src={images[currentPhoto - 1]?.src} alt="Fullscreen" />
                </ImageModal>
                <div className={styles.text}>
                    <span>{images[currentPhoto - 1]?.text}</span>
                </div>
                <div className={styles.content}>
                    <h3 className={styles.title}>{images[currentPhoto - 1]?.title || 'Название фото'}</h3>
                    <img className={styles.img} src={images[currentPhoto - 1]?.src} alt="MenuPhoto" />
                    <div className={styles.controls}>
                        <div className={styles.paginationContainer}>
                            <button className={styles.button} onClick={handlePrev} disabled={currentPhoto === 1}>
                                <ArrowLeftIcon style={{ width: '70px', height: '70px' }} />
                            </button>
                            <span className={styles.pagination}>
                                {currentPhoto}/{totalPhotos}
                            </span>
                            <button className={styles.button} onClick={handleNext} disabled={currentPhoto === totalPhotos}>
                                <ArrowRightIcon style={{ width: '70px', height: '70px' }} />
                            </button>
                        </div>
                    </div>
                    <button className={styles.button_fullscreen} onClick={() => setIsModalOpen(true)}>
                        <FullscreenIcon style={{ width: '50px', height: '50px' }} />
                    </button>
                </div>
            </div>
        </>
    );
};

export default MenuPhoto;
