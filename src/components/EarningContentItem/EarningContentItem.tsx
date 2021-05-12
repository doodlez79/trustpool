import React from 'react';
import { View } from 'react-native';

import { useTranslation } from 'react-i18next';
import { useTheme } from 'helpers/ThemeManage';
import { NumberToSystemMeasuring } from 'helpers/NumberToSystemMeasuring';
import { Typography } from '../Typography';
import { EarningContentItemProps } from './EarningContentItem.types';

import { styles } from './styles';

const EarningContentItem: React.FC <EarningContentItemProps> = ({
  item, isDoge,
}) => {
  const { t } = useTranslation();
  const { colors } = useTheme();

  const { prefix } = NumberToSystemMeasuring(item.hashrate, 3);

  return (
    <View
      style={ [ styles.itemContainer, { backgroundColor: colors.backgroundSelectedItem }] }
    >
      <View style={ styles.titleRow }>
        <Typography
          fontSize={ 16 }
          bold
          align="left"
          color={ colors.text }
          text={ `${item.date}` }
        />
        {!isDoge
         && (
         <>
           <Typography
             fontSize={ 16 }
             bold
             color={ colors.text }
             text={ `, ${String(NumberToSystemMeasuring(item.hashrate, 3).newValue)}` }
           />
           <Typography
             fontSize={ 16 }
             bold
             color={ colors.secondaryText }
             text={ ` ${NumberToSystemMeasuring(item.hashrate, 3).prefix}H/S` }
           />
         </>
         )}

      </View>

      <View style={ styles.mainRow }>
        <View style={ styles.column }>
          <Typography text={ t('screens.Payment.earning.profit') } fontSize={ 12.8 } color={ colors.secondaryText } />
          <View style={ styles.row }>
            <Typography text={ item.totalProfit } fontSize={ 14 } bold color={ colors.text } />
            <Typography
              text={ ` ${item.coin}` }
              bold
              color={ colors.secondaryText }
              fontSize={ 14 }
            />
          </View>
        </View>
        {!isDoge
         && (
         <View style={ styles.column }>
           <Typography
             text={ t('screens.Payment.earning.unitOutput', { prefix }) }
             fontSize={ 12.8 }
             color={ colors.secondaryText }
           />
           <View style={ styles.row }>
             <Typography
               text={ item.unitOutput }
               fontSize={ 14 }
               bold
               color={ colors.text }
             />
             <Typography
               text={ ` ${item.coin}` }
               fontSize={ 14 }
               bold
               color={ colors.secondaryText }
             />
           </View>
         </View>
         )}

      </View>
    </View>
  );
};

export default EarningContentItem;
