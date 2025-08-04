import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import HttpApi from 'i18next-http-backend';
import LanguageDetector from 'i18next-browser-languagedetector';

i18n
  // Use http backend to load translation files
  .use(HttpApi)
  // Detect user language
  .use(LanguageDetector)
  // Pass the i18n instance to react-i18next
  .use(initReactI18next)
  .init({
    supportedLngs: ['en-US', 'zh-TW', 'ja-JP'],
    fallbackLng: 'en-US',
    // The backend will load from ./i18n/en-US.json, etc.
    // This path is relative to index.html.
    backend: {
      loadPath: './i18n/{{lng}}.json',
    },
    detection: {
      // Order and from where user language should be detected
      order: ['localStorage', 'navigator', 'htmlTag'],
      // Cache user language in localStorage
      caches: ['localStorage'],
      lookupLocalStorage: 'i18nextLng', // key in localStorage
    },
    interpolation: {
      escapeValue: false, // React already safes from xss
    },
    // Using Suspense for loading states
    react: {
      useSuspense: true,
    },
  });

export default i18n;
