import React, { useEffect, useState } from 'react';

import { AppState, useWindowDimensions } from 'react-native';
import {
  createDrawerNavigator,
} from '@react-navigation/drawer';

import { MainStackNavigation } from 'navigation/MainStackNavigation';

import { CustomDrawerContent } from 'components/CustomDrawerContent';
import BackgroundApp from 'components/BackgroundApp/BackgroundApp';
import { useAssets } from 'expo-asset';
import { useSelector } from 'react-redux';
import { Selectors } from 'ducks';

const DrawerStack = createDrawerNavigator();

const DrawerNavigator: React.FC = () => {
  const dimensions = useWindowDimensions();
  const isLargeScreen = dimensions.width >= 768;
  const [ appState, setAppState ] = useState<'active' | 'background' | 'inactive'>('active');
  const isSecureCode = useSelector(Selectors.Setting.isSecureCode);
  const [ assets ] = useAssets([ require('../../../assets/app-splash.png') ]);
  useEffect(() => {
    AppState.addEventListener('change', setAppState);

    return () => AppState.removeEventListener('change', setAppState);
  }, []);

  const checkBgStatus = (status: 'active' | 'background' | 'inactive'):boolean => Boolean((status === 'background'
    || status === 'inactive')
    && assets && isSecureCode);

  return (
    <>
      <BackgroundApp isFlagShow={ checkBgStatus(appState) } />
      <DrawerStack.Navigator
        drawerContent={ props => <CustomDrawerContent { ...props } /> }
        drawerPosition="left"
        drawerStyle={ isLargeScreen ? null : { width: '100%' } }
        drawerType="slide"
        edgeWidth={ 0 }
        initialRouteName="Main"
      >
        <DrawerStack.Screen name="Main" component={ MainStackNavigation } />
      </DrawerStack.Navigator>
    </>

  );
};

export default DrawerNavigator;
