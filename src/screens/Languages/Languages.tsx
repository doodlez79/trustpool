import React, { FC, useCallback } from 'react';

import {
  View,
} from 'react-native';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';
import { StackScreenProps } from '@react-navigation/stack';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';

import { MainStackParamList } from 'navigation/Navigation.types';
import { Actions, Selectors } from 'ducks';
import { LANG_TYPE } from 'entitiesState/settings';
import { Typography } from 'components/Typography';
import { mainColors } from 'constants/colors';
import { Btn } from 'components/Btn';
import { Container } from 'components/Container';
import { perfectSize } from 'helpers/PerfectSize';
import { useTheme } from 'helpers/ThemeManage';

import { useFocusEffect } from '@react-navigation/native';
import { LangSelectedContent } from 'components/LangSelectedContent';
import { PageControl } from 'components/PageControl';
import { styles } from './styles';

export interface LanguagesScreenProps extends StackScreenProps<MainStackParamList, 'Languages'>{}

const LanguagesScreen:FC<LanguagesScreenProps> = ({ navigation }) => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const lang = useSelector(Selectors.Setting.getCurrentLang);
  const isFirstVisit = useSelector(Selectors.App.isFirstVisit);

  const { colors } = useTheme();

  const changeLang = (lang: LANG_TYPE) => {
    dispatch(Actions.Setting.changeLangApp(lang as LANG_TYPE));
  };

  useFocusEffect(useCallback(() => {
    if (isFirstVisit) {
      dispatch(Actions.App.firstEnter());
    }
  }, []));

  const insets = useSafeAreaInsets();

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

        <View>
          <Typography
            style={ styles.title }
            text={ t('screens.Language.title') }
            color={ mainColors.blue }
            fontSize={ 36 }
            bold
          />
          <Typography
            text={ t('screens.Language.description') }
            color={ colors.text }
            fontSize={ 16 }
          />

        </View>
        <LangSelectedContent lang={ lang } changeLang={ changeLang } />
        <Btn
          title={ t('screens.Language.btn') }
          onClick={ () => navigation.navigate('Theme') }
        />
      </Container>
      <PageControl style={{ marginTop: perfectSize(20) }} count={ 3 } active={ 0 } />

    </SafeAreaView>

  );
};

export default LanguagesScreen;
