import React from 'react';
import { useTranslation } from 'react-i18next';
import { View } from 'react-native';

import { paymentStatus } from 'constants/paymentStatus';
import { useTheme } from 'helpers/ThemeManage';
import { mainColors } from 'constants/colors';
import { LinkingURLService } from 'services';

import { Typography } from '../Typography';
import { PaymentDetailsContentProps } from './Payment.types';

import { styles } from './styles';

const PaymentDetailsContent:React.FC<PaymentDetailsContentProps> = (
  {
    time,
    trId,
    trUrl,
    adress,
    adressUrl,
    amount,
    status,
    coin,
  },
) => {
  const { t } = useTranslation();

  const { colors } = useTheme();

  const data = [
    {
      descrip: `${t('screens.Payment.date')}:`,
      count: time,
    },
    {
      descrip: `${t('screens.Payment.statusDetail')}:`,
      count: t(`screens.Payment.status.${paymentStatus(status)}`),
    },
    {
      descrip: `${t('screens.Payment.value')}:`,
      count: amount,
      flag: coin,
    },
    {
      descrip: `${t('screens.Payment.adress')}:`,
      count: adress,
      url: adressUrl,
    },
    {
      descrip: `${t('screens.Payment.transaction')}:`,
      count: trId,
      url: trUrl,
    },
  ];

  return (
    <>
      {
      data.map((item, index) => (
        <View key={ String(index) } style={{ alignItems: 'flex-start' }}>
          <Typography
            style={ styles.mT }
            text={ item.descrip }
            fontSize={ 12.8 }
            color={ colors.secondaryText }
          />
          <View style={ item.flag ? { flexDirection: 'row' } : {} }>
            <Typography
              bold
              fontSize={ 14 }
              color={ item.url ? mainColors.blue : colors.text }
              text={ item.count }
              onPress={ item.url ? () => LinkingURLService.openURL(item.url) : () => {} }
              align={ item.url ? 'left' : 'center' }
            />
            {
              item.flag && (
              <Typography
                bold
                fontSize={ 14 }
                text={ item.flag }
                style={ styles.mL }
                color={ colors.secondaryText }
              />
              )
            }
          </View>
        </View>
      ))
      }
    </>
  );
};

export default PaymentDetailsContent;
