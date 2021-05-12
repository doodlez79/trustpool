import { BottomTabBarOptions } from '@react-navigation/bottom-tabs';
import { lightThemeColors, mainColors } from 'constants/colors';
import { HomeScreen } from 'screens/Home';
import { WorkersScreen } from 'screens/Workers';
import { Payment } from 'screens/Payment';
import Home from 'Icons/BottomTabBar/Home.svg';
import Workers from 'Icons/BottomTabBar/Workers.svg';
import Payments from 'Icons/BottomTabBar/Payments.svg';
import Menu from 'Icons/BottomTabBar/Menu.svg';
import React from 'react';
import { Dimensions, View } from 'react-native';
import { RFValue } from 'helpers/FontSizePerfect';

const { height } = Dimensions.get('window');

export const tabBarOptions = (colors:any): BottomTabBarOptions => ({
  activeTintColor: mainColors.blue,
  inactiveTintColor: lightThemeColors.grey,
  labelStyle: {
    fontFamily: 'SFProText-Medium',
    fontSize: RFValue(10, height),
  },
  style: {
    backgroundColor: colors.backgroundBottomNavigation,
    borderTopColor: colors.backgroundSelectedItem,
    borderTopWidth: 1,
    paddingTop: 5,
    paddingVertical: 10,
  },
});

export const BottomNavigatorConfig = [
  {
    id: 1,
    component: HomeScreen,
    name: 'Home',
    icon: (color: string, colorInActive: string, focused: boolean) => (
      <Home fill={ focused ? color : colorInActive } />
    ),
  },
  {
    id: 2,
    component: WorkersScreen,
    name: 'Workers',
    icon: (color: string, colorInActive: string, focused: boolean) => (
      <Workers fill={ focused ? color : colorInActive } />
    ),
  },
  {
    id: 3,
    component: Payment,
    name: 'Payment',
    icon: (color: string, colorInActive: string, focused: boolean) => (
      <Payments fill={ focused ? color : colorInActive } />
    ),
  },
  {
    id: 4,
    component: View,
    name: 'Menu',
    icon: (color: string, colorInActive: string, focused: boolean) => (
      <Menu fill={ focused ? color : colorInActive } />
    ),
  },
];
