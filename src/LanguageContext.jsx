import React, { createContext, useEffect, useContext, useState } from 'react';

const LanguageContext = createContext();

export const LanguageProvider = ({ children }) => {
  const [lang, setLang] = useState('ru');
  const [data, setData] = useState({});

  useEffect(() => {
    Promise.all([
      fetch('/data/ru.json').then((res) => res.json()),
      fetch('/data/en.json').then((res) => res.json()),
      fetch('/data/data.json').then((res) => res.json()),
      fetch('/data/games.json').then((res) => res.json())
    ]).then(([ru, en, dataCommon, gamesData]) => {
      const translations = { ru, en };
      setData({
        ...translations[lang],
        ...dataCommon.translations[lang],
        operationStyles: dataCommon.operationStyles,
        puzzleData: gamesData.puzzleData,
        crosswordData: gamesData.crosswordData,
        difficultyLevels: gamesData.difficultyLevels,
        quizData: gamesData.quizData
      });
    });
  }, [lang]);
  console.log(data);

  const toggleLang = () => setLang((prev) => (prev === 'ru' ? 'en' : 'ru'));

  return <LanguageContext.Provider value={{ lang, toggleLang, data }}>{children}</LanguageContext.Provider>;
};

export const useLanguage = () => useContext(LanguageContext);
