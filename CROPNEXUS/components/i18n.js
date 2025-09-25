import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import en from './locales/translations/en.json';
import hi from './locales/translations/hi.json';
import bn from './locales/translations/bn.json';

i18n
  .use(initReactI18next)
  .init({
    compatibilityJSON: 'v3',
    lng: 'en',
    fallbackLng: 'en',
    resources: {
      en: en,
      hi: hi,
      bn: bn,
    },
    interpolation: {
      escapeValue: false,
    },
  });

export default i18n;