import React, {
  useCallback, useEffect, useState,
} from 'react';
import { Dimensions } from 'react-native';

import { useDispatch, useSelector } from 'react-redux';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';
import { useFocusEffect } from '@react-navigation/native';
import { Route, TabView } from 'react-native-tab-view';
import { useTranslation } from 'react-i18next';

import { format, isValid } from 'date-fns';

import { Actions, Selectors } from 'ducks';
import { CustomHeaderTabNavigator } from 'components/CustomHeaderTabNavigator';
import { CustomTabsPayment } from 'components/CustomTabsPayment/CustomTabsPayment';
import { COIN_TYPE } from 'entitiesState/currency';
import { CoinModalSelected } from 'components/CoinModalSelected';
import { ModalComponent } from 'components/Modal';
import { PaymentContent } from 'components/PaymentContent';
import { EarningsSummaryDataItemType, PaymentDataItemType } from 'entitiesState/payment';

import { Scene } from 'react-native-tab-view/lib/typescript/src/types';
import { WalletBalanceType } from 'entitiesState/settings';
import { findWalletInfoByCurrentCoin } from 'helpers/FindWalletInfoByCurentCoin';
import { PaymentProps, TYPE_PAYMENT_CONTENT } from './types';

const { width } = Dimensions.get('window');

