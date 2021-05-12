import React, { FC } from 'react';

import { InputField } from 'components/InputField';
import { useTranslation } from 'react-i18next';
import { Formik } from 'formik';
import { Btn } from 'components/Btn';
import {
  KeyboardAvoidingView, Platform, SafeAreaView, View,
} from 'react-native';
import { perfectSize } from 'helpers/PerfectSize';
import Eye from 'Icons/Eye.svg';
import EyeSlash from 'Icons/EyeSlash.svg';
import { Typography } from 'components/Typography';
import { mainColors } from 'constants/colors';
import { validationSchema } from 'components/ChangePasswordStepTwo/ChangePasswordStepTwo.config';
import { HiddenKeyboardOutSideTab } from 'components/HiddenKeyboardOutSideTab';
import { styles } from 'components/AuthForm/styles';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

type ChangePasswordStepTwoProps = {
  onSubmit: (value:string) => void
  setError: (code: number) => void
  loading: boolean

  error: number
}
const ChangePasswordStepTwo:FC<ChangePasswordStepTwoProps> = ({
  onSubmit, error, setError, loading,
}) => {
  const { t } = useTranslation();
  const insert = useSafeAreaInsets();

  return (
    <SafeAreaView style={{ flex: 1, justifyContent: 'center', marginBottom: insert.bottom + 20 }}>
      <Formik
        validateOnChange={ false }
        initialValues={{
          password: '',
          repeatPassword: '',
        }}
        validationSchema={ () => validationSchema(
          t('screens.ChangePassword.titleRequiredPass'),
          t('screens.ChangePassword.titleRepeatPass'),
        ) }
        enableReinitialize
        onSubmit={ values => onSubmit(values.password) }
      >
        {
          ({
            values, setFieldValue, handleSubmit, dirty, setErrors, errors,
          }) => (
            <View style={{ flex: 1, paddingHorizontal: perfectSize(16) }}>
              <HiddenKeyboardOutSideTab>
                <KeyboardAvoidingView
                  keyboardVerticalOffset={ perfectSize(160) }
                  style={{ flex: 1, ...styles.formStyle }}
                  { ...(Platform.OS === 'ios' && { behavior: 'padding' }) }
                >

                  <View style={{ flex: 1, justifyContent: 'center' }}>

                    <InputField
                      Icon={ passwordShow => (
                        <View style={{
                          width: perfectSize(20),
                          height: perfectSize(20),
                        }}
                        >
                          {passwordShow ? <Eye /> : <EyeSlash /> }
                        </View>
                      ) }
                      value={ values.password }
                      error={ error }
                      onChange={ e => {
                        setError(0);
                        setErrors({});
                        setFieldValue('password', e);
                      } }
                      inputProps={{
                        secureTextEntry: true,
                      }}
                      label={ t('screens.ChangePassword.newPassword') }
                    />
                    <InputField
                      Icon={ passwordShow => (
                        <View style={{
                          width: perfectSize(20),
                          height: perfectSize(20),
                        }}
                        >
                          {passwordShow ? <Eye /> : <EyeSlash /> }
                        </View>
                      ) }
                      styleContainer={{ marginTop: perfectSize(20) }}
                      value={ values.repeatPassword }
                      error={ error || errors.repeatPassword }
                      inputProps={{
                        secureTextEntry: true,
                      }}
                      onChange={ e => {
                        setError(0);
                        setErrors({});
                        setFieldValue('repeatPassword', e);
                      } }
                      label={ t('screens.ChangePassword.repeatPassword') }
                    />
                    <Typography
                      color={ mainColors.red }
                      style={{
                        width: '100%',
                      }}
                      align="left"
                      fontSize={ 12.8 }
                      text={ error > 0 ? t(`screens.ChangePassword.errors.${error}`) : '' }
                    />

                  </View>
                  <Btn
                    loading={ loading }
                    onClick={ handleSubmit }
                    disabled={ !dirty }
                    title={ t('screens.ChangePassword.btnStepTwo') }
                  />
                </KeyboardAvoidingView>
              </HiddenKeyboardOutSideTab>
            </View>
          )
        }

      </Formik>

    </SafeAreaView>

  );
};

export default ChangePasswordStepTwo;
