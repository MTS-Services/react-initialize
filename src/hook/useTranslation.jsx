// useTranslation.js
import { useState } from "react";
import { translations } from "../assets/locales/translations";

export const useTranslation = () => {
  const [language, setLanguage] = useState("en");

  const t = (key, params = {}) => {
    let text = translations[language][key] || key;

    // Replace placeholders like {name} with actual values
    Object.keys(params).forEach((param) => {
      text = text.replace(`{${param}}`, params[param]);
    });

    return text;
  };

  return { t, language, setLanguage };
};
