import React from 'react';
import { useTranslation } from 'react-i18next';
import { KeyboardAvoidingView, Platform, View } from 'react-native';

import { perfectSize } from 'helpers/PerfectSize';
import { useTheme } from 'helpers/ThemeManage';
import ClearInput from 'Icons/ClearInput.svg';
import { mainColors } from 'constants/colors';
import { Btn } from '../Btn';
import { SizeBtn } from '../Btn/Btn.types';
import { InputField } from '../InputField';
import { Typography } from '../Typography';
import { SetPaymentAddressFillPageProps } from './SetPaymentAddressFillPage.types';

import { styles } from './styles';

const SetPaymentAddressFillPage:React.FC<SetPaymentAddressFillPageProps> = (
  {
    coin,
    address,
    setAddress,
    setPaymnetAddress,
    errorCode,
    setErrorCodeAddress,
  },
) => {
  const { t } = useTranslation();
  const { colors } = useTheme();
  return (
    <KeyboardAvoidingView
      keyboardVerticalOffset={ perfectSize(210) }
      style={{ flex: 1, ...styles.formStyle }}
      { ...(Platform.OS === 'ios' && { behavior: 'padding' }) }
    >
      <Typography color={ colors.text } text={ t('screens.SetPaymentAdress.fillAddress') } />
      <View style={ styles.mainBlock }>
        <InputField
          onChange={ text => {
            setErrorCodeAddress(0);
            setAddress(text);
          } }
          label={ t('screens.SetPaymentAdress.setAddress', { coin }) }
          value={ address }
          Icon={ () => (
            <View
              style={{
                width: perfectSize(20),
                height: perfectSize(20),
              }}
            >
              <ClearInput />
            </View>
          ) }
          error={ errorCode }
          inputProps={{
            keyboardType: 'default',
            autoCorrect: false,
          }}
        />
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
      <Btn
        size={ SizeBtn.MEDIUM }
        title={ t('screens.SetPaymentAdress.set') }
        style={ styles.fEnd }
        onClick={ setPaymnetAddress }
      />
    </KeyboardAvoidingView>
  );
};

export default SetPaymentAddressFillPage;
