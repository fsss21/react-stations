import styles from './Achievements.module.css';
import ArrowRightIcon from '@mui/icons-material/ArrowRight';
import ArrowLeftIcon from '@mui/icons-material/ArrowLeft';
import { useState } from 'react';
import SnakeTimeline from '../../../../../components/SnakeTimeline';

const Achievements = ({ achievements, images }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const IMAGES_PER_PAGE = 1;

  const totalPages = Math.ceil(images.length / IMAGES_PER_PAGE);
  const startIndex = (currentPage - 1) * IMAGES_PER_PAGE;
  const endIndex = startIndex + IMAGES_PER_PAGE;
  const currentImages = images.slice(startIndex, endIndex);

  const handleNext = () => {
    if (currentPage < totalPages) {
      setCurrentPage((prev) => prev + 1);
    }
  };

  const handlePrevious = () => {
    if (currentPage > 1) {
      setCurrentPage((prev) => prev - 1);
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.biography}>
        <SnakeTimeline events={achievements} />
      </div>

      <div className={styles.galleryGrid}>
        {currentImages.map((img, index) => (
          <div key={index} className={styles.galleryItem}>
            <img className={styles.galleryImage} src={img.src} alt={img.title} />
            {/* <p>{img.title}</p> */}
          </div>
        ))}
        <div className={styles.arrowContainer}>
          <button className={styles.arrowButton} onClick={handlePrevious} disabled={currentPage === 1}>
            <ArrowLeftIcon style={{ width: '70px', height: '70px' }} />
          </button>
          <span>
            {currentPage}/{totalPages}
          </span>
          <button className={styles.arrowButton} onClick={handleNext} disabled={currentPage === totalPages}>
            <ArrowRightIcon style={{ width: '70px', height: '70px' }} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Achievements;
