import React, {
  FC, useEffect, useRef, useState,
} from 'react';
import { NavigationApp } from 'navigation/Navigation';
import { useDispatch, useSelector } from 'react-redux';
import { Actions, Selectors } from 'ducks';
import { useFonts } from 'expo-font';
import { WithI18n } from 'container/WithI18n';
import { ThemeManage } from 'helpers/ThemeManage';
import * as SplashScreen from 'expo-splash-screen';
import * as Notifications from 'expo-notifications';
import { NotificationResponse } from 'expo-notifications';
import * as Sentry from 'sentry-expo';
import { Subscription } from '@unimodules/core';
import { NavigationContainerRef, StackActions } from '@react-navigation/native';
import NetInfo from '@react-native-community/netinfo';
import { pathByTypeNotif } from 'constants/pathBytTypeNotif';

import { APIService } from 'services';
import { COIN_TYPE } from 'entitiesState/currency';
import { AppState } from 'react-native';
import { useAssets } from 'expo-asset';

const TIME = 240 * 1000;

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: true,
  }),
});

Sentry.init({
  dsn: 'https://80b8d96b653349e6b9b32de96c24bf0d@o538125.ingest.sentry.io/5656075',
  enableInExpoDevelopment: false,
  debug: false,
});

export const navigationRef = React.createRef<NavigationContainerRef>();

const Root:FC = () => {
  const isAuth = useSelector(Selectors.Auth.isAuthorized);
  const isSecureCodeScreen = useSelector(Selectors.Setting.isSecureCode);
  const isFirstVisit = useSelector(Selectors.App.isFirstVisit);
  const theme = useSelector(Selectors.Setting.getTheme);
  const appInit = useSelector(Selectors.App.isInitialized);
  const allAccounts = useSelector(Selectors.Account.getSubAccounts);
  const [ timeBg, setTimeBg ] = useState(0);
  const [ stateApp, setStateApp ] = useState('');

  const dispatch = useDispatch();

  const findIdforChangeSubAcc = (val: string) => {
    const currAcc = allAccounts.find(el => el.account === val);
    let id = 0;
    if (currAcc) {
      id = currAcc.id;
    }
    return id;
  };

  useEffect(() => {
    if ((stateApp === 'background' || stateApp === 'inactive')
      && isSecureCodeScreen && isAuth && Boolean(navigationRef && navigationRef.current)) {
      setTimeBg(new Date().getTime());
    }

    if ((stateApp === 'active')
      && (new Date().getTime() - timeBg) > TIME) {
      navigationRef.current?.dispatch(StackActions.replace('SecureCodeScreen'));
    }
  }, [ stateApp ]);

  const notificationListener = useRef<Subscription>();
  const responseListener = useRef<Subscription>();

  useEffect(() => {
    const unsubscribe = NetInfo.addEventListener(state => {
      APIService.hasNetworkConnection(state.isConnected as boolean);
      dispatch(Actions.App.appNetwork(state.isConnected as boolean));
    });
    AppState.addEventListener('change', e => setStateApp(e));
    responseListener.current = Notifications.addNotificationResponseReceivedListener(
      (response:NotificationResponse) => {
        const { notification: { request: { trigger, content } } } = response;

        if (trigger.type === 'push') {
          if (navigationRef && navigationRef.current && content.data) {
            if (pathByTypeNotif[content.data.type as string]) {
              dispatch(Actions.Account.putChangeSubAccount.request(
                findIdforChangeSubAcc(content.data.account as string),
                {
                  reject: () => {},
                  resolve: () => {},
                },
              ));
              navigationRef.current!.navigate(
                pathByTypeNotif[content.data.type as string],
              );
              dispatch(Actions.Currency.postChangeCoin.request(content.data.currency as COIN_TYPE, {
                resolve: () => {},
                reject: () => {},
              }));
            }
          }
        }
      },
    );

    return () => {
      unsubscribe();
      if (notificationListener && notificationListener.current) {
        Notifications.removeNotificationSubscription(notificationListener.current);
      }

      if (responseListener && responseListener.current) {
        Notifications.removeNotificationSubscription(responseListener.current);
      }
    };
  }, []);

  const [ fontsLoaded ] = useFonts({
    'OpenSans-Regular': require('../../../assets/fonts/OpenSans-Regular.ttf'),
    'OpenSans-Bold': require('../../../assets/fonts/OpenSans-Bold.ttf'),
    'SFProText-Medium': require('../../../assets/fonts/SFProText-Medium.ttf'),
  });

  const [ assets ] = useAssets([ require('../../../assets/app-splash.png') ]);

  const isReadyApp = appInit && fontsLoaded && assets;

  useEffect(() => {
    if (isReadyApp) {
      SplashScreen.hideAsync().then(() => { });
    }
  }, [ isReadyApp ]);

  if (!fontsLoaded) {
    return null;
  }

  return (
    <ThemeManage theme={ theme }>
      <NavigationApp
        isSecureCodeScreen={ isSecureCodeScreen }
        isAuth={ isAuth }
        isFirstVisit={ isFirstVisit }
        refProps={ navigationRef }
      />
    </ThemeManage>

  );
};

export default WithI18n(Root);
