import i18next from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";

import translationEnglish from "./English/translation.json";
import translationPolish from "./Polish/translation.json";

const resources = {
  en: {
    translation: translationEnglish,
  },
  pl: {
    translation: translationPolish,
  },
};

i18next.use(LanguageDetector).use(initReactI18next).init({
  resources,
  fallbackLng: "en",
});

export default i18next;
