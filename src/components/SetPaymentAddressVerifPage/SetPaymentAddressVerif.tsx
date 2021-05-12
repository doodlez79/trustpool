import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import {
  Keyboard,
  KeyboardAvoidingView, Platform, SafeAreaView, View,
} from 'react-native';
import { Formik } from 'formik';

import { mainColors } from 'constants/colors';
import { perfectSize } from 'helpers/PerfectSize';
import { useTheme } from 'helpers/ThemeManage';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Btn } from '../Btn';
import { SizeBtn } from '../Btn/Btn.types';
import { InputField } from '../InputField';
import { Typography } from '../Typography';
import { SetPaymentAddressVerifProps } from './SetPaymentAddressVerif.types';

import { styles } from './styles';

const SetPaymentAddressVerif:React.FC<SetPaymentAddressVerifProps> = ({
  account,
  errorCode,
  resendCode,
  counter,
  verificateCode,
  resetTimer,
  setErrorCode,
}) => {
  const { t } = useTranslation();

  const { colors } = useTheme();

  const insert = useSafeAreaInsets();

  const handleResetCode = () => (
    counter === 0 && (resendCode(), resetTimer())
  );

  const [ isKeyboardVisible, setKeyboardVisible ] = useState(false);

  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener(
      'keyboardDidShow',
      () => {
        setKeyboardVisible(true); // or some other action
      },
    );
    const keyboardDidHideListener = Keyboard.addListener(
      'keyboardDidHide',
      () => {
        setKeyboardVisible(false); // or some other action
      },
    );

    return () => {
      keyboardDidHideListener.remove();
      keyboardDidShowListener.remove();
    };
  }, []);

  return (
    <SafeAreaView style={{ flex: 1, justifyContent: 'center', marginBottom: insert.bottom + 20 }}>
      <Typography
        color={ colors.text }
        style={{ marginTop: 5 }}
        text={ isKeyboardVisible ? '' : t('screens.SetPaymentAdress.verificate') }
      />
      <Formik
        initialValues={{
          verifCode: '',
          gaCode: '',
        }}
        enableReinitialize
        validateOnChange={ false }
        validateOnBlur
        onSubmit={ values => {
          verificateCode(values);
        } }
      >
        {
        ({
          values,
          setFieldValue, handleSubmit, errors, dirty,
        }) => (
          <View style={{ flex: 1 }}>
            <KeyboardAvoidingView
              keyboardVerticalOffset={ perfectSize(160) }
              style={{ flex: 1, ...styles.formStyle }}
              { ...(Platform.OS === 'ios' && { behavior: 'padding' }) }
            >
              <View
                style={ styles.mainBlock }
              >
                <InputField
                  inputContainerStyle={{
                    marginBottom: perfectSize(15),
                  }}
                  onChange={ text => {
                    setErrorCode(0);
                    setFieldValue('verifCode', text);
                  } }
                  value={ String(values.verifCode) }
                  label={ t('screens.SetPaymentAdress.verificateCode') }
                  error={ errorCode > 0 ? errorCode : errors.verifCode }
                  inputProps={{
                    keyboardType: 'numeric',
                    removeClippedSubviews: false,
                    autoCorrect: false,
                  }}
                />

                {
            account.hasTotpAuth
              && (
              <>
                <InputField
                  onChange={ text => {
                    setErrorCode(0);
                    setFieldValue('gaCode', text);
                  } }
                  value={ values.gaCode }
                  error={ errorCode }
                  label={ t('screens.SetPaymentAdress.verificateGaCode') }
                  inputProps={{
                    keyboardType: 'numeric',
                    removeClippedSubviews: false,
                    autoCorrect: false,
                  }}
                />
              </>
              )
          }
                <Typography
                  style={{
                    width: '100%',
                  }}
                  fontSize={ 13 }
                  color={ mainColors.red }
                  align="left"
                  text={ errorCode > 0 ? t(`screens.SetPaymentAdress.errors.${errorCode}`) : '' }
                />

              </View>
              <View style={{ alignItems: 'center' }}>
                <View style={ styles.row }>
                  <Typography
                    text={ `${t('screens.SetPaymentAdress.resendCode')}` }
                    bold
                    color={ counter === 0 ? mainColors.blue : colors.secondaryText }
                    onPress={ handleResetCode }
                  />
                  <Typography
                    text={ counter > 0 ? ` (${counter} ${t('screens.SetPaymentAdress.sec')})` : '' }
                    bold
                    color={ colors.secondaryText }
                  />
                </View>

                <Btn
                  title={ t('screens.SetPaymentAdress.continueBtn') }
                  size={ SizeBtn.MEDIUM }
                  disabled={ !dirty }
                  onClick={ handleSubmit }
                  style={{ marginTop: 15 }}
                />
              </View>
            </KeyboardAvoidingView>
          </View>
        )
}

      </Formik>
    </SafeAreaView>
  );
};

export default SetPaymentAddressVerif;
