import React, { FC } from 'react';
import { TouchableOpacity, View } from 'react-native';
import { StackScreenProps } from '@react-navigation/stack';
import { useTranslation } from 'react-i18next';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';
import { useDispatch, useSelector } from 'react-redux';

import { MainStackParamList } from 'navigation/Navigation.types';
import { THEME_TYPE } from 'entitiesState/settings';
import { Actions, Selectors } from 'ducks';
import { Typography } from 'components/Typography';
import { Container } from 'components/Container';

import { perfectSize } from 'helpers/PerfectSize';
import { mainColors } from 'constants/colors';
import { useTheme } from 'helpers/ThemeManage/ThemeManage';
import { Btn } from 'components/Btn';
import { SelectedItemRadioType } from 'components/SelectedItemRadioType';

import { PageControl } from 'components/PageControl';
import { PushNotificationsInst } from 'services';
import { namesTheme } from './ThemeScreen.config';
import { styles } from './styles';

export interface ThemeScreenProps extends StackScreenProps<MainStackParamList, 'Theme'>{}
const ThemeScreen:FC<ThemeScreenProps> = ({ navigation }) => {
  const { t } = useTranslation();

  const dispatch = useDispatch();
  const { colors } = useTheme();
  const currentSettingTheme = useSelector(Selectors.Setting.getTheme);
  const insets = useSafeAreaInsets();
  const changeTheme = (value: THEME_TYPE) => {
    dispatch(Actions.Setting.changeTheme(value));
  };

  const goNextScreen = async () => {
    PushNotificationsInst.getPermission().then(res => {
      if (res === 'undetermined') {
        navigation.navigate('Notification');
      } else {
        navigation.navigate('Auth');
      }
    });
  };
  return (
    <SafeAreaView style={{ flex: 1, paddingBottom: insets.bottom ? 103 - insets.bottom : 103 }}>
      <Container
        paddingSize={ 16 }
        style={{
          ...styles.container,
          paddingTop: perfectSize(108) - insets.top,
        }}
      >
        <View>
          <Typography
            style={{
              ...styles.title,
            }}
            text={ t('screens.Theme.title') }
            color={ mainColors.blue }
            fontSize={ 24 }
            bold
          />
          <Typography
            text={ t('screens.Theme.description') }
            fontSize={ 16 }
            color={ colors.text }
          />
        </View>
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
        <View style={{ width: '100%', alignItems: 'center' }}>
          <Btn
            title={ t('screens.Theme.btn') }
            onClick={ goNextScreen }
          />
          <PageControl style={{ marginTop: perfectSize(20) }} count={ 3 } active={ 1 } />
        </View>

      </Container>
    </SafeAreaView>
  );
};

export default ThemeScreen;
