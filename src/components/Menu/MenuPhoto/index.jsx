import styles from './MenuPhoto.module.css';
import { useState } from 'react';
import ArrowRightIcon from '@mui/icons-material/ArrowRight';
import ArrowLeftIcon from '@mui/icons-material/ArrowLeft';
import FullscreenIcon from '@mui/icons-material/Fullscreen';

import ImageModal from './imageModal';

const MenuPhoto = ({ images = [] }) => {
  const [currentPhoto, setCurrentPhoto] = useState(1);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const totalPhotos = images.length;

  const handlePrev = () => {
    setCurrentPhoto((prev) => Math.max(prev - 1, 1));
  };

  const handleNext = () => {
    setCurrentPhoto((prev) => Math.min(prev + 1, totalPhotos));
  };

  if (totalPhotos === 0) {
    return <div className={styles.emptyContent}>Нет фотографий</div>;
  }

  return (
    <>
      <ImageModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <img className={styles.imageFullscreen} src={images[currentPhoto - 1]?.src} alt="Fullscreen" />
      </ImageModal>
      <div className={styles.content}>
        <span className={styles.title} dangerouslySetInnerHTML={{ __html: images[currentPhoto - 1]?.title }}></span>
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
            <button className={`${styles.button} ${styles.buttonFullscreen}`} onClick={() => setIsModalOpen(true)}>
              <FullscreenIcon style={{ width: '50px', height: '50px' }} />
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default MenuPhoto;
