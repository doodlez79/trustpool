import { THEME_TYPE } from 'entitiesState/settings';

export const ThemeTypeToName = {
  [THEME_TYPE.DARK]: 'dark',
  [THEME_TYPE.LIGHT]: 'light',
};

export const NameThemeToType = {
  light: THEME_TYPE.LIGHT,
  dark: THEME_TYPE.DARK,
  'no-preference': THEME_TYPE.LIGHT,
};
