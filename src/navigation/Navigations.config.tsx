import React from 'react';

import { perfectSize } from 'helpers/PerfectSize';

import NavigationBack from 'components/NavigationBack/NavigationBack';

import { optionsAnim } from 'constants/animationScreenConfig';
import { NavigationConfigType } from 'navigation/Navigation.types';
import { DarkTheme, DefaultTheme } from '@react-navigation/native';
import { darkThemeColors, mainColors } from 'constants/colors';
import { StackHeaderLeftButtonProps } from '@react-navigation/stack';

export const MyTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    background: mainColors.white,
  },
};

export const MyDarkTheme = {
  ...DarkTheme,
  colors: {
    ...DefaultTheme.colors,
    background: darkThemeColors.main,
  },
};

export const headerOptions = (item: NavigationConfigType & {title: string}, colors:any, fontSize = 24): object => ({
  ...optionsAnim,
  headerShown: Boolean(item.header),
  title: item.title,
  headerTitleAlign: 'center',
  headerTitleStyle: {
    fontFamily: 'OpenSans-Bold',
    fontSize: perfectSize(fontSize),
    color: colors.text,
  },
  headerLeft: ({ onPress, label }: StackHeaderLeftButtonProps) => {
    if (label) {
      return (
        <NavigationBack onClick={ onPress } text="" />
      );
    }
    return null;
  },
  headerLeftContainerStyle: { marginLeft: perfectSize(16) },
  headerRightContainerStyle: {
    marginRight: perfectSize(16),
  },
  headerStyle: {
    backgroundColor: colors.backgroundColor,
    elevation: 0,
    shadowColor: 'transparent',
  },

});
