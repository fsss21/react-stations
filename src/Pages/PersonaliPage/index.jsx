import styles from './PersonaliPage.module.css';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router';

import ArrowRightIcon from '@mui/icons-material/ArrowRight';
import ArrowLeftIcon from '@mui/icons-material/ArrowLeft';

import { useSelector } from 'react-redux';

import Header from '../../components/Header';
import Footer from '../../components/Footer';
import { useLanguage } from '../../LanguageContext';

const categoryTranslations = {
  pilots: 'летчики',
  engineers: 'инженеры',
  researchers: 'исследователи'
};

const PersonaliPage = () => {
  const { isEnabled } = useSelector((state) => state.accessibility);
  const [currentCategory, setCurrentCategory] = useState('pilots');
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(4);
  const [currentPersons, setCurrentPersons] = useState([]);
  const [totalPages, setTotalPages] = useState(1);
  const navigate = useNavigate();
  const { data: dataTranslation } = useLanguage();
  const data = dataTranslation.personali;

  useEffect(() => {
    const loadPersons = () => {
      const persons = data[currentCategory]
        .map((person) => ({
          ...person,
          // Берем только первую фотографию из галереи
          mainImage: person.gallery?.[0] || null
        }))
        .filter((person) => person.mainImage); // Фильтруем персон без фотографий

      setCurrentPersons(persons);
      setTotalPages(Math.ceil(persons.length / itemsPerPage));
      setCurrentPage(1);
    };

    loadPersons();
  }, [currentCategory, data, itemsPerPage]);

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = currentPersons.slice(indexOfFirstItem, indexOfLastItem);

  const handlePrevious = () => {
    if (currentPage > 1) {
      setCurrentPage((prev) => prev - 1);
    }
  };

  const handleNext = () => {
    if (currentPage < totalPages) {
      setCurrentPage((prev) => prev + 1);
    }
  };

  const enabledClass = isEnabled ? styles.enabledButton : '';

  return (
    <>
      <div className={styles.container}>
        <Header />
        <span className={styles.title}>Персоналии</span>
        <div className={styles.categorySelector}>
          {Object.keys(data).map((category) => (
            <button
              key={category}
              onClick={() => setCurrentCategory(category)}
              className={currentCategory === category ? (isEnabled ? styles.enabledActive : styles.active) : ''}
            >
              {categoryTranslations[category] || category.toUpperCase()}
            </button>
          ))}
        </div>
        <div className={styles.imageGrid}>
          {currentItems.length > 0 ? (
            currentItems.map((person) => (
              <div key={person.id} className={styles.imageCard}>
                <img onClick={() => navigate(`/personali/${person.id}`)} src={person.mainImage.src} alt={person.mainImage.title} className={styles.image} />
                <div className={styles.imageInfo}>
                  <span style={{ fontWeight: 'normal' }}>{person.title}</span>
                  <p>{person.date}</p>
                  {/* <p style={{ fontSize: '14px' }}>{person.mainImage.title}</p> */}
                </div>
              </div>
            ))
          ) : (
            <div className={styles.noImages}>Нет доступных изображений</div>
          )}
        </div>
        <div className={styles.pagination}>
          <button onClick={handlePrevious} disabled={currentPage === 1} className={styles.arrowButton}>
            <ArrowLeftIcon style={{ width: '70px', height: '70px' }} />
          </button>
          <span className={styles.pageCounter}>
            {currentPage} / {totalPages}
          </span>
          <button onClick={handleNext} disabled={currentPage === totalPages} className={styles.arrowButton}>
            <ArrowRightIcon style={{ width: '70px', height: '70px' }} />
          </button>
        </div>
        <Footer />
      </div>
    </>
  );
};

export default PersonaliPage;
