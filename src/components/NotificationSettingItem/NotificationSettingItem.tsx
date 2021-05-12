import React, {
  FC, useRef, useState,
} from 'react';

import {
  View, Animated, ScrollView,
} from 'react-native';

import { Typography } from 'components/Typography';
import { perfectSize } from 'helpers/PerfectSize';
import { useTheme } from 'helpers/ThemeManage';
import { mainColors } from 'constants/colors';
import { useTranslation } from 'react-i18next';
import Switch from 'components/Switch/Switch';

type NotificationSettingItemProps ={
  title: string
  hashRate: string
  status: boolean
  unit: string
  changeStatus: (cb: () => void) => void
  onClickValue: () => void
}
const NotificationSettingItem:FC<NotificationSettingItemProps> = ({
  title, status, hashRate, changeStatus, onClickValue, unit,
}) => {
  const switchAnim = useRef(new Animated.Value(!status ? 1 : 0)).current;
  const [ statusSwitch, setStatusSwitch ] = useState(!status);
  const { colors } = useTheme();
  const { t } = useTranslation();

  const onSwitch = () => {
    changeStatus(() => Animated.timing(switchAnim, {
      toValue: !statusSwitch ? 1 : 0,
      duration: 200,
      useNativeDriver: true,
    }).start(() => setStatusSwitch(s => !s)));
  };
  return (
    <View style={{
      flexDirection: 'row',
      justifyContent: 'space-between',
      paddingVertical: perfectSize(10),
      paddingHorizontal: perfectSize(5),
      borderColor: colors.backgroundSelectedItem,
      borderBottomWidth: 2,
    }}
    >
      <ScrollView
        horizontal
        bounces={ false }
        directionalLockEnabled={ false }
        automaticallyAdjustContentInsets={ false }
        showsHorizontalScrollIndicator={ false }
        contentContainerStyle={{
          flexDirection: 'row',
          alignItems: 'center',
        }}
        style={{
          marginRight: 10,
        }}
      >

        <Typography text={ title } bold style={{ marginRight: perfectSize(5) }} color={ colors.text } />
        <Typography
          onPress={ onClickValue }
          text={ hashRate }
          bold
          color={ mainColors.blue }
          style={{ marginRight: 5 }}
        />
        {(title === t('screens.NotificationSetting.Thresholds') || t('screens.NotificationSetting.Fluctuation')) && (
          <Typography
            text={ unit }
            bold
            style={{ marginRight: perfectSize(5) }}
            color={ colors.text }
          />
        )}

      </ScrollView>
      <Switch value={ status } onSwitch={ onSwitch } />

    </View>
  );
};

export default NotificationSettingItem;
