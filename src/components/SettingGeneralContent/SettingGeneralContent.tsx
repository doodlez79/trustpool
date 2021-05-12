import React, { FC } from 'react';

import { View } from 'react-native';

import DrawerItem from 'components/DrawerItem/DrawerItem';
import { useTranslation } from 'react-i18next';
import { perfectSize } from 'helpers/PerfectSize';

type SettingGeneralContentProps = {
  goThemeScreen: () => void
  goLangScreen: () => void
  goNotificationScreen: () => void
  goMiningScreen: () => void
  goSecureSetting: () => void
}

const SettingGeneralContent:FC<SettingGeneralContentProps> = ({
  goThemeScreen, goLangScreen, goNotificationScreen, goMiningScreen, goSecureSetting,
}) => {
  const { t } = useTranslation();
  return (
    <View style={{ marginTop: perfectSize(20) }}>
      <DrawerItem title={ t('screens.Settings.theme') } onPress={ goThemeScreen } />
      <DrawerItem title={ t('screens.Settings.language') } onPress={ goLangScreen } />
      <DrawerItem title={ t('screens.Settings.notifications') } onPress={ goNotificationScreen } />
      <DrawerItem title={ t('screens.Settings.mining') } onPress={ goMiningScreen } />
      <DrawerItem title={ t('screens.Settings.passcode') } onPress={ goSecureSetting } />
    </View>
  );
};

export default SettingGeneralContent;
