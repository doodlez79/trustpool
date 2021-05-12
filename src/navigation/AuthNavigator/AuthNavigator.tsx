import React, { FC } from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import { headerOptions } from 'navigation/Navigations.config';
import { useTranslation } from 'react-i18next';
import { useTheme } from 'helpers/ThemeManage/ThemeManage';
import { AuthNavigatorConfig } from './AuthNavigator.config';

const AuthStack = createStackNavigator();

const AuthNavigation: FC = () => {
  const { t } = useTranslation();
  const { colors } = useTheme();

  return (
    <AuthStack.Navigator
      screenOptions={{
        headerShown: true,
      }}
    >
      {AuthNavigatorConfig.map(item => (
        <AuthStack.Screen
          key={ item.id }
          name={ item.name }
          component={ item.component }
          options={ () => headerOptions({ ...item, title: t('screens.Auth.nameScreen') }, colors) }
        />
      ))}
    </AuthStack.Navigator>
  );
};

export default AuthNavigation;
