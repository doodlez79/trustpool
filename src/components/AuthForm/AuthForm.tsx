import React, { FC } from 'react';
import { useTranslation } from 'react-i18next';
import { KeyboardAvoidingView, Platform, View } from 'react-native';
import { Formik } from 'formik';

import { InputField } from 'components/InputField';
import { Typography } from 'components/Typography';
import { mainColors } from 'constants/colors';
import { Btn } from 'components/Btn';
import ClearInput from 'Icons/ClearInput.svg';
import Eye from 'Icons/Eye.svg';
import EyeSlash from 'Icons/EyeSlash.svg';

import { perfectSize } from 'helpers/PerfectSize';
import { useSelector } from 'react-redux';
import { Selectors } from 'ducks';
import { useTheme } from 'helpers/ThemeManage';
import { AuthFormProps } from './AuthForm.types';
import { styles } from './styles';
import { schema } from './AuthForm.config';

const AuthForm:FC<AuthFormProps> = ({
  setFormData, errorCode, setErrors: setGlobalErrors, disableBtn, loading,
}) => {
  const { t } = useTranslation();
  const isConnection = useSelector(Selectors.App.isConnection);

  const { colors } = useTheme();

  const passwordText = {
    required: t('screens.Auth.errors.passwordRequired'),
    min: t('screens.Auth.errors.passwordLengthShort'),
    max: t('screens.Auth.errors.passwordLengthLong'),
  };
  const emailText = {
    required: t('screens.Auth.errors.emailRequired'),
    incorrect: t('screens.Auth.errors.emailIncorrect'),
  };
  return (
    <Formik
      initialValues={{
        email: '',
        password: '',
      }}
      enableReinitialize
      validateOnChange={ false }
      validateOnBlur
      validationSchema={ schema(passwordText, emailText) }
      onSubmit={ values => {
        setFormData(values);
      } }
    >
      {
        ({
          values,
          setFieldValue, handleSubmit, errors, isValid, setErrors,
        }) => (
          <>
            <KeyboardAvoidingView
              keyboardVerticalOffset={ perfectSize(190) }
              style={{ flex: 1, ...styles.formStyle }}
              { ...(Platform.OS === 'ios' && { behavior: 'padding' }) }
            >
              <View style={ styles.container }>
                <InputField
                  editFlagProps
                  disable={ !isConnection }
                  styleContainer={ styles.emailInput }
                  error={ errorCode > 0 ? errorCode : errors.email }
                  value={ values.email.trim() }
                  label={ t('screens.Auth.email') }
                  onChange={ text => {
                    if (errorCode) {
                      setGlobalErrors(0);
                    }
                    setErrors({});
                    setFieldValue('email', text);
                  } }
                  Icon={ () => (
                    <View style={{
                      width: perfectSize(20),
                      height: perfectSize(20),
                    }}
                    >
                      <ClearInput />
                    </View>
                  ) }
                  inputContainerStyle={{
                    borderWidth: 0,
                  }}
                  inputStyle={ isConnection ? {} : {
                    backgroundColor: colors.secondaryText,
                  } }
                  inputProps={{
                    keyboardType: 'default',
                    autoCompleteType: 'email',
                  }}
                />
                <InputField
                  editFlagProps
                  disable={ !isConnection }
                  styleContainer={ styles.passwordInput }
                  inputContainerStyle={{
                    borderWidth: 0,
                  }}
                  inputStyle={ isConnection ? {} : {
                    backgroundColor: colors.secondaryText,
                  } }
                  value={ values.password }
                  error={ errorCode > 0 ? errorCode : errors.password }
                  label={ t('screens.Auth.password') }
                  onChange={ text => {
                    if (errorCode) {
                      setGlobalErrors(0);
                    }
                    setErrors({});
                    setFieldValue('password', text);
                  } }
                  Icon={ passwordShow => (
                    <View style={{
                      width: perfectSize(20),
                      height: perfectSize(20),
                    }}
                    >
                      {passwordShow ? <Eye /> : <EyeSlash /> }
                    </View>
                  ) }
                  inputProps={{
                    secureTextEntry: true,
                  }}
                />

                <Typography
                  style={{
                    width: '100%',
                  }}
                  fontSize={ 13 }
                  color={ mainColors.red }
                  align="left"
                  text={ errorCode > 0 ? t(`screens.Auth.errors.${errorCode}`) : '' }
                />
                <Typography
                  style={{
                    width: '100%',
                  }}
                  fontSize={ 13 }
                  color={ mainColors.red }
                  align="left"
                  text={ isConnection ? '' : t('disconnectOne') }
                />
                <Typography
                  style={{
                    width: '100%',
                  }}
                  fontSize={ 13 }
                  color={ mainColors.red }
                  align="left"
                  text={ isConnection ? '' : t('disconnecTwo') }
                />
              </View>
              <Btn
                style={{ alignSelf: 'flex-end', marginBottom: perfectSize(50) }}
                loading={ loading }
                disabled={ isConnection ? (disableBtn && !isValid) : true }
                title={ t('screens.Auth.btn') }
                onClick={ handleSubmit }
              />
            </KeyboardAvoidingView>
          </>

        )
      }

    </Formik>
  );
};

export default AuthForm;
