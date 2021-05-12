import React, {
  FC,
} from 'react';
import { TabBar } from 'react-native-tab-view';
import { View, Dimensions } from 'react-native';
import { useTranslation } from 'react-i18next';
import { NavigationState, SceneRendererProps } from 'react-native-tab-view/lib/typescript/src/types';

import { Typography } from 'components/Typography';
import { mainColors } from 'constants/colors';
import { useTheme } from 'helpers/ThemeManage';
import { perfectSize } from 'helpers/PerfectSize';
import { LANG_TYPE } from 'entitiesState/settings';

import { styles } from './styles';

interface CustomTabsWorkersProps extends SceneRendererProps{
  navigationState: NavigationState<{ count: number, title: string, key: string}>
}

export const CustomTabsWorkers:FC<CustomTabsWorkersProps> = ({ navigationState, ...props }) => {
  const { t, i18n } = useTranslation();
  const { colors } = useTheme();

  const checkColorForCount = text => {
    if (text.route.key === 'active') {
      return mainColors.green;
    }
    return mainColors.red;
  };

  return (
    <>
      <View style={{ position: 'relative' }}>
        <TabBar
          { ...props }
          navigationState={{ ...navigationState }}
          contentContainerStyle={ styles.contentContainerStyle }
          renderLabel={ text => (
            <View style={{
              flexDirection: 'row',
              alignItems: 'center',
              position: 'relative',
            }}
            >
              <Typography
                fontSize={ 14 }
                bold
                style={{
                  marginRight: 3,
                }}
                color={ text.focused ? mainColors.blue : colors.secondaryText }
                text={ t(`screens.Workers.tabsName.${text.route.key}`) }
              />
              <Typography
                fontSize={ 14 }
                color={ text.route.key === 'all'
                  ? colors.secondaryText
                  : (checkColorForCount(text)) }
                text={ `(${text.route.count})` }
              />
            </View>
          ) }
          indicatorStyle={{
            ...styles.indicatorStyle,
            width: i18n.language === LANG_TYPE.RU ? perfectSize(110) : perfectSize(93),
            left: (Dimensions.get('window').width / 3 - (i18n.language === LANG_TYPE.RU
              ? perfectSize(110) : perfectSize(93))) / 2,
          }}
          style={{
            backgroundColor: 'transparent',
          }}
        />
        <View style={ [ styles.shadowLine, { backgroundColor: colors.shadowLineForTabs }] } />

      </View>

    </>

  );
};
