import React, { FC, useEffect } from 'react';

import { View } from 'react-native';
import { StackScreenProps } from '@react-navigation/stack';
import { useTranslation } from 'react-i18next';

import { LinkingURLService } from 'services';
import { MainStackParamList } from 'navigation/Navigation.types';
import { Container } from 'components/Container';
import NavigationBack from 'components/NavigationBack/NavigationBack';
import { DrawerItem } from 'components/DrawerItem';

export interface SupportScreenProps extends StackScreenProps<MainStackParamList, 'Support'>{}

const SupportScreen: FC<SupportScreenProps> = ({ navigation, route }) => {
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

  return (
    <Container
      paddingSize={ 16 }
      style={{
        flex: 1,
      }}
    >
      <View>
        <DrawerItem
          onPress={ () => navigation.navigate('StratumUrls') }
          title={ t('screens.Support.stratum') }
        />
        <DrawerItem
          onPress={ () => navigation.navigate('ReferralList') }
          title={ t('screens.Support.referal') }
        />
        <DrawerItem
          onPress={ () => LinkingURLService.openURL('https://t.me/trustpool') }
          title={ t('screens.Support.telegramm') }
        />
        <DrawerItem
          onPress={ () => LinkingURLService.openURL('https://trustpool.ru/help') }
          title={ t('screens.Support.faq') }
        />
      </View>

    </Container>
  );
};

export default SupportScreen;
