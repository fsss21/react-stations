import styles from './Historical.module.css';
import { useNavigate } from 'react-router';
import { useSelector } from 'react-redux';

import Header from '../../components/Header';
import Footer from '../../components/Footer';
import { useLanguage } from '../../LanguageContext';
import { operationStyles } from '../../data/data';

const HistoricalPage = () => {
  const { isEnabled } = useSelector((state) => state.accessibility);
  const navigate = useNavigate();
  const { data } = useLanguage();

  const handleItemClick = (id) => {
    navigate(`/history-item/${id}`);
  };

  return (
    <>
      <div className={styles.container}>
        <Header />
        {isEnabled ? (
          <div className={styles.content}>
            <span className={styles.title}>ИСТОРИЧЕСКИЙ ОБЗОР</span>

            {data?.operations?.map?.((operation) => {
              return (
                <>
                  <span className={styles.subTitle}>{operation.title} </span>
                  <span className={styles.info} onClick={() => handleItemClick(operation.id)}>
                    узнать подробнее
                  </span>
                </>
              );
            })}
          </div>
        ) : (
          data?.operations?.map((operation) => (
            <div key={operation.id} className={styles.operation} style={operationStyles[operation.id]} onClick={() => handleItemClick(operation.id)} />
          ))
        )}
        <Footer />
      </div>
    </>
  );
};

export default HistoricalPage;
