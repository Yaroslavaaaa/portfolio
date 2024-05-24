// LanguageSwitcher.js
import React from 'react';
import { useLanguage } from '../../context/languageContext';
import translations from '../../translations';
import './languageSwitcher.css';

export const LanguageSwitcher = () => {
    const { language, changeLanguage } = useLanguage();
    const t = translations[language];
  
    const handleLanguageChange = (event) => {
      changeLanguage(event.target.value);
    };
  
    return (
      <div className="language-switcher">
        <select value={language} onChange={handleLanguageChange} className="select-language">
          <option value="ru">Русский</option>
          <option value="kz">Қазақша</option>
          <option value="en">English</option>
        </select>
      </div>
    );
};
