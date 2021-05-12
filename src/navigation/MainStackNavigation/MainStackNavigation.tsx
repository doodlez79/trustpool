import React, {
  FC,
} from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import { headerOptions } from 'navigation/Navigations.config';
import { useTheme } from 'helpers/ThemeManage';
import { useTranslation } from 'react-i18next';
import { ErrorState } from 'components/ErrorState';
import { Selectors } from 'ducks';
import { useSelector } from 'react-redux';

import { MainStackNavigationConfig } from './MainStackNavigation.config';

const MainStack = createStackNavigator();

const MainNavigation: FC = () => {
  const { colors } = useTheme();
  const { t } = useTranslation();
  const isSecureCode = useSelector(Selectors.Setting.isSecureCode);
  const isFirstVisitCodeScreen = useSelector(Selectors.Setting.isFirstVisitCodeScreen);
  const resetCode = useSelector(Selectors.Setting.getResetCodeStatus);

  const renderInitialRoute = () => {
    if (!isSecureCode && !isFirstVisitCodeScreen) {
      return 'AccessSecureCode';
    }
    if (!isSecureCode) {
      return 'BottomNav';
    }
    if (isSecureCode || resetCode) {
      return 'SecureCodeScreen';
    }
    return 'BottomNav';
  };

  const isConnection = useSelector(Selectors.App.isConnection);

  return (
    <>
      <ErrorState isConnection={ isConnection } />

      <MainStack.Navigator
        initialRouteName={ renderInitialRoute() }
        screenOptions={{
          headerShown: true,
        }}
      >
        {MainStackNavigationConfig.map(item => (
          <MainStack.Screen
            key={ item.id }
            name={ item.name }
            component={ item.component }
            options={ () => headerOptions({ ...item, title: t(`screens.${item.name}.nameScreen`) }, colors, 16) }
          />
        ))}
      </MainStack.Navigator>
    </>
  );
};

export default MainNavigation;
