import React, { createContext, useEffect, useContext, useState } from 'react';
import { translations } from './data/data';

const LanguageContext = createContext();

export const LanguageProvider = ({ children }) => {
  const [lang, setLang] = useState('ru');
  const [data, setData] = useState({});

  useEffect(() => {
    setData(translations[lang]);
  }, [lang]);

  const toggleLang = () => setLang((prev) => (prev === 'ru' ? 'en' : 'ru'));

  return <LanguageContext.Provider value={{ lang, toggleLang, data }}>{children}</LanguageContext.Provider>;
};

export const useLanguage = () => useContext(LanguageContext);
