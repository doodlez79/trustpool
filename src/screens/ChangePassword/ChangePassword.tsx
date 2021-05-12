import React, {
  FC, useEffect, useRef, useState,
} from 'react';
import { Dimensions } from 'react-native';
import { StackScreenProps } from '@react-navigation/stack';
import { MainStackParamList } from 'navigation/Navigation.types';
import Carousel from 'react-native-snap-carousel';
import { useDispatch, useSelector } from 'react-redux';

import { Actions, Selectors } from 'ducks';
import { ChangePasswordStepOne } from 'components/ChangePasswordStepOne';
import { ChangePasswordStepTwo } from 'components/ChangePasswordStepTwo';
import { HiddenKeyboardOutSideTab } from 'components/HiddenKeyboardOutSideTab';
import { DataType } from 'components/SubAccountsModalContent/SubAccountsModalContent.types';
import NavigationBack from 'components/NavigationBack/NavigationBack';
import { useTranslation } from 'react-i18next';

export interface ChangePasswordProps extends StackScreenProps<MainStackParamList, 'ChangePassword'>{}

const { width: deviceWidth } = Dimensions.get('window');

const ChangePassword:FC<ChangePasswordProps> = ({ navigation, route }) => {
  const carouselRef = useRef<Carousel<DataType>>(null);
  const [ currentIndex, setCurrentIndex ] = useState(0);
  const [ errors, setErrors ] = useState({ changePassOneStep: 0, changePassTwoStep: 0 });
  const user = useSelector(Selectors.Account.getAccountInfo);
  const loading = useSelector(Selectors.Setting.isLoading);
  const dispatch = useDispatch();
  const { t } = useTranslation();
  useEffect(() => {
    if (carouselRef.current && currentIndex !== carouselRef.current.currentIndex) {
      carouselRef.current.snapToItem(currentIndex);
    }
  }, [ currentIndex ]);

  useEffect(() => {
    if (route.params && route.params.leftTitle) {
      navigation.setOptions({
        headerLeft: ({ onPress }) => (
          <NavigationBack
            onClick={ onPress }
            text={ t(`screens.Settings.tabName.${route.params.leftTitle}`) as string }
          />
        ),
      });
    }
  }, [ ]);

  const submitChangePasswordStepOne = (values: {valuePassword: string, valueGA: string}) => {
    dispatch(Actions.Setting.verifyOldPassword.request({
      password: values.valuePassword,
      verifyCode: user.isTotpVerify ? values.valueGA : undefined,
      verifyType: 'google_code',
    }, {
      resolve: () => setCurrentIndex(s => s + 1),
      reject: code => {
        setErrors(s => ({ ...s, changePassOneStep: code! }));
      },
    }));
  };

  const submitChangePasswordStepTwo = (value: string) => {
    dispatch(Actions.Setting.setNewPassword.request({
      password: value,
    }, {
      resolve: () => navigation.replace('Auth'),
      reject: code => setErrors(s => ({
        ...s,
        changePassTwoStep: code!,
      })),
    }));
  };

  const data = [
    {
      id: 1,
      component: <ChangePasswordStepOne
        loading={ loading }
        error={ errors.changePassOneStep }
        onSubmit={ submitChangePasswordStepOne }
        googleAuthFlag={ user.isTotpVerify }
        setErrors={ value => setErrors({ changePassOneStep: value, changePassTwoStep: value }) }
      />,
    },
    {
      id: 2,
      component: <ChangePasswordStepTwo
        loading={ loading }
        setError={ value => setErrors(s => ({
          ...s,
          changePassTwoStep: value,
        })) }
        onSubmit={ submitChangePasswordStepTwo }
        error={ errors.changePassTwoStep }
      />,
    },
  ];

  return (
    <HiddenKeyboardOutSideTab>
      <Carousel<DataType>
        layout="default"
        lockScrollWhileSnapping
        scrollEnabled={ false }
        ref={ carouselRef }
        data={ data }
        renderItem={ ({ item }: any) => (
          item.component
        ) }
        sliderWidth={ deviceWidth }
        itemWidth={ deviceWidth }
      />
    </HiddenKeyboardOutSideTab>
  );
};

export default ChangePassword;
