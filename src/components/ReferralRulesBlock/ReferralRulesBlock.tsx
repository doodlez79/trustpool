import React, { FC } from 'react';
import { View } from 'react-native';
import { useTheme } from 'helpers/ThemeManage';
import { useTranslation } from 'react-i18next';
import { perfectSize } from 'helpers/PerfectSize';
import { styles } from './styles';
import { Typography } from '../Typography';

const ReferralRulesBlock: FC = () => {
  const { colors } = useTheme();
  const { t } = useTranslation();

  const rules = [
    {
      id: 1,
      num: '1.',
      text: t('screens.Referals.modal.firstRule'),
    },
    {
      id: 2,
      num: '2.',
      text: t('screens.Referals.modal.secondRule'),
    },
    {
      id: 3,
      num: '3.',
      text: t('screens.Referals.modal.thirdRule'),
    },
  ];

  return (
    <View>
      <View
        style={ styles.rulesBlock }
      >
        <Typography
          text={ t('screens.Referals.modal.referralRules') }
          fontSize={ 12.8 }
          color={ colors.text }
        />
      </View>
      <View style={ styles.rulesText }>
        {
          rules.map(item => (
            <View
              style={ styles.rulesStrings }
              key={ item.id }
            >
              <View style={{ marginRight: perfectSize(5) }}>
                <Typography text={ item.num } fontSize={ 12.8 } color={ colors.text } />
              </View>
              <View style={{ maxWidth: '100%' }}>
                <Typography
                  text={ item.text }
                  fontSize={ 12.8 }
                  style={{ textAlign: 'left' }}
                  color={ colors.text }
                />
              </View>
            </View>
          ))
        }
      </View>
    </View>
  );
};

export default ReferralRulesBlock;
