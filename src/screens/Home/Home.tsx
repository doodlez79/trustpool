import React, {
  FC, useCallback, useState,
} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  RefreshControl, ScrollView, TouchableOpacity, View,
} from 'react-native';
import { MainStackParamList } from 'navigation/Navigation.types';
import { useTranslation } from 'react-i18next';

import { useFocusEffect } from '@react-navigation/native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Actions, Selectors } from 'ducks';
import { useTheme } from 'helpers/ThemeManage';
import { perfectSize } from 'helpers/PerfectSize';
import { HeaderHome } from 'components/HeaderHome';
import { ModalComponent } from 'components/Modal';
import { SubAccountsModalContent } from 'components/SubAccountsModalContent';
import { Typography } from 'components/Typography';
import { SelectorList } from 'components/SelectorList';
import { WidgetHashrateChart } from 'components/WidgetHashrateChart';
import { WidgetWorkers } from 'components/WidgetWorkers';
import { WidgetCalculator } from 'components/WidgetCalculator';
import { Container } from 'components/Container';
import { HomeEarningDescription } from 'components/HomeEarningDescription';
import { iconsByCoin } from 'constants/iconByCoin';
import CoinModalSelected from 'components/CoinModalSelected/CoinModalSelected';
import { TIME_CHART_TYPES } from 'entitiesState/general';
import { COIN_TYPE, CURRENCY_TYPE } from 'entitiesState/currency';
import { NumberToSystemMeasuring } from 'helpers/NumberToSystemMeasuring';
import { TimeTranslate } from 'constants/translateTimes';
import { currencyList } from 'constants/currencyList';
import { DrawerScreenProps } from '@react-navigation/drawer';
import { mainColors } from 'constants/colors';
import { CurrencyModalContent } from 'components/CurrencyModal';
import Chevron from 'Icons/Chevron.svg';

import { styles } from './styles';

export interface HomeProps extends DrawerScreenProps<MainStackParamList, 'Home'>{}

