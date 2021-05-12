import React, { FC } from 'react';
import { View } from 'react-native';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';
import { StackScreenProps } from '@react-navigation/stack';
import { MainStackParamList } from 'navigation/Navigation.types';
import { useTranslation } from 'react-i18next';

import { Container } from 'components/Container';
import { perfectSize } from 'helpers/PerfectSize';
import { Typography } from 'components/Typography';
import { mainColors } from 'constants/colors';
import { Btn } from 'components/Btn';
import { useTheme } from 'helpers/ThemeManage';
import { PushNotificationsInst } from 'services';
import NotificationPictureDark from 'Icons/NotificationPictureDark.svg';
import NotificationPictureLight from 'Icons/NotificationPictureLight.svg';
import { THEME_TYPE } from 'entitiesState/settings';
import { PageControl } from 'components/PageControl';

import { styles } from './styles';

export interface NotificationScreenProps extends StackScreenProps<MainStackParamList, 'Notification'>{}

const NotificationScreen:FC<NotificationScreenProps> = ({ navigation }) => {
  const { t } = useTranslation();
  const { colors, theme } = useTheme();
  const insets = useSafeAreaInsets();

  const getPermissionNotification = async () => {
    const status = await PushNotificationsInst.requestPermission();
    if (status !== 'granted') {
      navigation.replace('Auth');
    } else {
      navigation.replace('Auth');
    }
  };
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
            text={ t('screens.Notification.title') }
            color={ mainColors.blue }
            fontSize={ 24 }
            bold
          />
          <Typography
            text={ t('screens.Notification.description') }
            fontSize={ 16 }
            color={ colors.text }
          />
        </View>
        <View style={ styles.picture }>
          {
            theme === THEME_TYPE.LIGHT
              ? <NotificationPictureLight />
              : <NotificationPictureDark />

          }
        </View>
        <View style={{ width: '100%', alignItems: 'center' }}>
          <Btn
            title={ t('screens.Notification.btn') }
            onClick={ getPermissionNotification }
          />
          <PageControl style={{ marginTop: perfectSize(20) }} count={ 3 } active={ 2 } />
        </View>
      </Container>
    </SafeAreaView>
  );
};

export default NotificationScreen;
