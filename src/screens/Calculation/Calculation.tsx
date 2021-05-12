import React, {
  FC, useCallback, useEffect, useState,
} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { TouchableOpacity, View } from 'react-native';
import { useTranslation } from 'react-i18next';
import { StackHeaderLeftButtonProps, StackScreenProps } from '@react-navigation/stack';

import { MainStackParamList } from 'navigation/Navigation.types';
import { useTheme } from 'helpers/ThemeManage';
import { iconsByCoin } from 'constants/iconByCoin';
import { SelectorList } from 'components/SelectorList';
import { ModalComponent } from 'components/Modal';
import { Container } from 'components/Container';
import { Actions, Selectors } from 'ducks';
import { COIN_TYPE } from 'entitiesState/currency';
import { Typography } from 'components/Typography';
import { CalculationCard } from 'components/CalculationCard';
import { CoinModalSelected } from 'components/CoinModalSelected';

import NavigationBack from 'components/NavigationBack/NavigationBack';
import { HiddenKeyboardOutSideTab } from 'components/HiddenKeyboardOutSideTab';
import { styles } from './styles';

export interface CalculationScreensProps extends StackScreenProps<MainStackParamList, 'Calculation'>{}

const CalculationScreens:FC<CalculationScreensProps> = ({ navigation }) => {
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const { colors } = useTheme();
  const coin = useSelector(Selectors.Currency.currentCoin);
  const coins = useSelector(Selectors.Currency.allCoins);
  const coinsInformation = useSelector(Selectors.Currency.allValutsInfo);
  const [ coinModal, setCoinModal ] = useState(false);
  const [ currentCoinCalculation, setCurrentCoinCalculation ] = useState(coin);
  const [ calculateValue, setCalculateValue ] = useState('1');
  const [ currentPeriod, setCurrentPeriod ] = useState('day');

  const coinInfo = coinsInformation.find(el => el.coin === currentCoinCalculation);

  const hashUnit = useSelector(Selectors.General.getGeneralAccountInfo);

  useEffect(() => {
    navigation.setOptions({
      headerLeft: ({ onPress }: StackHeaderLeftButtonProps) => (
        <TouchableOpacity
          onPress={ onPress }
          style={{
            flex: 1, width: '100%', justifyContent: 'center',
          }}
        >
          <NavigationBack onClick={ onPress } text="" />
        </TouchableOpacity>
      ),
    });
    dispatch(Actions.General.getGeneralInfo.request(currentCoinCalculation));
  }, [ currentCoinCalculation ]);

  const result = () => {
    let result = parseFloat(coinInfo && coinInfo.unitOutput ? coinInfo.unitOutput : '0') * parseFloat(calculateValue);

    if (currentPeriod === 'week') {
      result *= 7;
    }
    if (currentPeriod === 'month') {
      result *= 30;
    }

    if (!calculateValue) {
      return {
        result: '0',
        money: '0.00',
      };
    }

    if (!calculateValue && parseInt(calculateValue, 10) === 0) {
      return {
        result: '0',
        money: '0.00',
      };
    }

    return {
      result: result.toFixed(8).replace(/[0]*$/g, '').replace(/[.]$/g, ''),
      money: Math.floor((result * parseFloat(coinInfo && coinInfo.coinPrice ? coinInfo.coinPrice : '0')) * 100) / 100,
    };
  };

  const resultCalculations = result();

  const openModalCoin = useCallback(() => {
    setCoinModal(true);
  }, []);
  const closeModalCoin = useCallback(() => {
    setCoinModal(false);
  }, []);

  const selectCoin = (coin: COIN_TYPE) => {
    setCurrentCoinCalculation(coin);
    closeModalCoin();
  };

  return (
    <>
      <View style={{
        flex: 1,
      }}
      >
        <HiddenKeyboardOutSideTab>
          <Container
            paddingSize={ 8 }
            style={ styles.container }
          >
            <View style={ styles.containerSelectedCoin }>
              <SelectorList
                icon={ iconsByCoin[currentCoinCalculation] }
                onClick={ openModalCoin }
                active={ coinModal }
                coin={ currentCoinCalculation }
              />
            </View>

            <CalculationCard
              currentCoinCalculation={ currentCoinCalculation }
              currentPeriod={ currentPeriod }
              pricingCurrency={ coinInfo && coinInfo.pricingCurrency ? coinInfo.pricingCurrency : '' }
              calculateValue={ calculateValue }
              setCalculateValue={ setCalculateValue }
              setCurrentPeriod={ setCurrentPeriod }
              resultCalculations={ resultCalculations }
              hashUnit={ hashUnit.hashUnit }
            />

            <Typography
              color={ colors.secondaryText }
              fontSize={ 12.8 }
              text={ t('screens.Calculation.helpDescription') }
            />

          </Container>
        </HiddenKeyboardOutSideTab>

      </View>
      <ModalComponent modalVisible={ coinModal } setModalVisible={ closeModalCoin }>
        <CoinModalSelected
          loading={ false }
          currentCoin={ currentCoinCalculation }
          onSelectCoin={ selectCoin }
          coins={ coins }
        />
      </ModalComponent>
    </>
  );
};

export default CalculationScreens;
