import React, {
  FC, useCallback, useState,
} from 'react';
import { Dimensions, View } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';
import { StackScreenProps } from '@react-navigation/stack';
import { TabView } from 'react-native-tab-view';

import { Actions, Selectors } from 'ducks';

import { MainStackParamList } from 'navigation/Navigation.types';

import { perfectSize } from 'helpers/PerfectSize';
import SettingCustomTabBar from 'components/SettingCustomTabBar/SettingCustomTabBar';
import { SettingsAccountContent } from 'components/SettingsAccountContent';
import { SettingGeneralContent } from 'components/SettingGeneralContent';

export interface SettingsScreenProps extends StackScreenProps<MainStackParamList, 'Settings'>{}

const { width } = Dimensions.get('window');

const SettingsScreen:FC<SettingsScreenProps> = ({ navigation }) => {
  const dispatch = useDispatch();
  const user = useSelector(Selectors.Account.getAccountInfo);
  const isSecureSetting = useSelector(Selectors.Setting.isSecureCode);
  const accountLoading = useSelector(Selectors.Auth.isLoading);
  const updateWalletInfo = useCallback(() => {
    dispatch(Actions.Setting.getSettingNotification.request({}, { resolve: () => {} }));
    dispatch(Actions.Setting.getUnits.request());
    dispatch(Actions.Setting.getWalletBalance.request());
  }, []);

  useFocusEffect(updateWalletInfo);

  const singOut = useCallback(() => {
    dispatch(Actions.Auth.signOut.request({
      resolve: () => navigation.replace('Auth'),
      reject: () => navigation.replace('Auth'),
    }));
  }, []);

  const goReferalScreen = useCallback(() => {
    navigation.navigate('Referals', { leftTitle: 'account' });
  }, []);

  const goSupportScreen = useCallback(() => {
    navigation.navigate('Support', { leftTitle: 'account' });
  }, []);

  const goThemeScreen = useCallback(() => {
    navigation.navigate('ThemeSetting', { leftTitle: 'general' });
  }, []);

  const [ routes ] = useState([
    { key: 'account', title: 'account' },
    { key: 'general', title: 'general' },
  ]);

  const [ index, setIndex ] = React.useState(0);

  const goChangePassword = useCallback(() => {
    navigation.navigate('ChangePassword', { leftTitle: 'account' });
  }, []);

  const goLangScreen = useCallback(() => {
    navigation.navigate('LanguagesSettings', { leftTitle: 'general' });
  }, []);

  const goMiningScreen = useCallback(() => {
    navigation.navigate('MiningScreen', { leftTitle: 'general' });
  }, []);

  const goNotificationScreen = useCallback(() => {
    navigation.navigate('NotificationSetting', { leftTitle: 'general' });
  }, []);

  const goSecureSetting = () => {
    if (isSecureSetting) {
      navigation.navigate('SecureCodeScreen', {
        createCodeFlag: false,
        nextPath: 'SecureStoreSettings',
        onlyCode: true,
        disableSkip: true,
      });
    } else {
      navigation.navigate('SecureStoreSettings');
    }
  };

  const renderScene = ({ route }: {route: { key: string, title: string }}) => {
    switch (route.key) {
      case 'account':
        return (
          <SettingsAccountContent
            loadingLogout={ accountLoading }
            goReferalScreen={ goReferalScreen }
            changePassword={ goChangePassword }
            name={ user.account }
            email={ user.email }
            logoutClick={ singOut }
            goSupportScreen={ goSupportScreen }
          />
        );
      case 'general':
        return (
          <SettingGeneralContent
            goSecureSetting={ goSecureSetting }
            goNotificationScreen={ goNotificationScreen }
            goThemeScreen={ goThemeScreen }
            goLangScreen={ goLangScreen }
            goMiningScreen={ goMiningScreen }
          />
        );
      default:
        return null;
    }
  };

  return (
    <View
      style={{
        flex: 1,
        paddingHorizontal: perfectSize(16),
        justifyContent: 'center',
      }}
    >
      <TabView<{key: string, title: string}>
        renderTabBar={ props => <SettingCustomTabBar { ...props } /> }
        navigationState={{ index, routes }}
        renderScene={ renderScene }
        onIndexChange={ setIndex }
        renderLazyPlaceholder={ () => <></> }
        tabBarPosition="top"
        lazy
        lazyPreloadDistance={ 1 }
        initialLayout={{ width, height: 100 }}
      />

    </View>
  );
};

export default SettingsScreen;
