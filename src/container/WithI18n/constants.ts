import { en as EN } from 'localization/en';
import { ru as RU } from 'localization/ru';

const resources = {
  en_US: {
    translation: EN,
  },
  ru_RU: {
    translation: RU,
  },
};

export const optionsI18n = {
  supportedLngs: Object.keys(resources),
  resources,
  keySeparator: '.',
  fallbackLng: Object.keys(resources),
  debug: false,
  interpolation: {
    escapeValue: false,
  },
  react: {
    useSuspense: true,
  },
};
