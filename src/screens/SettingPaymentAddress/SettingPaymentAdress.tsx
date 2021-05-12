import React, {
  useCallback, useEffect, useRef, useState,
} from 'react';
import { useTranslation } from 'react-i18next';
import { StackScreenProps } from '@react-navigation/stack';
import { useDispatch, useSelector } from 'react-redux';
import Carousel from 'react-native-snap-carousel';

import { MainStackParamList } from 'navigation/Navigation.types';
import NavigationBack from 'components/NavigationBack/NavigationBack';
import { perfectSize } from 'helpers/PerfectSize';
import { useTheme } from 'helpers/ThemeManage';
import { Actions, Selectors } from 'ducks';
import {
  Dimensions,
} from 'react-native';
import { SetPaymentAddressVerif } from 'components/SetPaymentAddressVerifPage';
import { SetPaymentAddressFillPage } from 'components/SetPaymentAddressFillPage';
import { useFocusEffect } from '@react-navigation/native';
import { StackHeaderLeftButtonProps } from '@react-navigation/stack/src/types';
import { HiddenKeyboardOutSideTab } from 'components/HiddenKeyboardOutSideTab';

export type DataType = {
  component: React.ReactNode
}
export interface SetPaymentAddressProps extends StackScreenProps<MainStackParamList, 'SetPaymentAdress'>{}

const { width } = Dimensions.get('window');

const SettingPaymentAddress:React.FC<SetPaymentAddressProps> = ({ navigation, route }) => {
  const dispatch = useDispatch();

  const { t } = useTranslation();
  const { colors } = useTheme();

  const [ counter, setCounter ] = useState(60);
  const [ errorCode, setErrorCode ] = useState(0);
  const [ errorCodeAddress, setErrorCodeAddress ] = useState(0);
  const [ address, setAddress ] = useState('');

  const Account = useSelector(Selectors.Account.getAccountInfo);
  const carouselRef = useRef<Carousel<DataType>>(null);
  const { coin } = route.params;

  const resetTimer = () => {
    setCounter(60);
  };

  useEffect(() => {
    navigation.setOptions({
      title: t('screens.SetPaymentAdress.nameScreen', { coin }),
      headerTitleStyle: {
        fontFamily: 'OpenSans-Bold',
        fontSize: perfectSize(16),
        color: colors.text,
      },
      headerLeft: ({ onPress, label }: StackHeaderLeftButtonProps) => {
        if (label) {
          return <NavigationBack onClick={ onPress } text={ t('screens.Payment.nameScreen') } />;
        }
        return <></>;
      },
    });
    return (resetTimer());
  }, [ coin ]);

  const pageStart = useCallback(() => {
    dispatch(Actions.Setting.getCodeEmail.request());
  }, [ dispatch ]);

  useFocusEffect(pageStart);

  useEffect(() => {
    const timer = setInterval(
      () => setCounter(s => {
        if (s && s > 0) {
          return s - 1;
        }
        return s;
      }),
      1000,
    );
    return () => clearInterval(timer);
  }, []);

  const verificateCode = (values: { verifCode: string, gaCode: string }) => {
    dispatch(Actions.Setting.verifyCodeEmail.request(
      {
        coin,
        code: values.verifCode,
        gaCode: values.gaCode || '',
        verifyType: Account.hasTotpAuth ? 'google_code' : undefined,
      }, {
        resolve: () => {
          carouselRef.current?.snapToNext();
        },
        reject: errCode => {
          setErrorCode(errCode);
        },
      },
    ));
  };

  const resendCode = () => {
    dispatch(Actions.Setting.getCodeEmail.request());
  };

  const setPaymnetAddress = () => {
    dispatch(Actions.Setting.sendAddressPayment.request({
      coin,
      address,
    }, {
      reject: errCode => {
        setErrorCodeAddress(errCode);
      },
      resolve: () => {
        navigation.goBack();
      },
    }));
  };

  const data = [
    {
      component:
  <SetPaymentAddressVerif
    account={ Account }
    resendCode={ resendCode }
    errorCode={ errorCode }
    counter={ counter }
    verificateCode={ verificateCode }
    resetTimer={ resetTimer }
    setErrorCode={ value => setErrorCode(value) }
  />,
    },
    {
      component:
  <SetPaymentAddressFillPage
    coin={ coin }
    address={ address }
    setAddress={ value => setAddress(value) }
    setPaymnetAddress={ setPaymnetAddress }
    errorCode={ errorCodeAddress }
    setErrorCodeAddress={ value => setErrorCodeAddress(value) }
  />,
    },
  ];

  return (
    <HiddenKeyboardOutSideTab>
      <Carousel<DataType>
        data={ data }
        ref={ carouselRef }
        lockScrollWhileSnapping
        layout="default"
        renderItem={ ({ item }:any) => (
          item.component
        ) }
        sliderWidth={ width }
        scrollEnabled={ false }
        itemWidth={ width }
      />
    </HiddenKeyboardOutSideTab>
  );
};

export default SettingPaymentAddress;
