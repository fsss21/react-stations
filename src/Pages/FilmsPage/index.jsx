import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import styles from './FilmsPage.module.css';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import FilmsTab from './FilmsTab';
import AudioTab from './AudioTab/index.jsx';
import BooksTab from './BooksTab';
import { useLanguage } from '../../LanguageContext';

const TABS = {
  FILMS: 'films',
  AUDIOBOOKS: 'audioBooks',
  LECTURES: 'lectures',
  BOOKS: 'books'
};

const FilmsPage = () => {
  const { isEnabled } = useSelector((state) => state.accessibility);
  const [activeTab, setActiveTab] = useState(TABS.FILMS);
  const { data } = useLanguage();

  // Сбрасываем состояние при размонтировании
  useEffect(() => {
    return () => {
      // Очистка ресурсов при размонтировании компонента
      const videos = document.querySelectorAll('video');
      videos.forEach((video) => {
        video.pause();
        video.removeAttribute('src');
        video.load();
      });
    };
  }, []);

  const renderTabContent = () => {
    switch (activeTab) {
      case TABS.FILMS:
        return <FilmsTab items={data.library.films} typeName="Фильмов" />;
      case TABS.AUDIOBOOKS:
        return <AudioTab items={data.library.audioBooks} typeName="Аудиокниг" />;
      case TABS.LECTURES:
        return <FilmsTab items={data.library.lectures} />;
      case TABS.BOOKS:
        return <BooksTab items={data.library.books} />;
      default:
        return null;
    }
  };

  return (
    <section className={styles.container}>
      <Header />
      <span className={styles.mainTitle}>{data.mediaTitle}</span>

      <div className={styles.tabsMenu}>
        <button
          className={`${styles.tabButton} ${activeTab === TABS.FILMS ? (isEnabled ? styles.enabledActive : styles.active) : ''}`}
          onClick={() => setActiveTab(TABS.FILMS)}
        >
          {data.tabFilms}
        </button>

        <button
          className={`${styles.tabButton} ${activeTab === TABS.AUDIOBOOKS ? (isEnabled ? styles.enabledActive : styles.active) : ''}`}
          onClick={() => setActiveTab(TABS.AUDIOBOOKS)}
        >
          {data.tabAudiobooks}
        </button>

        <button
          className={`${styles.tabButton} ${activeTab === TABS.LECTURES ? (isEnabled ? styles.enabledActive : styles.active) : ''}`}
          onClick={() => setActiveTab(TABS.LECTURES)}
        >
          {data.tabLectures}
        </button>

        <button
          className={`${styles.tabButton} ${activeTab === TABS.BOOKS ? (isEnabled ? styles.enabledActive : styles.active) : ''}`}
          onClick={() => setActiveTab(TABS.BOOKS)}
        >
          {data.tabBooks}
        </button>
      </div>

      <div className={styles.content}>{renderTabContent()}</div>

      <Footer />
    </section>
  );
};

export default FilmsPage;
