import React, { FC, useCallback, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { View, TouchableOpacity } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';

import { perfectSize } from 'helpers/PerfectSize';
import { Typography } from 'components/Typography';
import { InputField } from 'components/InputField';
import ClearInput from 'Icons/ClearInput.svg';
import { mainColors } from 'constants/colors';
import { useTheme } from 'helpers/ThemeManage';
import Chevron from 'Icons/Chevron.svg';
import { Actions, Selectors } from 'ducks';
import { CURRENCY_TYPE } from 'entitiesState/currency';
import { currencyList } from 'constants/currencyList';
import { CalculationCardProps } from './types';
import { ModalComponent } from '../Modal';
import { CurrencyModalContent } from '../CurrencyModal';

import { styles } from './styles';

const timeDataCalculation = [
  'day', 'week', 'month',
];

const CalculationCard:FC<CalculationCardProps> = ({
  calculateValue,
  resultCalculations,
  currentPeriod, currentCoinCalculation, setCalculateValue, setCurrentPeriod,
  hashUnit,
}) => {
  const { t } = useTranslation();
  const { colors } = useTheme();

  const dispatch = useDispatch();

  const [ currencyModal, setCurrencyModal ] = useState(false);

  const loadingChangeCoin = useSelector(Selectors.Currency.isLoading);
  const currentCourse = useSelector(Selectors.Currency.currentCourse);
  const fiatCurrency = useSelector(Selectors.Currency.currentFiatCurrency);

  let course = resultCalculations?.money * currentCourse;

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
      course = resultCalculations?.money * 1;
      setCurrencyModal(false);
    }
    dispatch(Actions.Currency.saveFiatCurrency(currency));
  };

  return (
    <>
      <View style={{
        ...styles.container,
        backgroundColor: colors.backgroundSelectedItem,

      }}
      >
        <Typography
          style={{
            marginBottom: perfectSize(5),
          }}
          color={ colors.text }
          text={ t('screens.Calculation.title') }
        />
        <InputField
          postFix={ <Typography color={ colors.text } bold text={ hashUnit } /> }
          Icon={ () => (
            <View style={{
              width: perfectSize(24),
              height: perfectSize(24),
              padding: 3,
            }}
            >
              <ClearInput />
            </View>
          ) }
          inputStyle={ styles.input }
          value={ calculateValue }
          onChange={ value => {
            if (!value) {
              setCalculateValue('');
              return;
            }
            const regValue = /^[1-9]\d{0,13}$|^[1-9]\d{0,13}\.\d{0,3}$|^[0][.]\d{0,3}$|^[0]$/;

            const newValue = value.replace(/,/, '.');

            if (regValue.test(newValue)) {
              setCalculateValue(newValue);
            }
          } }
          inputProps={{ autoFocus: true, keyboardType: 'numeric', textContentType: 'namePrefix' }}
        />
        <Typography
          style={{ marginTop: perfectSize(5), marginBottom: perfectSize(20) }}
          color={ colors.text }
          fontSize={ 12.8 }
          text={ t('screens.Calculation.textHelp') }
        />
        <View style={ styles.containerTime }>
          {
          timeDataCalculation.map(item => (
            <TouchableOpacity
              onPress={ () => setCurrentPeriod(item) }
              key={ item }
              style={{
                ...styles.itemTime,
                borderColor: item === currentPeriod ? mainColors.blue : 'transparent',
              }}
            >
              <Typography
                fontSize={ 14 }
                bold
                color={ item === currentPeriod ? colors.text : colors.secondaryText }
                text={ t(`screens.Calculation.time.${item}`, { ending: 'я' }) }
              />
            </TouchableOpacity>
          ))
        }
        </View>
        <View style={{ justifyContent: 'center' }}>
          <Typography
            color={ colors.text }
            style={{
              marginBottom: perfectSize(5),
            }}
          /* eslint-disable-next-line max-len */
            text={ `${t('screens.Calculation.resultTitle')} ${(t(`screens.Calculation.time.${currentPeriod}`, { ending: 'ю' })).toLowerCase()}` }
          />
          <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
            <Typography fontSize={ 24 } bold color={ mainColors.green } text={ `${resultCalculations.result}` } />

            <Typography
              style={{ marginLeft: perfectSize(3) }}
              bold
              color={ colors.text }
              text={ currentCoinCalculation }
            />
          </View>
          <TouchableOpacity onPress={ () => openCurrencyModal() }>
            <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
              <Typography
                fontSize={ 12.8 }
                bold
                color={ colors.secondaryText }
                text={ fiatCurrency === 'USD' ? `≈ ${resultCalculations.money}`
                  : `≈ ${course?.toFixed(2)}` }
              />
              <Typography
                style={{ marginLeft: perfectSize(3) }}
                fontSize={ 12.8 }
                bold
                color={ colors.text }
                text={ fiatCurrency || 'USD' }
              />
              <View style={ styles.icon }>
                <Chevron fill={ colors.secondaryText } />
              </View>
            </View>
          </TouchableOpacity>
        </View>
      </View>
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

export default CalculationCard;
