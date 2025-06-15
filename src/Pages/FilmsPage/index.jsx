import { useState, useEffect } from 'react';
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
    <div className={styles.container}>
      <Header />
      <h1 className={styles.mainTitle}>Фильмы и книги</h1>

      <div className={styles.tabsMenu}>
        <button className={`${styles.tabButton} ${activeTab === TABS.FILMS ? styles.active : ''}`} onClick={() => setActiveTab(TABS.FILMS)}>
          Фильмы
        </button>
        <button className={`${styles.tabButton} ${activeTab === TABS.AUDIOBOOKS ? styles.active : ''}`} onClick={() => setActiveTab(TABS.AUDIOBOOKS)}>
          Аудиокниги
        </button>
        <button className={`${styles.tabButton} ${activeTab === TABS.LECTURES ? styles.active : ''}`} onClick={() => setActiveTab(TABS.LECTURES)}>
          Лекции
        </button>
        <button className={`${styles.tabButton} ${activeTab === TABS.BOOKS ? styles.active : ''}`} onClick={() => setActiveTab(TABS.BOOKS)}>
          Книги
        </button>
      </div>

      <div className={styles.content}>{renderTabContent()}</div>

      <Footer />
    </div>
  );
};

export default FilmsPage;
