import React, { FC, useEffect } from 'react';
import { View } from 'react-native';
import { perfectSize } from 'helpers/PerfectSize';

import { DrawerItem } from 'components/DrawerItem';
import { StackScreenProps } from '@react-navigation/stack';
import { MainStackParamList } from 'src/navigation/Navigation.types';
import { THEME_TYPE } from 'entitiesState/settings';
import { useDispatch, useSelector } from 'react-redux';
import { Actions, Selectors } from 'ducks';
import { useTranslation } from 'react-i18next';
import NavigationBack from 'components/NavigationBack/NavigationBack';
import { namesTheme } from '../Onbarding/ThemeScreen/ThemeScreen.config';

export interface ThemeSettingScreenProps extends StackScreenProps<MainStackParamList, 'ThemeSetting'>{
  changeTheme: (theme: THEME_TYPE) => void
}

const ThemeSettingScreen:FC<ThemeSettingScreenProps> = ({ navigation, route }) => {
  const dispatch = useDispatch();

  const currentSettingTheme = useSelector(Selectors.Setting.getTheme);

  const { t } = useTranslation();

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

  const changeTheme = (value: THEME_TYPE) => {
    dispatch(Actions.Setting.changeTheme(value));
  };

  return (
    <View
      style={{
        flex: 1,
        paddingHorizontal: perfectSize(16),
        marginTop: perfectSize(20),
      }}
    >

      {
          (Object.keys(namesTheme) as [THEME_TYPE.DARK, THEME_TYPE.LIGHT, THEME_TYPE.AUTO]).map(item => (
            <DrawerItem
              key={ item }
              title={ t(`screens.Theme.${namesTheme[item].name}`) }
              active={ item === currentSettingTheme }
              withOutChevron
              onPress={ () => changeTheme(item) }
            />
          ))
        }

    </View>
  );
};

export default ThemeSettingScreen;
