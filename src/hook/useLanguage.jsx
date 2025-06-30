// src/hooks/useLanguage.js
import { useState, useEffect } from "react";

const SUPPORTED_LANGUAGES = ["en", "bn", "fr"]; // Add more if needed

export const useLanguage = () => {
  const [language, setLanguage] = useState("en");

  useEffect(() => {
    const storedLang = localStorage.getItem("app-language");
    if (storedLang && SUPPORTED_LANGUAGES.includes(storedLang)) {
      setLanguage(storedLang);
    }
  }, []);

  const switchLanguage = (lang) => {
    if (SUPPORTED_LANGUAGES.includes(lang)) {
      setLanguage(lang);
      localStorage.setItem("app-language", lang);
    }
  };

  return { language, switchLanguage };
};
