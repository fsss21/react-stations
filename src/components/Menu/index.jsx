import { useState } from 'react';
import styles from './MenuPage.module.css';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';

import Header from '../Header';
import Footer from '../Footer';
import MenuPhoto from './MenuPhoto';
import MenuAudio from './MenuAudio';
import MenuVideo from './MenuVideo';

const TABS = {
    PHOTO: 'PHOTO',
    VIDEO: 'VIDEO',
    AUDIO: 'AUDIO',
};

const Menu = ({ data }) => {
    const { images = [], videos = [], audios = [], title } = data;
    const [activeTab, setActiveTab] = useState(TABS.PHOTO);

    const renderContent = () => {
        switch (activeTab) {
            case TABS.PHOTO:
                return <MenuPhoto images={images} />;
            case TABS.VIDEO:
                return <MenuVideo videos={videos} />;
            case TABS.AUDIO:
                return <MenuAudio audios={audios} />;
            default:
                return null;
        }
    };

    return (
        <div className={styles.container}>
            <Header />

            <div className={styles.content}>
                <h1 className={styles.title}>исторический обзор</h1>
                <h2 className={styles.subtitle}>
                    <PlayArrowIcon style={{ width: '70px', height: '70px' }} />
                    {title}
                </h2>

                <div className={styles.buttons}>
                    <button className={`${styles.button} ${activeTab === TABS.PHOTO ? styles.active : ''}`} onClick={() => setActiveTab(TABS.PHOTO)}>
                        фото
                    </button>
                    <button className={`${styles.button} ${activeTab === TABS.VIDEO ? styles.active : ''}`} onClick={() => setActiveTab(TABS.VIDEO)}>
                        видео-ролики
                    </button>
                    <button className={`${styles.button} ${activeTab === TABS.AUDIO ? styles.active : ''}`} onClick={() => setActiveTab(TABS.AUDIO)}>
                        аудиоистории
                    </button>
                </div>
                <div className={styles.tabContent}>{renderContent()}</div>
            </div>
            <Footer />
        </div>
    );
};

export default Menu;
