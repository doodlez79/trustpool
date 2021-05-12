import React, { FC } from 'react';

import { View, TouchableOpacity } from 'react-native';

import { StackScreenProps } from '@react-navigation/stack';
import { MainStackParamList } from 'navigation/Navigation.types';
import { namesTheme } from 'screens/Onbarding/ThemeScreen/ThemeScreen.config';
import { THEME_TYPE } from 'entitiesState/settings';
import { SelectedItemRadioType } from 'components/SelectedItemRadioType';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { Actions, Selectors } from 'ducks';

import { styles } from './styles';

export interface ThemeScreenProps extends StackScreenProps<MainStackParamList, 'ThemeSetting'>{
  changeTheme: (theme: THEME_TYPE) => void
}

const ThemeScreen:FC<ThemeScreenProps> = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const currentSettingTheme = useSelector(Selectors.Setting.getTheme);
  const changeTheme = (value: THEME_TYPE) => {
    dispatch(Actions.Setting.changeTheme(value));
  };

  return (
    <View style={{
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
    }}
    >
      <View>
        {
          (Object.keys(namesTheme) as [THEME_TYPE.DARK, THEME_TYPE.LIGHT, THEME_TYPE.AUTO]).map(item => (
            <TouchableOpacity key={ item } onPress={ () => changeTheme(item) }>
              <SelectedItemRadioType
                style={ styles.selectedItem }
                text={ t(`screens.Theme.${namesTheme[item].name}`) }
                Icon={ (
                  <View
                    style={{
                      ...styles.icon,
                      transform: [{ rotate: item === THEME_TYPE.DARK ? '180 deg' : '0 deg' }],
                    }}
                  >
                    {namesTheme[item].icon}
                  </View>
                ) }
                active={ item === currentSettingTheme }
              />
            </TouchableOpacity>
          ))
        }
      </View>

    </View>
  );
};

export default ThemeScreen;