const HomeScreen:FC<HomeProps> = ({ navigation }) => {
  const { t } = useTranslation();
  const { colors } = useTheme();
  const dispatch = useDispatch();

  const fiatCurrency = useSelector(Selectors.Currency.currentFiatCurrency);

  const [ userModal, setUserModal ] = useState(false);
  const [ coinModal, setCoinModal ] = useState(false);
  const [ currencyModal, setCurrencyModal ] = useState(false);
  const [ refreshPageLoading, setRefreshPageLoading ] = useState(false);
  const [ errorSubAccountForm, setErrorSubAccountForm ] = useState(0);

  const accountsVisibleList = useSelector(Selectors.Account.getVisibleAccounts);
  const chartTime = useSelector(Selectors.General.getCurrentChartTime);
  const coin = useSelector(Selectors.Currency.currentCoin);
  const coins = useSelector(Selectors.Currency.allCoins);
  const getInfoByCurrentCoin = useSelector(Selectors.Currency.getInfoByCoin);
  const userInfo = useSelector(Selectors.Account.getUserInfo);
  const balanceInfo = useSelector(Selectors.General.getGeneralAccountInfo);
  const workersInfo = useSelector(Selectors.General.getGeneralWorkersInfo);
  const chartData = useSelector(Selectors.General.getGeneralChartInfo);
  const loadingGeneral = useSelector(Selectors.General.isLoading);
  const loadingChangeSubAccount = useSelector(Selectors.Account.isLoading);
  const loadingChangeCoin = useSelector(Selectors.Currency.isLoading);
  const currentCourse = useSelector(Selectors.Currency.currentCourse);

  const updateData = useCallback((cb:() => void = () => {}) => {
    dispatch(Actions.Currency.getCurrencysInfo.request({}));
    dispatch(Actions.Currency.getCurrentValute.request({}));

    dispatch(Actions.Setting.getWalletBalance.request());
    dispatch(Actions.Setting.getTrottlingData.request());
    dispatch(Actions.General.getFullInfo.request({ resolve: cb, reject: cb }));
  }, [ coin, userInfo.id ]);

  useFocusEffect(updateData);

  const {
    nextPeriodDiff, currDiff, coinPrice, pricingCurrency,
  } = getInfoByCurrentCoin!;

  let course = parseFloat(balanceInfo?.accountBalance) * parseFloat(coinPrice) * currentCourse;

  const refreshPage = () => {
    setRefreshPageLoading(true);
    updateData(() => setRefreshPageLoading(false));
  };

  const onSelectSubAccounts = (id: number) => {
    dispatch(Actions.Account.putChangeSubAccount.request(id, { resolve: () => {} }));
  };

  const selectCoin = (coin: COIN_TYPE) => {
    dispatch(Actions.Currency.postChangeCoin.request(coin, { resolve: () => {} }));
  };

  const addSubAccounts = (name: string, cb: () => void) => {
    dispatch(Actions.Account.postSubAccount.request({ account: name },
      { resolve: () => cb(), reject: (code: number) => setErrorSubAccountForm(code) }));
  };

  const changeChartInfo = (type: TIME_CHART_TYPES) => {
    dispatch(Actions.General.setCurrentTimeForMainChart(type));
  };

  const openModal = useCallback(() => {
    setUserModal(true);
  }, []);
  const closeModal = useCallback(() => {
    setUserModal(false);
  }, []);
  const openModalCoin = useCallback(() => {
    setCoinModal(true);
  }, []);
  const closeModalCoin = useCallback(() => {
    setCoinModal(false);
  }, []);
  const openCurrencyModal = useCallback(() => {
    setCurrencyModal(true);
  }, []);
  const closeCurrencyModal = useCallback(() => {
    setCurrencyModal(false);
  }, []);

  const selectCurrency = (currency: CURRENCY_TYPE) => {
    if (currency !== 'USD') {
      dispatch(Actions.Currency.getCurrencysCourse.request(currency, {
        resolve: () => {
          setCurrencyModal(false);
        },
      }));
    } else {
      course = parseFloat(balanceInfo?.accountBalance) * parseFloat(coinPrice) * 1;
      setCurrencyModal(false);
    }
    dispatch(Actions.Currency.saveFiatCurrency(currency));
  };

  const insert = useSafeAreaInsets();

  const coinValue = (parseFloat(coinPrice as string) * parseFloat(balanceInfo?.accountBalance)).toFixed(2);
  return (
    <>
      <View
        style={{
          flex: 1,
          marginTop: insert.top,
        }}
      >

        <HeaderHome
          currentUserName={ userInfo.account }
          onLeftIconClick={ () => navigation.toggleDrawer() }
          onRightIconClick={ openModal }
          modalOpen={ userModal }
        />
        <ScrollView
          style={{

          }}
          contentContainerStyle={{
            flexGrow: 2, flexShrink: 0,
          }}
          showsVerticalScrollIndicator={ false }
          refreshControl={ (
            <RefreshControl
              refreshing={ loadingChangeSubAccount && refreshPageLoading }
              onRefresh={ refreshPage }
              tintColor={ mainColors.blue }
            />
                ) }
        >
          <View style={{
            flexGrow: 2,
            flexShrink: 0,

            justifyContent: 'center',
          }}
          >

            <Container
              paddingSize={ 8 }
              style={{
                alignItems: 'center',
                flexGrow: 1,
                flexShrink: 0,

                justifyContent: 'center',
              }}
            >
              <View style={{ }}>
                <View style={{ marginBottom: perfectSize(5) }}>
                  <Typography
                    style={{ marginBottom: perfectSize(10) }}
                    text={ t('screens.Home.balance') }
                    fontSize={ 12.8 }
                    color={ colors.secondaryText }
                  />
                  <SelectorList
                    icon={ iconsByCoin[coin] }
                    onClick={ openModalCoin }
                    active={ coinModal }
                    coin={ coin }
                    amount={ balanceInfo.accountBalance }
                  />
                </View>
                <TouchableOpacity onPress={ () => openCurrencyModal() }>
                  <View style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                  >
                    <Typography
                      style={{ marginRight: 3 }}
                      text={ fiatCurrency === 'USD'
                        ? `≈ ${!Number.isNaN(coinValue) ? coinValue : '0'}`
                        : `≈ ${course?.toFixed(2)}` }
                      fontSize={ 12.8 }
                      color={ colors.secondaryText }
                    />
                    <Typography
                      bold
                      text={ fiatCurrency || 'USD' }
                      fontSize={ 12.8 }
                      color={ colors.secondaryText }
                    />
                    <View style={ styles.icon }>
                      <Chevron fill={ colors.secondaryText } />
                    </View>
                  </View>
                </TouchableOpacity>
              </View>
            </Container>

            <View style={ styles.earningContainer }>
              <HomeEarningDescription
                coin={ coin }
                value={ balanceInfo.paymentTotal }
                title={ t('screens.Home.paymentTotal') }
              />
              <HomeEarningDescription
                coin={ coin }
                value={ balanceInfo.profit.total }
                title={ t('screens.Home.earningTotal') }
              />

            </View>

            <Container
              paddingSize={ 8 }
              style={{
                flex: 1,
                justifyContent: 'center',
              }}
            >

              <WidgetHashrateChart
                loading={ loadingGeneral }
                changeChartInfo={ changeChartInfo }
                currentTime={ chartTime }
                data={ chartData }
                hashAvg={ NumberToSystemMeasuring(balanceInfo.hashrate[TimeTranslate[chartTime] as TIME_CHART_TYPES],
                  3).newValue }
                  // eslint-disable-next-line max-len
                hashPrefix={ NumberToSystemMeasuring(balanceInfo.hashrate[TimeTranslate[chartTime] as TIME_CHART_TYPES],
                  3).prefix }
                setTimeChartRequest={ changeChartInfo }
              />

            </Container>
            <Container
              paddingSize={ 8 }
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between',
                flexGrow: 2,
                flexShrink: 0,
                paddingVertical: 10,
              }}
            >
              <WidgetWorkers
                onClick={ () => navigation.navigate('Workers') }
                activeWork={ workersInfo.totalActive }
                inactiveWork={ workersInfo.totalUnactive }
              />
              <WidgetCalculator
                coinPriceType={ `${coin}/${pricingCurrency}` }
                nextDiff={ nextPeriodDiff }
                coinPrice={ parseInt(coinPrice as string, 10) }
                coinPriceCurrency={ pricingCurrency }
                diffAmount={ String(NumberToSystemMeasuring(currDiff, 3).newValue) }
                icon={ iconsByCoin[coin] }
                diffType={ String(NumberToSystemMeasuring(currDiff, 3).prefix) }
                onClick={ () => navigation.navigate('Calculation') }
              />
            </Container>
          </View>

        </ScrollView>
      </View>

      <ModalComponent modalVisible={ coinModal } setModalVisible={ closeModalCoin }>
        <CoinModalSelected
          loading={ loadingChangeCoin }
          currentCoin={ coin }
          onSelectCoin={ selectCoin }
          coins={ coins }
        />
      </ModalComponent>

      <ModalComponent KeyboardAvoidingViewParam modalVisible={ userModal } setModalVisible={ closeModal }>

        <SubAccountsModalContent
          setErrorSubAccount={ setErrorSubAccountForm }
          errorSubAccountForm={ errorSubAccountForm }
          loading={ loadingChangeSubAccount }
          onSelectSubAccounts={ onSelectSubAccounts }
          accounts={ accountsVisibleList }
          currentNameId={ userInfo.id }
          addSubAccounts={ addSubAccounts }
        />

      </ModalComponent>
      <ModalComponent modalVisible={ currencyModal } setModalVisible={ closeCurrencyModal }>
        <CurrencyModalContent
          loading={ loadingChangeCoin }
          currencyList={ currencyList }
          onSelectCurrency={ selectCurrency }
          currentCurrency={ fiatCurrency }
        />
      </ModalComponent>

    </>
  );
};

export default HomeScreen;
