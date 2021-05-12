import React, { FC } from 'react';
import { TabBar } from 'react-native-tab-view';
import { View } from 'react-native';
import { useTranslation } from 'react-i18next';
import { NavigationState, SceneRendererProps } from 'react-native-tab-view/lib/typescript/src/types';

import { Typography } from 'components/Typography';
import { mainColors } from 'constants/colors';
import { useTheme } from 'helpers/ThemeManage';

import { perfectSize } from 'helpers/PerfectSize';
import { SelectorList } from 'components/SelectorList';
import { iconsByCoin } from 'constants/iconByCoin';
import { COIN_TYPE } from 'entitiesState/currency';
import { Route } from 'react-native-tab-view/src/types';
import { styles } from './styles';

interface CustomTabsPaymentProps extends SceneRendererProps {
  coin: COIN_TYPE
  openModalCoin: () => void
  coinModal: boolean
  showCoin: boolean
  navigationState: NavigationState<Route>
  isDoge?: boolean
}
export const CustomTabsPayment:FC<CustomTabsPaymentProps> = ({
  coin, openModalCoin, isDoge, coinModal, showCoin, navigationState, ...props
}) => {
  const { t } = useTranslation();
  const { colors } = useTheme();

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
                text={ t(`screens.Payment.tabName.${text.route.key}`) }
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
      {
        showCoin && (
          <View style={{
            alignItems: 'center',
            position: 'relative',
            // left: 0,
            // right: 0,
            // zIndex: 1000,
            // top: 45,
            marginVertical: perfectSize(20),
          }}
          >
            <SelectorList
              styleContainer={{ borderWidth: 2, borderColor: colors.backgroundColor }}
              icon={ iconsByCoin[coin] }
              onClick={ openModalCoin }
              active={ coinModal }
              coin={ coin }
            />

          </View>
        )
      }

    </>

  );
};
