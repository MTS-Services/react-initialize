import { useEffect, useState } from "react";
import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";

// Import JSON files
import en from "../assets/locales/en.json";
import nl from "../assets/locales/nl.json";

let i18nInitialized = false;

const initI18n = () => {
  if (i18nInitialized) return;

  i18n
    .use(LanguageDetector)
    .use(initReactI18next)
    .init({
      resources: {
        nl: { translation: nl },
        en: { translation: en },
      },
      fallbackLng: "nl", // set Dutch as fallback
      interpolation: { escapeValue: false },
      detection: {
        order: ["localStorage", "cookie", "navigator", "htmlTag"],
        caches: ["localStorage"],
      },
    });

  i18nInitialized = true;
};

export const useLanguage = () => {
  const [language, setLanguage] = useState("nl");
  const [t, setT] = useState(() => (key) => key);

  useEffect(() => {
    initI18n();

    const onLanguageChanged = (lng) => {
      setLanguage(lng);
      setT(() => i18n.t.bind(i18n));
    };

    i18n.on("languageChanged", onLanguageChanged);
    onLanguageChanged(i18n.language);

    return () => i18n.off("languageChanged", onLanguageChanged);
  }, []);

  const switchLanguage = (lng) => {
    i18n.changeLanguage(lng);
  };

  return { language, switchLanguage, t };
};
