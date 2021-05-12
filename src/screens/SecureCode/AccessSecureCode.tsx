import React, { FC, useCallback } from 'react';

import { View } from 'react-native';

import { StackScreenProps } from '@react-navigation/stack';
import { MainStackParamList } from 'navigation/Navigation.types';
import { useDispatch } from 'react-redux';
import { Actions } from 'ducks';
import { Btn } from 'components/Btn';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';
import { useFocusEffect } from '@react-navigation/core';
import { perfectSize } from 'helpers/PerfectSize';
import { useTranslation } from 'react-i18next';
import { useTheme } from 'helpers/ThemeManage';
import { Container } from 'components/Container';
import { CloseBtn } from 'components/CloseBtn';
import { Typography } from 'components/Typography';
import { mainColors } from 'constants/colors';
import { THEME_TYPE } from 'entitiesState/settings';
import SecusityLight from 'Icons/SecusityLight.svg';
import SecusityDark from 'Icons/SecusityDark.svg';

import { styles } from './styles';

export interface AccessSecureCodeProps extends StackScreenProps<MainStackParamList, 'AccessSecureCode'>{}

const AccessSecureCode:FC<AccessSecureCodeProps> = ({ navigation }) => {
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const { colors, theme } = useTheme();
  const insets = useSafeAreaInsets();

  useFocusEffect(useCallback(() => {
    dispatch(Actions.Setting.setFirstVisitSecureCodeScreen(true));
  }, []));
  return (
    <SafeAreaView style={{
      flex: 1,
      paddingBottom: insets.bottom ? perfectSize(103) - insets.bottom : perfectSize(103),
    }}
    >
      <Container
        paddingSize={ 16 }
        style={{
          ...styles.container,
          paddingTop: perfectSize(108) - insets.top,
        }}
      >
        <CloseBtn
          styles={ styles.closeBtn }
          onClick={ () => navigation.replace('BottomNav') }
        />
        <View>
          <Typography
            style={ styles.title }
            text={ t('screens.AccessSecureCode.title') }
            color={ mainColors.blue }
            fontSize={ 24 }
            bold
          />
          <Typography
            text={ t('screens.AccessSecureCode.description') }
            fontSize={ 16 }
            color={ colors.text }
          />
        </View>
        <View style={ styles.picture }>
          {
          theme === THEME_TYPE.LIGHT
            ? <SecusityLight />
            : <SecusityDark />

        }
        </View>
        <View style={{ width: '100%', alignItems: 'center' }}>
          <Btn
            title={ t('screens.AccessSecureCode.btn') }
            onClick={ () => navigation.replace('SecureCodeScreen', { createCodeFlag: true, disableSkip: false }) }
          />
        </View>
      </Container>
    </SafeAreaView>
  );
};

export default AccessSecureCode;
