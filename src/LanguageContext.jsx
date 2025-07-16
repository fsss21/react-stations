import React, { createContext, useEffect, useContext, useState } from 'react';

const LanguageContext = createContext();

export const LanguageProvider = ({ children }) => {
  const [lang, setLang] = useState('ru');
  const [data, setData] = useState({});

  useEffect(() => {
    Promise.all([
      fetch('/data/ru.js')
        .then((res) => res.text())
        .then(eval),
      fetch('/data/en.js')
        .then((res) => res.text())
        .then(eval),
      fetch('/data/data.js')
        .then((res) => res.text())
        .then(eval),
      fetch('/data/games.js')
        .then((res) => res.text())
        .then(eval)
    ]).then(() => {
      setData({
        ...window.translations[lang],
        operationStyles: window.operationStyles,
        gamesData: window.gamesData,
        puzzleData: window.puzzleData,
        crosswordData: window.crosswordData,
        difficultyLevels: window.difficultyLevels,
        quizData: window.quizData
      });
    });
  }, [lang]);

  const toggleLang = () => setLang((prev) => (prev === 'ru' ? 'en' : 'ru'));

  return <LanguageContext.Provider value={{ lang, toggleLang, data }}>{children}</LanguageContext.Provider>;
};

export const useLanguage = () => useContext(LanguageContext);
