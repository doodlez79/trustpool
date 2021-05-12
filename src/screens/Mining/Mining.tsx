import React, {
  FC, useCallback, useEffect, useState,
} from 'react';
import { StackScreenProps } from '@react-navigation/stack';
import { MainStackParamList } from 'navigation/Navigation.types';
import { Dimensions, View } from 'react-native';

import { perfectSize } from 'helpers/PerfectSize';
import { Typography } from 'components/Typography';
import { SelectorList } from 'components/SelectorList';
import { iconsByCoin } from 'constants/iconByCoin';
import { useTheme } from 'helpers/ThemeManage';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { Actions, Selectors } from 'ducks';
import { ModalComponent } from 'components/Modal';
import { COIN_TYPE } from 'entitiesState/currency';
import { Btn } from 'components/Btn';
import { Container } from 'components/Container';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { CoinModalSelected } from 'components/CoinModalSelected';
import { ChangeMinValuePaymentContent } from 'components/ChangeMinValuePaymentContent';
import { Preloader } from 'components/Preloader';
import { mainColors } from 'constants/colors';
import { TIME_CHART_TYPES } from 'entitiesState/general';
import { LinkingURLService } from 'services';

import NavigationBack from 'components/NavigationBack/NavigationBack';
import { WalletBalanceType } from 'entitiesState/settings';
import { findWalletInfoByCurrentCoin } from 'helpers/FindWalletInfoByCurentCoin';
import { styles } from './styles';

export interface MiningScreenProps extends StackScreenProps<MainStackParamList, 'MiningScreen'>{}

// eslint-disable-next-line max-len
const addressLink = (address: string, coin: string) => `https://explorer.viawallet.com/${coin.toLowerCase()}/address/${address}`;

