import 'react-i18next';
import translationEN from './locales/en/translation.json';

declare module 'react-i18next' {
  interface CustomTypeOptions {
    defaultNS: 'translation';
    resources: typeof translationEN;
  }
}
