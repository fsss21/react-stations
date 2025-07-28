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
  AUDIO: 'AUDIO'
};

const Menu = ({ data }) => {
  const { isEnabled } = useSelector((state) => state.accessibility);
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
    <section className={styles.container}>
      <Header />
      <div className={styles.content}>
        {isEnabled ? (
          <>
            <span className={styles.enableTitle}> {data.sectionHistoryTitle}</span>
            <span className={styles.enableSubtitle} dangerouslySetInnerHTML={{ __html: title }} />
          </>
        ) : (
          <>
            <span className={styles.title}> {data.sectionHistoryTitle}</span>
            <span className={styles.subtitle}>
              <PlayArrowIcon style={{ width: '70px', height: '70px' }} />
              <span dangerouslySetInnerHTML={{ __html: title }} />
            </span>
          </>
        )}
        <div className={styles.buttons}>
          <button
            className={`${`${baseClass} ${enabledClass}`} ${activeTab === TABS.PHOTO ? (isEnabled ? styles.enabledActive : styles.active) : ''}`}
            onClick={() => setActiveTab(TABS.PHOTO)}
          >
            {data.tabPhoto}
          </button>
          <button
            className={`${`${baseClass} ${enabledClass}`} ${activeTab === TABS.VIDEO ? (isEnabled ? styles.enabledActive : styles.active) : ''}`}
            onClick={() => setActiveTab(TABS.VIDEO)}
          >
            {data.tabVideo}
          </button>
          <button
            className={`${`${baseClass} ${enabledClass}`} ${activeTab === TABS.AUDIO ? (isEnabled ? styles.enabledActive : styles.active) : ''}`}
            onClick={() => setActiveTab(TABS.AUDIO)}
          >
            {data.tabAudio}
          </button>
        </div>
        <div className={styles.textSection} dangerouslySetInnerHTML={{ __html: text }}></div>
      </div>

      {renderContent()}
      <Footer />
    </section>
  );
};

export default Menu;
