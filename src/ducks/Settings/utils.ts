import { LANG_TYPE, THEME_TYPE } from 'entitiesState/settings';
import * as Localization from 'expo-localization';
import { Appearance } from 'react-native-appearance';

const langMobileNames: any = {
  en: LANG_TYPE.EN,
  'ru-US': LANG_TYPE.RU,
};

const ThemeNameToEnum = {
  dark: THEME_TYPE.DARK,
  light: THEME_TYPE.LIGHT,
  'no-preference': null,
};

export const currentLang = () => {
  const langMobile = Localization.locale;
  if (langMobileNames[langMobile]) {
    return langMobileNames[langMobile];
  }
  return LANG_TYPE.EN;
};

export const currentTheme = (): THEME_TYPE.DARK | THEME_TYPE.LIGHT => {
  const mobileTheme = Appearance.getColorScheme();
  return ThemeNameToEnum[mobileTheme] ? ThemeNameToEnum[mobileTheme] as THEME_TYPE.DARK | THEME_TYPE.LIGHT
    : THEME_TYPE.LIGHT;
};
