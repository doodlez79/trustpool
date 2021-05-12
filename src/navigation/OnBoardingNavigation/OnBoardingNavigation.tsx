import React, { FC } from 'react';

import { createStackNavigator } from '@react-navigation/stack';

import { OnBoardingConfig } from './OnBoardingNavigation.config';

const OnBoardingStack = createStackNavigator();

const OnBoardingNavigation: FC = () => (
  <OnBoardingStack.Navigator
    initialRouteName="Language"
    screenOptions={{
      headerShown: false,
    }}
  >
    {OnBoardingConfig.map(item => (
      <OnBoardingStack.Screen
        key={ item.id }
        name={ item.name }
        component={ item.component }
      />
    ))}
  </OnBoardingStack.Navigator>
);

export default OnBoardingNavigation;
