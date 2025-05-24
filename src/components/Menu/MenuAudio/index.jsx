import { useState } from 'react';
import styles from './MenuAudio.module.css';
import ArrowRightIcon from '@mui/icons-material/ArrowRight';
import ArrowLeftIcon from '@mui/icons-material/ArrowLeft';

const MenuAudio = ({ audios }) => {
    const [currentPage, setCurrentPage] = useState(1);
    const audiosPerPage = 4;
    const totalPages = Math.ceil(audios.length / audiosPerPage);

    const startIndex = (currentPage - 1) * audiosPerPage;
    const currentAudios = audios.slice(startIndex, startIndex + audiosPerPage);

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
                    {currentAudios.map((audio, index) => (
                        <div key={index} className={styles.textBlock}>
                            <p className={styles.audioText}>{audio.text || 'Описание Аудио'}</p>
                        </div>
                    ))}
                </div>
                <div className={styles.content}>
                    <div className={styles.audioGrid}>
                        {currentAudios.map((audio, index) => (
                            <div key={index} className={styles.audioCard}>
                                <audio controls className={styles.audio} src={audio.src || 'fallback-audio.mp3'} alt="MenuAudio" />
                                <h3 className={styles.title}>{audio.title || 'Название Аудио'}</h3>
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

export default MenuAudio;
