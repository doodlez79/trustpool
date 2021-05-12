import React, { FC, useCallback } from 'react';

import { TouchableOpacity, View } from 'react-native';
import { perfectSize } from 'helpers/PerfectSize';
import { Typography } from 'components/Typography';
import { useTheme } from 'helpers/ThemeManage';
import Switch from 'components/Switch/Switch';
import { useDispatch, useSelector } from 'react-redux';
import { Actions, Selectors } from 'ducks';
import { StackScreenProps } from '@react-navigation/stack';
import { MainStackParamList } from 'navigation/Navigation.types';
import { Container } from 'components/Container';
import { useFocusEffect } from '@react-navigation/core';
import NavigationBack from 'components/NavigationBack/NavigationBack';
import { useTranslation } from 'react-i18next';
import Chevron from 'Icons/Chevron.svg';
import { darkThemeColors } from 'constants/colors';
import { LocalAuthenticationServices } from 'services';
import { renderName } from 'screens/SecureCode/SecureCode';

export const typeText = {
  finger: 'Touch ID',
  face: 'Face ID',
};

export interface SecureStoreSettingsProps extends StackScreenProps<MainStackParamList, 'SecureStoreSettings'>{}
const SecureStoreSettings:FC<SecureStoreSettingsProps> = ({ navigation }) => {
  const { colors } = useTheme();
  const { t } = useTranslation();
  const isSecureCode = useSelector(Selectors.Setting.isSecureCode);
  const typeLogin = useSelector(Selectors.Setting.getTypeLogin);
  const currentTypeLogin = useSelector(Selectors.Setting.getCurrentTypeLogin);
  const dispatch = useDispatch();

  useFocusEffect(useCallback(() => {
    navigation.setOptions({
      headerLeft: () => <NavigationBack text="" onClick={ () => navigation.navigate('Settings') } />,
    });
  }, []));
  const onOffSecureCode = () => {
    if (!isSecureCode) {
      navigation.navigate('SecureCodeScreen', {
        createCodeFlag: true,
        checkBiometryAfterSet: true,
        nextPath: 'SecureStoreSettings',
        onlyCode: true,
        disableSkip: true,
      });
    } else {
      navigation.navigate('SecureCodeScreen', {
        nextPath: 'SecureStoreSettings',
        removeSecureCode: true,
        onlyCode: true,
        disableSkip: true,
      });
    }
  };
  const onOffFaceOrTouchId = async () => {
    const isHaveBiometric = await LocalAuthenticationServices.hardwareAsync();
    const typeBimetric = await LocalAuthenticationServices.supportAuthType();

    if (isHaveBiometric && typeBimetric.length > 0 && isSecureCode) {
      dispatch(Actions.Setting.setSecureStoreData({
        typeLogin: typeBimetric,
        isSecureCodeAuth: isSecureCode,

        currentTypeLogin: currentTypeLogin ? '' : typeBimetric[0],
      }));
    } else {
      // console.log('Error');
    }
  };
  const changeSecureCode = () => {
    navigation.navigate('SecureCodeScreen', {
      nextPath: 'SecureStoreSettings',
      changeCode: true,
      onlyCode: true,
      disableSkip: true,
      disableRequestBiometric: true,
    });
  };

  return (
    <View>
      <Container paddingSize={ 16 }>
        <View style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: 20,
        }}
        >
          <Typography
            text={ t('screens.SecureStoreSettings.usePasscode') }
            bold
            style={{ marginRight: perfectSize(5) }}
            color={ colors.text }
          />
          <Switch value={ isSecureCode } onSwitch={ onOffSecureCode } />
        </View>
        {
          renderName()![typeLogin[0]] && (
            <View style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginBottom: 20,
            }}
            >
              <Typography
                /* eslint-disable-next-line max-len */
                text={ t('screens.SecureStoreSettings.useBio', { type: t(`screens.SecureCodeScreen.${renderName()![typeLogin[0]]}`) }) }
                bold
                style={{ marginRight: perfectSize(5) }}
                color={ isSecureCode ? colors.text : darkThemeColors.grey }
              />
              <Switch value={ !!currentTypeLogin } onSwitch={ onOffFaceOrTouchId } />
            </View>
          )
        }

        <TouchableOpacity
          disabled={ !isSecureCode }
          onPress={ isSecureCode ? changeSecureCode : () => {} }
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
        >
          <Typography
            text={ t('screens.SecureStoreSettings.changePassCode') }
            bold
            style={{ marginRight: perfectSize(5) }}
            color={ isSecureCode ? colors.text : darkThemeColors.grey }
          />
          <View style={{
            width: 10,
            height: 10,
            transform: [{
              rotate: '-90deg',
            }],
          }}
          >
            <Chevron fill={ colors.secondaryText } />
          </View>
        </TouchableOpacity>
      </Container>

    </View>
  );
};

export default SecureStoreSettings;
