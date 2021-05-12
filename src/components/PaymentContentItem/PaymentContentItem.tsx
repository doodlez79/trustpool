import React from 'react';
import { format, isValid } from 'date-fns';
import { View } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';

import Chevron from 'Icons/Chevron.svg';
import { useTranslation } from 'react-i18next';
import { useTheme } from 'helpers/ThemeManage';
import { paymentStatus } from 'constants/paymentStatus';
import { Typography } from '../Typography';
import { PaymentContentItemProps } from './PaymentContentItem.type';

import { styles } from './styles';

const PaymentContentItem: React.FC <PaymentContentItemProps> = ({
  item, onPress, isDoge,
}) => {
  const { t } = useTranslation();
  const { colors } = useTheme();

  return (
    <TouchableOpacity
      onPress={ onPress }
      style={ [ styles.itemContainer, { backgroundColor: colors.backgroundSelectedItem }] }
    >
      <Typography
        fontSize={ 16 }
        bold
        align="left"
        color={ colors.text }
        text={ (item.time && isValid(item.time) ? format(item.time as Date, 'dd-MM-yyyy hh:mm:ss') : '') }
      />
      <View style={ styles.mainRow }>
        <View style={ styles.column }>
          <Typography text={ t('screens.Payment.value') } fontSize={ 12.8 } color={ colors.secondaryText } />
          <View style={ [ styles.row, { alignItems: 'center' }] }>
            <Typography text={ item.amount } bold color={ colors.text } />
            <Typography
              text={ ` ${item.coin}` }
              bold
              color={ colors.secondaryText }
              fontSize={ 14 }
            />
          </View>
        </View>
        {
          !isDoge
          && (
          <View style={ styles.column }>
            <Typography
              text={ t('screens.Payment.statusDetail') }
              fontSize={ 12.8 }
              color={ colors.secondaryText }
            />
            <Typography
              text={ t(`screens.Payment.status.${paymentStatus(item.status)}`) }
              fontSize={ 14 }
              bold
              color={ colors.text }
            />
          </View>
          )
        }

      </View>

      <View style={ styles.icon }>
        <Chevron fill={ colors.secondaryText } />
      </View>
    </TouchableOpacity>
  );
};

export default PaymentContentItem;
