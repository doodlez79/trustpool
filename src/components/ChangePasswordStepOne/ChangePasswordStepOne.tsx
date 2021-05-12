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

import { styles } from 'components/AuthForm/styles';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import ClearInput from 'Icons/ClearInput.svg';
import { schemaChangePass } from 'components/ChangePasswordStepOne/ChangePasswordStepOne.config';

type ChangePasswordStepOneProps = {
  googleAuthFlag: boolean
  onSubmit: (values: {valuePassword: string, valueGA: string}) => void
  loading: boolean
  setErrors: (value: number) => void
  error: number
}
const ChangePasswordStepOne:FC<ChangePasswordStepOneProps> = ({
  onSubmit, googleAuthFlag, error, loading, setErrors,
}) => {
  const { t } = useTranslation();

  const insert = useSafeAreaInsets();

  return (
    <SafeAreaView style={{ flex: 1, justifyContent: 'center', marginBottom: insert.bottom + 20 }}>
      <Formik
        initialValues={{
          valuePassword: '',
          valueGA: '',
        }}
        validateOnChange={ false }
        /* eslint-disable-next-line max-len */
        validationSchema={ schemaChangePass(t('screens.ChangePassword.requiredOldPass'), t('screens.ChangePassword.reqeiredValuedGA'), googleAuthFlag) }
        enableReinitialize
        onSubmit={ onSubmit }
      >
        {
            ({
              values, setFieldValue, handleSubmit, dirty, setErrors: setErrorsYup, errors,
            }) => (
              <View style={{ flex: 1, paddingHorizontal: perfectSize(16) }}>

                <KeyboardAvoidingView
                  keyboardVerticalOffset={ perfectSize(160) }
                  style={{ flex: 1, ...styles.formStyle }}
                  { ...(Platform.OS === 'ios' && { behavior: 'padding' }) }
                >
                  <View style={{ flex: 1, justifyContent: 'center' }}>
                    <InputField
                      editFlagProps
                      Icon={ passwordShow => (
                        <View style={{
                          width: perfectSize(20),
                          height: perfectSize(20),
                        }}
                        >
                          {passwordShow ? <Eye /> : <EyeSlash /> }
                        </View>
                      ) }
                      value={ values.valuePassword }
                      error={ error !== 0 ? error : errors.valuePassword }
                      onChange={ e => {
                        setErrors(0);
                        setErrorsYup({});
                        setFieldValue('valuePassword', e);
                      } }
                      inputProps={{
                        secureTextEntry: true,
                      }}
                      label={ t('screens.ChangePassword.oldPassword') }
                    />
                    {
                        googleAuthFlag && (
                          <InputField
                            styleContainer={{ marginTop: perfectSize(20) }}
                            value={ values.valueGA }
                            error={ error !== 0 ? error : errors.valueGA }
                            inputProps={{
                              keyboardType: 'number-pad',
                            }}
                            Icon={ () => (
                              <View style={{
                                width: perfectSize(20),
                                height: perfectSize(20),
                              }}
                              >
                                <ClearInput />
                              </View>
                            ) }
                            onChange={ e => {
                              setErrorsYup({});
                              setErrors(0);
                              setFieldValue('valueGA', e);
                            } }
                            label={ t('screens.ChangePassword.GA') }
                          />
                        )
                      }
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
                    title={ t('screens.ChangePassword.btnStepOne') }
                  />
                </KeyboardAvoidingView>

              </View>
            )
          }

      </Formik>

    </SafeAreaView>

  );
};

export default ChangePasswordStepOne;
