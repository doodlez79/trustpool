import React, {
  FC, useCallback, useEffect,
} from 'react';
import {
  createStackNavigator,
  TransitionPresets,
} from '@react-navigation/stack';
import { StatusBar } from 'expo-status-bar';
import { NavigationContainer } from '@react-navigation/native';

import { AuthNavigation } from 'navigation/AuthNavigator';
import { THEME_TYPE } from 'entitiesState/settings';
import { OnBoardingNavigation } from 'navigation/OnBoardingNavigation';
import { useTheme } from 'helpers/ThemeManage/ThemeManage';
import { Appearance } from 'react-native-appearance';
import { useSelector } from 'react-redux';
import { Selectors } from 'ducks';
import { MyDarkTheme, MyTheme } from 'navigation/Navigations.config';
import { NavigationAppProps } from 'navigation/Navigation.types';
import { NameThemeToType, ThemeTypeToName } from 'constants/themeData';
import { DrawerNavigator } from 'navigation/DrawerNavigator';

const RootStack = createStackNavigator();

export const NavigationApp: FC<NavigationAppProps> = ({
  isAuth, isFirstVisit, refProps,
}) => {
  const initialRoutName = useCallback(() => {
    if (isFirstVisit) {
      return 'OnBoarding';
    }
    if (isAuth) {
      return 'Main';
    }
    return 'Auth';
  }, []);
  const { theme, toggle } = useTheme();
  const themeSetting = useSelector(Selectors.Setting.getTheme);

  useEffect(() => {
    if (themeSetting === THEME_TYPE.AUTO) {
      const subscription = Appearance.addChangeListener(({ colorScheme }) => {
        if (NameThemeToType[colorScheme]) {
          toggle(NameThemeToType[colorScheme]);
        }
      });

      return () => subscription.remove();
    }
    return () => {};
  }, [ themeSetting ]);

  return (
    <>
      {/* @ts-ignore */}
      <StatusBar style={ ThemeTypeToName[theme] === 'dark'
        ? ThemeTypeToName[THEME_TYPE.LIGHT] : ThemeTypeToName[THEME_TYPE.DARK] }
      />

      <NavigationContainer
        theme={ ThemeTypeToName[theme] === 'dark' ? MyDarkTheme : MyTheme }
        ref={ refProps }
      >
        <RootStack.Navigator
          headerMode="none"
          initialRouteName={ initialRoutName() }
          screenOptions={{
            gestureEnabled: true,
            ...TransitionPresets.SlideFromRightIOS,
          }}
        >
          <RootStack.Screen name="OnBoarding" component={ OnBoardingNavigation } />
          <RootStack.Screen name="Auth" component={ AuthNavigation } />
          <RootStack.Screen name="Main" component={ DrawerNavigator } />
        </RootStack.Navigator>
      </NavigationContainer>
    </>
  );
};
