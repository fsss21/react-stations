import { useState } from 'react';
import styles from './MenuVideo.module.css';
import ArrowRightIcon from '@mui/icons-material/ArrowRight';
import ArrowLeftIcon from '@mui/icons-material/ArrowLeft';

const MenuVideo = ({ videos }) => {
    const [currentPage, setCurrentPage] = useState(1);
    const videosPerPage = 4;
    const totalPages = Math.ceil(videos.length / videosPerPage);

    const startIndex = (currentPage - 1) * videosPerPage;
    const endIndex = startIndex + videosPerPage;
    const currentVideos = videos.slice(startIndex, endIndex);

    const handlePrev = () => {
        setCurrentPage(prev => Math.max(prev - 1, 1));
    };

    const handleNext = () => {
        setCurrentPage(prev => Math.min(prev + 1, totalPages));
    };

    return (
        <>
            <div className={styles.container}>
                <div className={styles.textSection}>
                    {currentVideos.map((video, index) => (
                        <div key={index} className={styles.textBlock}>
                            <p className={styles.videoText}>{video.text || 'Описание видео'}</p>
                        </div>
                    ))}
                </div>
                <div className={styles.content}>
                    <div className={styles.videoGrid}>
                        {currentVideos.map((video, index) => (
                            <div key={index} className={styles.videoCard}>
                                <video autoPlay loop muted playsInline className={styles.video} src={video.src || 'fallback-video.mp4'} alt="MenuVideo" />
                                <h3 className={styles.title}>{video.title || 'Название видео'}</h3>
                            </div>
                        ))}
                    </div>
                    <div className={styles.controls}>
                        <div className={styles.pagination_container}>
                            <button className={styles.button} onClick={handlePrev} disabled={currentPage === 1}>
                                <ArrowLeftIcon style={{ width: '70px', height: '70px' }} />
                            </button>
                            <span className={styles.pagination}>
                                {currentPage}/{totalPages}
                            </span>
                            <button className={styles.button} onClick={handleNext} disabled={currentPage === totalPages}>
                                <ArrowRightIcon style={{ width: '70px', height: '70px' }} />
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default MenuVideo;
