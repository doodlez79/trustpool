import React, { FC, useState } from 'react';

import {
  FlatList, Platform, RefreshControl, View,
} from 'react-native';

import { EarningsSummaryDataItemType, PaymentDataItemType } from 'entitiesState/payment';
import { COIN_TYPE } from 'entitiesState/currency';
import { PageInfo } from 'types/pageInfo';
import { Preloader } from 'components/Preloader';
import { mainColors } from 'constants/colors';
import { TYPE_PAYMENT_CONTENT } from 'screens/Payment/types';
import { perfectSize } from 'helpers/PerfectSize';
import { useTheme } from 'helpers/ThemeManage';
import { SelectorListProps } from '../SelectorList/SelectorList.types';
import { PaymentAnotherInfo } from '../PaymentAnotherInfo';
import { PaymentContentItem } from '../PaymentContentItem';
import { EarningContentItem } from '../EarningContentItem';

interface PaymentContentNewProps extends SelectorListProps{
  data: EarningsSummaryDataItemType[] | PaymentDataItemType[],
  type: TYPE_PAYMENT_CONTENT
  coin: COIN_TYPE
  onPress: (type: TYPE_PAYMENT_CONTENT, item: EarningsSummaryDataItemType | PaymentDataItemType) => void
  updateData: (type: TYPE_PAYMENT_CONTENT, countPage: number, replace: boolean,
    cb?:{start: ()=>void, finish: ()=>void}) => void
  meta: PageInfo
  loading: boolean
  walletAddress: boolean
  goToChangePage?: ()=>void
  isDoge? :boolean
  firstVisit :boolean

}

// eslint-disable-next-line max-len
const isPayment = (type: TYPE_PAYMENT_CONTENT, data: EarningsSummaryDataItemType[] | PaymentDataItemType[]): data is PaymentDataItemType[] => type === TYPE_PAYMENT_CONTENT.PAYMENT;

const PaymentContent:FC<PaymentContentNewProps> = ({
  meta,
  coin, loading,
  data,
  onPress, updateData, type,
  active: stateCoinModal,
  onClick: onPressCoinTab,
  walletAddress,
  goToChangePage,
  isDoge,
  firstVisit,
}) => {
  const [ refreshingStatus, setRefreshingStatus ] = useState(false);
  const { colors } = useTheme();

  if (loading || !firstVisit) {
    return (
      <View style={{
        position: 'absolute',
        backgroundColor: colors.backgroundColor,
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100%',
      }}
      >
        <Preloader heightContainer={ 48 } stickStyle={{ backgroundColor: mainColors.blue }} />
      </View>
    );
  }

  if (isPayment(type, data)) {
    return (
      <FlatList<PaymentDataItemType>
        data={ data }
        style={{ paddingHorizontal: perfectSize(16) }}
        ListFooterComponent={ (
          <View style={{ alignItems: 'center' }}>
            {meta.hasNext && (
            <View style={{ marginBottom: 20 }}>
              <Preloader heightContainer={ 24 } stickStyle={{ backgroundColor: mainColors.blue }} />
            </View>
            ) }
          </View>
        ) }
        contentContainerStyle={{ flex: data.length > 0 ? 0 : 1 }}
        refreshControl={ (
          <RefreshControl
            onRefresh={ () => updateData(TYPE_PAYMENT_CONTENT.PAYMENT, 1, true,
              { start: () => setRefreshingStatus(true), finish: () => setRefreshingStatus(false) }) }
            refreshing={ loading && refreshingStatus }
            tintColor={ mainColors.blue }
          />
      ) }
        ListEmptyComponent={ () => (
          <PaymentAnotherInfo
            wallet={ !walletAddress }
            coin={ coin }
            onClick={ onPressCoinTab }
            active={ stateCoinModal }
            goTo={ goToChangePage }
          />
        ) }
        onEndReached={ () => {
          if (meta.hasNext) {
            updateData(TYPE_PAYMENT_CONTENT.PAYMENT, meta.currPage + 1, false);
          }
        } }
        refreshing={ loading }
        showsVerticalScrollIndicator={ false }
        onEndReachedThreshold={ Platform.OS === 'ios' ? 0 : 0.5 }
        keyExtractor={ (item, index) => String(index) }
        renderItem={ ({ item }) => (
          <PaymentContentItem
            coin={ coin }
            item={ item }
            isDoge={ isDoge }
            onPress={ () => onPress(type, item) }
          />
        ) }
      />
    );
  }
  return (

    <FlatList<EarningsSummaryDataItemType>
      data={ data }
      style={{ paddingHorizontal: perfectSize(16) }}
      ListFooterComponent={ (
        <View style={{ alignItems: 'center' }}>
          {meta.hasNext
          && (
          <View style={{ marginBottom: 20 }}>
            <Preloader heightContainer={ 24 } stickStyle={{ backgroundColor: mainColors.blue }} />
          </View>
          )}
        </View>
      ) }
      contentContainerStyle={{ flex: data.length > 0 ? 0 : 1 }}
      showsVerticalScrollIndicator={ false }
      refreshControl={ (
        <RefreshControl
          onRefresh={ () => updateData(TYPE_PAYMENT_CONTENT.PAYMENT, 1, true,
            { start: () => setRefreshingStatus(true), finish: () => setRefreshingStatus(false) }) }
          refreshing={ loading && refreshingStatus }
          tintColor={ mainColors.blue }
        />
    ) }
      ListEmptyComponent={ () => (
        <PaymentAnotherInfo
          coin={ coin }
          onClick={ onPressCoinTab }
          active={ stateCoinModal }
        />
      ) }
      onEndReached={ () => {
        if (meta.hasNext) {
          updateData(TYPE_PAYMENT_CONTENT.EARNING, meta.currPage + 1, false);
        }
      } }
      refreshing={ loading }
      onEndReachedThreshold={ Platform.OS === 'ios' ? 0 : 0.5 }
      keyExtractor={ (item, index) => String(index) }
      renderItem={ ({ item }) => (
        <EarningContentItem
          coin={ coin }
          item={ item }
          isDoge={ isDoge }
        />
      ) }
    />
  );
};

export default PaymentContent;
