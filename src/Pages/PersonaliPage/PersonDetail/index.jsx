import { useState } from 'react';
import { useParams } from 'react-router';
import styles from './PersonDetail.module.css';
import Header from '../../../components/Header';
import Footer from '../../../components/Footer';
import TabsMenu from './TabsMenu';
import Biography from './TabsMenu/Biography';
import Achievements from './TabsMenu/Achievements';
import Quote from './TabsMenu/Quote';
import Gallery from './TabsMenu/Gallery';
import { useLanguage } from '../../../LanguageContext';

const TABS = {
  BIOGRAPHY: 'biography',
  ACHIEVEMENTS: 'achievements',
  QUOTE: 'quote',
  GALLERY: 'gallery'
};

const PersonDetail = () => {
  const { id } = useParams();
  const [activeTab, setActiveTab] = useState(TABS.BIOGRAPHY);
  const { data } = useLanguage();

  const categoryMap = {
    pilot: 'pilots',
    engineer: 'engineers',
    researcher: 'researchers'
  };

  const TABS_CONFIG = [
    { key: TABS.BIOGRAPHY, label: data.tabBiography },
    { key: TABS.ACHIEVEMENTS, label: data.tabAchievements },
    { key: TABS.QUOTE, label: data.tabQuote },
    { key: TABS.GALLERY, label: data.tabGallery }
  ];

  const [categoryPrefix] = id.split('-');
  const category = categoryMap[categoryPrefix];
  const person = data.personali[category]?.find((p) => p.id === id);

  if (!person) {
    return <div className={styles.error}>Персона не найдена</div>;
  }

  const renderContent = () => {
    switch (activeTab) {
      case 'biography':
        return <Biography data={person.biography} images={person.gallery} />;
      case 'achievements':
        return <Achievements achievements={person.achievements} images={person.gallery} />;
      case 'quote':
        return <Quote quotes={person.quotes} images={person.gallery} />;
      case 'gallery':
        return <Gallery images={person.gallery} />;
      default:
        return null;
    }
  };

  return (
    <section className={styles.container}>
      <Header />
      <span className={styles.title}>Персоналии</span>

      <TabsMenu activeTab={activeTab} onTabChange={setActiveTab} tabs={TABS_CONFIG} />

      <div className={styles.content}>
        <span className={styles.header}>
          <span className={styles.subtitle}>{person.title}</span>
          <span className={styles.subtitle}>{person.date}</span>
        </span>
        <div className={styles.tabContent}>{renderContent()}</div>
      </div>
      <Footer />
    </section>
  );
};

export default PersonDetail;
