import React, { FC } from 'react';

import { View, TouchableOpacity } from 'react-native';

import { Typography } from 'components/Typography';
import { format, isValid } from 'date-fns';
import { NumberToSystemMeasuring } from 'helpers/NumberToSystemMeasuring';
import { perfectSize } from 'helpers/PerfectSize';
import { useTheme } from 'helpers/ThemeManage';

import { useTranslation } from 'react-i18next';

import { lightThemeColors } from 'constants/colors';
import { FORMAT_REVERSE } from 'constants/format';
import { styles } from './styles';
import { ReferalItemProps } from './ReferalItem.types';

const ReferalContentItem: FC<ReferalItemProps> = ({ item, referals }) => {
  const { colors } = useTheme();
  const { t } = useTranslation();

  return (
    <>
      <TouchableOpacity
        disabled
        style={ [ styles.container, { backgroundColor: colors.backgroundSelectedItem }] }
      >
        <View>
          <View style={ styles.rows }>
            <Typography
              fontSize={ 16 }
              bold
              text={ referals ? item.account
                : (item.time && isValid(item.time)
                && format(item.time, FORMAT_REVERSE)) }
              color={ colors.text }
            />
          </View>
          <View
            style={ [ styles.rows, styles.mT ] }
          >
            <View style={ styles.columns }>
              <Typography
                color={ colors.secondaryText }
                fontSize={ 12.8 }
                align="left"
                text={ referals ? t('screens.Referals.dayAvg')
                  : t('screens.Referals.reward') }
              />
              {referals ? (
                <View style={{
                  flexDirection: 'row',
                }}
                >
                  <Typography
                    color={ colors.text }
                    bold
                    align="left"
                    fontSize={ 14 }
                    text={ NumberToSystemMeasuring(item.hashrate, 3).newValue }
                    style={{ marginRight: perfectSize(4) }}
                  />
                  <Typography
                    color={ lightThemeColors.grey }
                    bold
                    align="left"
                    fontSize={ 14 }
                    text={ NumberToSystemMeasuring(item.hashrate1day, 3).prefix }
                  />
                </View>
              ) : (
                <View style={{ flexDirection: 'row' }}>
                  <Typography
                    color={ colors.text }
                    bold
                    align="left"
                    fontSize={ 14 }
                    text={ String(item.profit) }
                    style={{ marginRight: perfectSize(4) }}
                  />
                  <Typography
                    color={ lightThemeColors.grey }
                    bold
                    align="left"
                    fontSize={ 14 }
                    text={ String(item.coin) }
                  />
                </View>
              )}

            </View>
            <View style={ [ styles.columns, styles.mL ] }>
              <Typography
                color={ colors.secondaryText }
                fontSize={ 12.8 }
                align="left"
                text={ referals ? t('screens.Referals.referralRatio')
                  : t('screens.Referals.hashrate') }
              />
              <View style={{ flexDirection: 'row' }}>
                <Typography
                  color={ colors.text }
                  bold
                  fontSize={ 14 }
                  text={ referals ? item.profitRate
                    : NumberToSystemMeasuring(item.hashrate, 3).newValue }
                  style={{ marginRight: perfectSize(5) }}
                />
                {!referals && (
                  <Typography
                    text={ NumberToSystemMeasuring(item.hashrate, 3).prefix }
                    bold
                    fontSize={ 14 }
                    color={ colors.secondaryText }
                  />
                ) }
              </View>
            </View>
          </View>
        </View>
      </TouchableOpacity>
    </>
  );
};

export default ReferalContentItem;
