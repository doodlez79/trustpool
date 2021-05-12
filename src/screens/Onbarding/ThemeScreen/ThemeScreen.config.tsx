import { THEME_TYPE } from 'entitiesState/settings';
import Theme from 'Icons/Theme.svg';
import React from 'react';

export const namesTheme: any = {
  [THEME_TYPE.AUTO]: {
    name: 'default',
    icon: <Theme />,
    system: true,
  },
  [THEME_TYPE.DARK]: {
    name: 'dark',
    icon: <Theme />,
    system: false,
  },
  [THEME_TYPE.LIGHT]: {
    name: 'light',
    icon: <Theme />,
    system: false,
  },
};
