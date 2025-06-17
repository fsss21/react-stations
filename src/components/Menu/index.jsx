import { useState } from 'react';
import styles from './MenuPage.module.css';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';

import { useSelector } from 'react-redux';

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
    const { isEnabled  } = useSelector(state => state.accessibility);
    const { images = [], videos = [], audios = [], title, text } = data;
    const [activeTab, setActiveTab] = useState(TABS.PHOTO);

    
    const baseClass = styles.button;
    const enabledClass = isEnabled ? styles.enabledButton : '';


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
                {isEnabled ? 
                <>
                    <span className={styles.enableTitle}>исторический обзор</span>
                    <span className={styles.enableSubtitle}>
                        {title}
                    </span>
                </>
                :
                <>
                    <span className={styles.title}>исторический обзор</span>
                    <span className={styles.subtitle}>
                        <PlayArrowIcon style={{ width: '70px', height: '70px' }} />
                        {title}
                    </span>
                </>
                }
                <div className={styles.buttons}>
                    <button className={`${`${baseClass} ${enabledClass}`} ${activeTab === TABS.PHOTO ? (isEnabled ? styles.enabledActive : styles.active) : ''}`} onClick={() => setActiveTab(TABS.PHOTO)}>
                        фото
                    </button>
                    <button className={`${`${baseClass} ${enabledClass}`} ${activeTab === TABS.VIDEO ? (isEnabled ? styles.enabledActive : styles.active) : ''}`} onClick={() => setActiveTab(TABS.VIDEO)}>
                        видео-ролики
                    </button>
                    <button className={`${`${baseClass} ${enabledClass}`} ${activeTab === TABS.AUDIO ? (isEnabled ? styles.enabledActive : styles.active) : ''}`} onClick={() => setActiveTab(TABS.AUDIO)}>
                        аудиоистории
                    </button>
                </div>
                <div className={styles.textSection}>{text}</div>
            </div>

            {renderContent()}
            <Footer />
        </div>
    );
};

export default Menu;
