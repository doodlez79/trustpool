import React from 'react';
import Home from 'Icons/BottomTabBar/Home.svg';
import Workers from 'Icons/BottomTabBar/Workers.svg';
import Payments from 'Icons/BottomTabBar/Payments.svg';
import Calculator from 'Icons/Calculator.svg';
import Settings from 'Icons/Settings.svg';
import Help from 'Icons/Help.svg';
import Referal from 'Icons/Referal.svg';

export const DrawerConfig = [
  {
    id: 1,
    name: 'Home',
    icon: (color: string) => (
      <Home fill={ color } />
    ),
  },
  {
    id: 2,
    name: 'Workers',
    icon: (color: string) => (
      <Workers fill={ color } />
    ),
  },
  {
    id: 3,
    name: 'Payment',
    icon: (color: string) => (
      <Payments fill={ color } />
    ),
  },
  {
    id: 4,
    name: 'Calculation',
    icon: (color: string) => (
      <Calculator fill={ color } />
    ),
  },
  {
    id: 5,
    name: 'Support',
    icon: (color: string) => (
      <Help fill={ color } />
    ),
  },
  {
    id: 6,
    name: 'Referals',
    icon: (color: string) => (
      <Referal fill={ color } />
    ),
  },
  {
    id: 10,
    name: 'Settings',
    icon: (color: string) => (
      <Settings fill={ color } />
    ),
  },
];
