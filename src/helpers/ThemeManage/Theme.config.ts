import { THEME_TYPE } from 'entitiesState/settings';
import { darkThemeColors, lightThemeColors, mainColors } from 'constants/colors';
import { ThemeConfigType } from './Theme.types';

export const ThemeColors: ThemeConfigType = {
  [THEME_TYPE.LIGHT]: {
    text: lightThemeColors.text,
    backgroundColor: mainColors.white,
    backgroundSelectedItem: lightThemeColors.main,
    secondaryText: lightThemeColors.grey,
    backgroundBottomNavigation: mainColors.white,
    shadowLineForTabs: lightThemeColors.main,
  },
  [THEME_TYPE.DARK]: {
    text: mainColors.white,
    secondaryText: darkThemeColors.grey,
    backgroundColor: darkThemeColors.main,
    backgroundSelectedItem: darkThemeColors.secondary,
    backgroundBottomNavigation: darkThemeColors.secondary,
    shadowLineForTabs: lightThemeColors.text,
  },
};
