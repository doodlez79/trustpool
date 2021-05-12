import React from 'react';
import { View } from 'react-native';

import { useTranslation } from 'react-i18next';
import { useTheme } from 'helpers/ThemeManage';
import { mainColors } from 'constants/colors';
import { SelectorList } from 'components/SelectorList';
import { iconsByCoin } from 'constants/iconByCoin';
import { WORKERS_CONTENT_TYPE } from 'screens/Workers/Workers.types';
import { Typography } from '../Typography';
import { PaymentAnotherInfoProps } from './PaymentAnotherInfo.type';
import { BtnFaq } from '../BtnFaq';

import { styles } from './styles';

const PaymentAnotherInfo: React.FC<PaymentAnotherInfoProps> = ({
  wallet = false, coin, onClick, active, workers, status, goTo,
}) => {
  const { t } = useTranslation();
  const { colors } = useTheme();

  return (
    <View style={ [{
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
    },
    workers ? { top: '0%' } : { justifyContent: 'center' } ] }
    >
      {
        coin && (
        <View style={{
          justifyContent: 'center',
        }}
        >
          <SelectorList
            icon={ iconsByCoin[coin] }
            onClick={ onClick }
            active={ active }
            coin={ coin }
          />
        </View>
        )
      }
      {wallet ? (
        <>
          <Typography
            style={ styles.mT }
            color={ colors.text }
            text={ t('screens.Payment.havntAdress') }
          />
          <Typography
            color={ mainColors.blue }
            text={ t('screens.Payment.clickToSet') }
            onPress={ goTo }
          />
        </>
      ) : (
        <>
          <Typography
            style={ styles.mT }
            color={ colors.text }
            text={ workers ? t(`screens.Workers.havntWorkers.${status}`)
              : t('screens.Payment.havntPayment') }
          />
          {!workers && (
          <Typography
            color={ colors.text }
            text={ t('screens.Payment.havntPaymentHow') }
          />
          )}
          {(status === WORKERS_CONTENT_TYPE.ALL || !workers) && <BtnFaq />}
        </>
      )}

    </View>
  );
};

export default PaymentAnotherInfo;
