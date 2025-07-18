import styles from './Historical.module.css';
import { useNavigate } from 'react-router';
import { useSelector } from 'react-redux';

import Header from '../../components/Header';
import Footer from '../../components/Footer';
import { useLanguage } from '../../LanguageContext';
import React from 'react';

const HistoricalPage = () => {
  const { isEnabled } = useSelector((state) => state.accessibility);
  const navigate = useNavigate();
  const { data = {} } = useLanguage();
  const operations = Array.isArray(data.operations) ? data.operations : [];

  const handleItemClick = (id) => {
    navigate(`/history-item/${id}`);
  };

  console.log('data', data);
  console.log('operations', operations);

  return (
    <>
      <section className={styles.container}>
        <Header />
        {isEnabled ? (
          <div className={styles.content}>
            <span className={styles.title}>{data.sectionHistoryTitle}</span>
            {operations.map?.((operation) => (
              <React.Fragment key={operation.id}>
                <span className={styles.subTitle} dangerouslySetInnerHTML={{ __html: operation.title }} />
                <span className={styles.info} onClick={() => handleItemClick(operation.id)}>
                  {data.learnMore}
                </span>
              </React.Fragment>
            ))}
          </div>
        ) : (
          operations.map((operation) => (
            <div key={operation.id} className={styles.operation} style={data.operationStyles[operation.id]} onClick={() => handleItemClick(operation.id)} />
          ))
        )}
        <Footer />
      </section>
    </>
  );
};

export default HistoricalPage;
