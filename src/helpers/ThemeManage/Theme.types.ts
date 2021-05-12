import { THEME_TYPE } from 'entitiesState/settings';

export type ContextThemeType = {theme: THEME_TYPE.DARK | THEME_TYPE.LIGHT,
  colors: ThemeConfigType[THEME_TYPE.DARK | THEME_TYPE.LIGHT], toggle:(value: any) => void}

export type ThemeConfigType = {
  [n in THEME_TYPE.LIGHT | THEME_TYPE.DARK]: {
    text: string;
    secondaryText: string;
    backgroundColor: string;
    backgroundSelectedItem: string;
    backgroundBottomNavigation: string;
    shadowLineForTabs: string;
  };
};
