import React, { FC } from 'react';

import { View } from 'react-native';

import { Typography } from 'components/Typography';
import { mainColors } from 'constants/colors';
import { TabBar } from 'react-native-tab-view';

import { useTheme } from 'helpers/ThemeManage';
import { NavigationState, SceneRendererProps } from 'react-native-tab-view/lib/typescript/src/types';
import { useTranslation } from 'react-i18next';
import { styles } from './styles';

const SettingCustomTabBar:FC< SceneRendererProps & {
  navigationState: NavigationState<any>;
}> = ({ ...props }) => {
  const { colors } = useTheme();
  const { t } = useTranslation();
  return (
    <View style={{ position: 'relative' }}>
      <TabBar
        { ...props }
        contentContainerStyle={ styles.contentContainerStyle }
        renderLabel={ text => (
          <View style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center',
          }}
          >
            <Typography
              fontSize={ 14 }
              bold
              style={{
                marginRight: 3,
              }}
              color={ text.focused ? mainColors.blue : colors.secondaryText }
              text={ t(`screens.Settings.tabName.${text.route.title}`) }
            />
          </View>

        ) }
        indicatorStyle={ styles.indicatorStyle }
        style={{
          backgroundColor: 'transparent',
        }}
      />
      <View style={ [ styles.shadowLine, { backgroundColor: colors.shadowLineForTabs }] } />
    </View>
  );
};

export default SettingCustomTabBar;
