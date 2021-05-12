import React, {
  FC, useContext, useEffect, useState,
} from 'react';
import { Appearance } from 'react-native';

import { THEME_TYPE } from 'entitiesState/settings';
import { currentTheme } from 'ducks/Settings/utils';
import { ThemeColors } from './Theme.config';
import { ContextThemeType } from './Theme.types';

const osTheme = Appearance.getColorScheme();

export const getTheme = (mode: THEME_TYPE.DARK | THEME_TYPE.LIGHT) => ThemeColors[mode];

export const ManageThemeContext: React.Context<any> = React.createContext({
  theme: osTheme,
  colors: getTheme(osTheme as THEME_TYPE.DARK | THEME_TYPE.LIGHT),
  toggle: () => { },
});

export const useTheme = () => useContext<ContextThemeType>(ManageThemeContext);

type Props = {
  theme: THEME_TYPE
}
export const ThemeManage:FC<Props> = ({ theme, children }) => {
  const [ currentThemeManage, setCurrentThemeManage ] = useState(theme);
  const toggleTheme = (value: THEME_TYPE) => {
    setCurrentThemeManage(value);
  };
  useEffect(() => {
    toggleTheme(theme);
  }, [ theme ]);
  return (
    <ManageThemeContext.Provider value={{
      theme: theme === THEME_TYPE.AUTO ? currentTheme() : theme,
      colors: getTheme(currentThemeManage === THEME_TYPE.AUTO
        ? currentTheme() : currentThemeManage as THEME_TYPE.DARK | THEME_TYPE.LIGHT),
      toggle: toggleTheme,
    }}
    >
      {children}
    </ManageThemeContext.Provider>
  );
};