const MiningScreen:FC<MiningScreenProps> = ({ navigation, route }) => {
  const { colors } = useTheme();
  const { t } = useTranslation();
  const coin = useSelector(Selectors.Currency.currentCoin);
  const coins = useSelector(Selectors.Currency.allCoins);
  const coinForMining = [ ...coins, COIN_TYPE.DOGE ];
  const [ coinModal, setCoinModal ] = useState(false);
  const [ paymentModal, setPaymentModal ] = useState(false);
  const [ walletInfo, setWaletInfo ] = useState({} as WalletBalanceType);
  const [ coinPoint, setCoinPoint ] = useState(coin);
  const dispatch = useDispatch();
  const getWalletInfo = useSelector(Selectors.Setting.getWalletInfo);
  const loading = useSelector(Selectors.Setting.isLoading);

  const updateData = useCallback((time?: TIME_CHART_TYPES, cb:() => void = () => {}) => {
    dispatch(Actions.Currency.getCurrencysInfo.request({}));
    dispatch(Actions.Currency.getCurrentValute.request({}));
    dispatch(Actions.Setting.getWalletBalance.request());
    dispatch(Actions.General.getFullInfo.request({ time: time || undefined }, { resolve: cb, reject: cb }));
    return () => { if (coin !== coinPoint) setCoinPoint(coin); };
  }, [ coin, coinPoint ]);

  const updateWalletInfo = useCallback(() => {
    dispatch(Actions.Setting.getWalletBalance.request());
  }, []);

  useEffect(() => {
    setCoinPoint(coin);
  }, [ coin ]);

  useEffect(() => {
    setWaletInfo(findWalletInfoByCurrentCoin(getWalletInfo, coinPoint));
  }, [ coinPoint, getWalletInfo ]);

  const { minimalPaymentChoices, minimalPayment, withdrawAddress } = walletInfo!;

  const { leftTitle } = route.params;

  useEffect(() => {
    if (leftTitle) {
      navigation.setOptions({
        headerLeft: ({ onPress }) => (
          <NavigationBack
            onClick={ onPress }
            text={ route.params && route.params.leftTitle
              ? t(`screens.Settings.tabName.${route.params.leftTitle}`) : '' }
          />
        ),
      });
    }
  }, [ leftTitle, coin, coinPoint ]);

  const openModalCoin = useCallback(() => {
    setCoinModal(true);
  }, []);
  const closeModalCoin = useCallback(() => {
    setCoinModal(false);
  }, []);
  const openModalPayment = useCallback(() => {
    setPaymentModal(true);
  }, []);
  const closeModalPayment = useCallback(() => {
    setPaymentModal(false);
  }, []);

  const getInfoByCurrentCoin = useSelector(Selectors.Currency.getInfoByCoin);

  const { coinPrice, pricingCurrency } = getInfoByCurrentCoin!;

  const selectCoin = (coin: COIN_TYPE) => {
    setCoinPoint(coin);
    updateData(undefined,
      () => closeModalCoin());
  };

  const insert = useSafeAreaInsets();

  const submitChangeValuePayment = (value: string) => {
    dispatch(Actions.Setting.changeMinPayment.request(
      { coin, id: value },
      {
        resolve: () => {
          closeModalPayment();
          updateWalletInfo();
        },
      },
    ));
  };

  return (
    <>
      <Container
        paddingSize={ 16 }
        style={{
          ...styles.container,
          marginBottom: insert.bottom + 20,
        }}
      >
        <View style={{
          marginBottom: perfectSize(20), alignItems: 'center', justifyContent: 'center',
        }}
        >
          <View style={{ marginBottom: perfectSize(5) }}>
            <Typography
              style={{ marginBottom: perfectSize(10) }}
              text={ t('screens.Home.balance') }
              fontSize={ 12.8 }
              color={ colors.secondaryText }
            />
            <SelectorList
              icon={ iconsByCoin[coinPoint] }
              onClick={ openModalCoin }
              active={ coinModal }
              coin={ coinPoint }
              amount={ walletInfo.accountBalance }
            />
          </View>
          <View style={ styles.item }>
            <Typography
              style={{ marginRight: 3 }}
              text={ coinPoint === COIN_TYPE.DOGE
                ? '' : (parseFloat(coinPrice as string) * parseFloat(walletInfo.accountBalance)).toFixed(2) }
              fontSize={ 12.8 }
              color={ colors.secondaryText }
            />
            <Typography
              bold
              text={ coinPoint === COIN_TYPE.DOGE ? '' : pricingCurrency.toUpperCase() }
              fontSize={ 12.8 }
              color={ colors.secondaryText }
            />
          </View>
          <View style={{
            width: Dimensions.get('window').width - 32,
          }}
          >
            <View style={{
              alignItems: 'flex-start',
              justifyContent: 'flex-start',

              marginBottom: perfectSize(20),
            }}
            >
              <Typography
                text={ t('screens.MiningScreen.paymentTime') }
                fontSize={ 12.8 }
                color={ colors.secondaryText }
              />
              <View style={{
                flexDirection: 'row',
              }}
              >
                <Typography text="05:00-13:00 " fontSize={ 14 } bold color={ colors.text } />
                <Typography text=" (UTC+3, MSK)" fontSize={ 14 } bold color={ colors.secondaryText } />
              </View>

            </View>
            {
              Boolean(withdrawAddress) && (
                <View style={{
                  alignItems: 'flex-start',
                  justifyContent: 'flex-start',
                  width: '100%',
                  marginBottom: perfectSize(20),
                }}
                >
                  <Typography
                    text={ t('screens.MiningScreen.address', { coinPoint }) }
                    fontSize={ 12.8 }
                    color={ colors.secondaryText }
                  />
                  <Typography
                    onPress={ () => LinkingURLService.openURL(addressLink(withdrawAddress,
                      String(coinPoint).toLowerCase())) }
                    text={ withdrawAddress }
                    fontSize={ 14 }
                    bold
                    color={ mainColors.blue }
                  />

                </View>
              )
              }

            <View style={{
              alignItems: 'flex-start',
              justifyContent: 'flex-start',
              width: '100%',
              marginBottom: perfectSize(20),
            }}
            >
              <Typography
                text={ t('screens.MiningScreen.currentPaymentStep') }
                fontSize={ 12.8 }
                color={ colors.secondaryText }
              />
              <Typography
                text={ minimalPayment }
                fontSize={ 14 }
                bold
                color={ colors.text }
              />

            </View>
            {
              loading && (
                <View style={{
                  width: '100%',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
                >
                  <Preloader heightContainer={ 48 } stickStyle={{ backgroundColor: mainColors.blue }} />
                </View>
              )
            }
          </View>
        </View>

        <View>
          <Btn
            onClick={ () => navigation.navigate('SetPaymentAdress', { coin: coinPoint }) }
            style={{ marginBottom: perfectSize(20) }}
            title={ t('screens.MiningScreen.btn', { coinPoint }) }
          />
          { Array.isArray(minimalPaymentChoices)
&& <Btn title={ t('screens.MiningScreen.btnPayment') } onClick={ openModalPayment } />}
        </View>

      </Container>
      <ModalComponent modalVisible={ coinModal } setModalVisible={ closeModalCoin }>
        <CoinModalSelected
          loading={ false }
          currentCoin={ coinPoint }
          onSelectCoin={ selectCoin }
          coins={ coinForMining }
        />
      </ModalComponent>

      <ModalComponent modalVisible={ paymentModal } setModalVisible={ closeModalPayment }>
        <ChangeMinValuePaymentContent
          loading={ loading }
          SelectedItem={ submitChangeValuePayment }
          currentItem={ minimalPayment }
          data={ minimalPaymentChoices! }
        />
      </ModalComponent>
    </>
  );
};

export default MiningScreen;
