import React, { FC } from 'react';
import { TabBar } from 'react-native-tab-view';
import { View } from 'react-native';
import { useTranslation } from 'react-i18next';
import { SceneRendererProps } from 'react-native-tab-view/lib/typescript/src/types';

import { Typography } from 'components/Typography';
import { mainColors } from 'constants/colors';
import { useTheme } from 'helpers/ThemeManage';
import { iconsByCoin } from 'constants/iconByCoin';

import { perfectSize } from 'helpers/PerfectSize';
import { COIN_TYPE } from 'entitiesState/currency';
import { styles } from './styles';
import { SelectorList } from '../SelectorList';

interface CustomTabsReferalsProps extends SceneRendererProps {
  openReferalModal: () => void
  referalModal: boolean
  coin: COIN_TYPE
  openModalCoin: () => void
  coinModal: boolean
  // route?: any
  dontShowCoin: boolean
}

export const CustomTabsReferals:FC<CustomTabsReferalsProps> = ({
  openReferalModal, referalModal, openModalCoin,
  coin, coinModal, dontShowCoin, ...props
}) => {
  const { t } = useTranslation();
  const { colors } = useTheme();
  return (
    <>
      <View style={{ position: 'relative' }}>
        <TabBar
          { ...props }
          contentContainerStyle={ styles.contentContainerStyle }
          renderLabel={ text => (
            <View style={ styles.tabBarElem }>
              <Typography
                fontSize={ 14 }
                bold
                style={{
                  marginRight: 3,
                }}
                color={ text.focused ? mainColors.blue : colors.secondaryText }
                text={ t(`screens.Referals.tabName.${text.route.key}`) }
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
      {!dontShowCoin && (
      <View style={{
        alignItems: 'center',
        marginVertical: perfectSize(20),
      }}
      >
        <SelectorList
          icon={ iconsByCoin[coin] }
          onClick={ openModalCoin }
          active={ coinModal }
          coin={ coin }
        />
      </View>
      )}
    </>
  );
};