const Payment:React.FC<PaymentProps> = ({ navigation }) => {
  const dispatch = useDispatch();

  const { t } = useTranslation();

  const coin = useSelector(Selectors.Currency.currentCoin);

  const [ coinPoint, setCoinPoint ] = useState(coin);
  const userInfo = useSelector(Selectors.Account.getUserInfo);
  const loading = useSelector(Selectors.Payment.isLoading);
  const allCoins = useSelector(Selectors.Currency.allCoins);
  const getWalletInfo = useSelector(Selectors.Setting.getWalletInfo);
  const allCoinsForPayments = [ ...allCoins, COIN_TYPE.DOGE ];
  const [ coinModal, setCoinModal ] = useState(false);
  const [ isDoge, setIsDoge ] = useState(false);
  const [ walletInfo, setWaletInfo ] = useState({} as WalletBalanceType);

  useEffect(() => {
    setCoinPoint(coin);
  }, [ coin ]);

  useEffect(() => {
    setWaletInfo(findWalletInfoByCurrentCoin(getWalletInfo, coinPoint));
  }, [ coinPoint ]);

  const [ firstVisitScreen, setFirstVisitScreen ] = useState(false);

  // const {withdrawAddress}= waletInfo

  const PaymentData = useSelector(Selectors.Payment.getPaymentData);
  const EarningSummary = useSelector(Selectors.Payment.getEarningSummaryInfo);
  // eslint-disable-next-line max-len
  const metaEarning = useSelector(Selectors.Payment.getEarningSummaryMeta);
  const metaPayment = useSelector(Selectors.Payment.getPaymentMeta);

  const [ routes ] = useState([
    { key: 'payment', title: t('screens.Payment.tabsName.payment') },
    { key: 'earning', title: t('screens.Payment.tabsName.earning') },
  ]);

  const [ index, setIndex ] = React.useState(0);

  const openModalCoin = useCallback(() => {
    setCoinModal(true);
  }, []);
  const closeModalCoin = useCallback(() => {
    setCoinModal(false);
  }, []);

  const selectCoin = (coin: COIN_TYPE) => {
    setCoinPoint(coin);
    if (coinPoint !== COIN_TYPE.DOGE) {
      setIsDoge(false);
    } else {
      setIsDoge(true);
    }
    closeModalCoin();
  };

  const goDetailPage = (type: TYPE_PAYMENT_CONTENT, item: EarningsSummaryDataItemType | PaymentDataItemType) => {
    const page = 'PaymentDetails';
    let mapItem = item;

    if (type === TYPE_PAYMENT_CONTENT.PAYMENT) {
      if ('time' in mapItem) {
        mapItem = {
          ...mapItem,
          time: isValid(mapItem.time) ? format(mapItem.time as Date, 'dd-MM-yyyy HH:mm') : '',
        };
      }
    }

    navigation.navigate(page, { item: mapItem });
  };

  const updateData = (type: TYPE_PAYMENT_CONTENT, countPage: number,
    replace = false, cb:{start: ()=>void, finish: ()=>void} = { start: () => {}, finish: () => {} }) => {
    if (cb.start) {
      cb.start();
    }

    if (type === TYPE_PAYMENT_CONTENT.PAYMENT) {
      dispatch(Actions.Payment.getPaymentInfo.request({ coin: coinPoint, countPage, replace },
        {
          resolve: () => {
            cb.finish();
          },
          reject: () => {},
        }));
    } else {
      dispatch(Actions.Payment.getEarningSummaryInfo.request(
        { coin: coinPoint, countPage, replace },
        {
          resolve: () => {
            if (cb.finish) {
              cb.finish();
            }
          },
          reject: () => {},
        },
      ));
    }
  };

  const updateAllPaymentInfoDetails = useCallback(() => {
    dispatch(Actions.Payment.getEarningSummaryInfo.request(
      { coin: coinPoint, countPage: 1, replace: true },
      {
        reject: () => { },
        resolve: () => { if (!firstVisitScreen) { setFirstVisitScreen(true); } },
      },
    ));
    dispatch(Actions.Payment.getPaymentInfo.request({
      coin: coinPoint,
      countPage: 1,
      replace: true,
    },
    {
      resolve: () => { if (!firstVisitScreen) { setFirstVisitScreen(true); } },
      reject: () => {},
    }));
    dispatch(Actions.Setting.getWalletBalance.request());
    return () => {
      if (coin !== coinPoint) setCoinPoint(coin);
    };
  }, [ dispatch, coinPoint, coin, userInfo.id ]);

  useFocusEffect(updateAllPaymentInfoDetails);

  const insets = useSafeAreaInsets();

  const goToSetAdress = () => {
    navigation.navigate('SetPaymentAdress', { coin: coinPoint });
  };

  const loadingStatus = loading && PaymentData.length === 0 && EarningSummary.length === 0 && !firstVisitScreen;

  const renderScene = ({ route }: Scene<Route>) => {
    switch (route.key) {
      case 'payment':
        return (
          <PaymentContent
            firstVisit={ firstVisitScreen }
            walletAddress={ !!walletInfo!.withdrawAddress }
            active={ coinModal }
            onClick={ openModalCoin }
            loading={ loadingStatus }
            updateData={ updateData }
            meta={ metaPayment }
            coin={ coinPoint }
            onPress={ goDetailPage }
            type={ TYPE_PAYMENT_CONTENT.PAYMENT }
            data={ PaymentData }
            goToChangePage={ goToSetAdress }
            isDoge={ isDoge }
          />
        );
      case 'earning':
        return (
          <PaymentContent
            firstVisit={ firstVisitScreen }
            walletAddress={ !!walletInfo!.withdrawAddress }
            active={ coinModal }
            onClick={ openModalCoin }
            loading={ loadingStatus }
            updateData={ updateData }
            meta={ metaEarning }
            coin={ coinPoint }
            onPress={ goDetailPage }
            type={ TYPE_PAYMENT_CONTENT.EARNING }
            data={ EarningSummary }
            isDoge={ isDoge }
          />
        );
      default:
        return null;
    }
  };

  return (
    <>
      <SafeAreaView
        style={{
          flex: 1,
          paddingBottom: -insets.bottom,
          justifyContent: 'center',
        }}
      >

        <CustomHeaderTabNavigator
          onPressLeft={ () => {} }
          title={ t('screens.Payment.nameScreen') }
        />

        <TabView
          renderTabBar={ props => (
            <CustomTabsPayment
              coin={ coinPoint }
              showCoin={ Boolean(PaymentData.length && EarningSummary.length) }
              coinModal={ coinModal }
              openModalCoin={ openModalCoin }
              isDoge={ isDoge }
              { ...props }
            />
          ) }
          navigationState={{ index, routes }}
          renderScene={ renderScene }
          onIndexChange={ setIndex }
          initialLayout={{ width }}
          renderLazyPlaceholder={ () => <></> }
          tabBarPosition="top"
          lazy
          lazyPreloadDistance={ 1 }
        />

      </SafeAreaView>

      <ModalComponent modalVisible={ coinModal } setModalVisible={ closeModalCoin }>
        <CoinModalSelected
          loading={ loading }
          currentCoin={ coinPoint }
          onSelectCoin={ selectCoin }
          coins={ allCoinsForPayments }
        />
      </ModalComponent>
    </>
  );
};

export default Payment;
