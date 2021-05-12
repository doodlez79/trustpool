import React, {
  FC, useEffect,
} from 'react';

import { View } from 'react-native';

import { StackScreenProps } from '@react-navigation/stack';
import { MainStackParamList } from 'navigation/Navigation.types';
import { LANG_TYPE } from 'entitiesState/settings';
import { useTranslation } from 'react-i18next';

import { DrawerItem } from 'components/DrawerItem';
import { perfectSize } from 'helpers/PerfectSize';
import NavigationBack from 'components/NavigationBack/NavigationBack';
import { useDispatch } from 'react-redux';
import { Actions } from 'ducks';

export interface LanguagesSettingScreenProps extends StackScreenProps<MainStackParamList, 'LanguagesSettings'>{}
const LanguagesSettingScreen:FC<LanguagesSettingScreenProps> = ({ navigation, route }) => {
  const { i18n, t } = useTranslation();
  const dispatch = useDispatch();

  useEffect(() => {
    if (route.params && route.params.leftTitle) {
      navigation.setOptions({
        headerLeft: ({ onPress }) => (
          <NavigationBack
            onClick={ onPress }
            text={ t(`screens.Settings.tabName.${route.params.leftTitle}`) as string }
          />
        ),
      });
    }
  }, [ ]);

  const changeLang = (lang: LANG_TYPE) => {
    dispatch(Actions.Setting.changeLangApp(lang));
  };

  return (
    <View style={{
      flex: 1,
    }}
    >

      <View
        style={{
          flex: 1,
          paddingHorizontal: perfectSize(16),
          marginTop: perfectSize(20),
        }}
      >
        <DrawerItem
          onPress={ () => changeLang(LANG_TYPE.EN) }
          title="English"
          active={ i18n.language === LANG_TYPE.EN }
          withOutChevron
        />
        <DrawerItem
          onPress={ () => changeLang(LANG_TYPE.RU) }
          title="Русский"
          active={ i18n.language === LANG_TYPE.RU }
          withOutChevron
        />
      </View>
    </View>

  );
};

export default LanguagesSettingScreen;
