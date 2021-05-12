import React, { FC } from 'react';
import { useTranslation } from 'react-i18next';
import { useTheme } from 'helpers/ThemeManage';
import { View } from 'react-native';
import { Typography } from '../Typography';
import { styles } from './styles';

const ReferalsInfoText: FC = () => {
  const { t } = useTranslation();
  const { colors } = useTheme();
  return (
    <>
      <Typography
        text={ t('screens.Referals.textFirstStr') }
        color={ colors.secondaryText }
      />
      <View style={ styles.secondStr }>
        <Typography
          text={ `${t('screens.Referals.textSecondStrStart')} ` }
          color={ colors.secondaryText }
        />
        <Typography
          text={ `${t('screens.Referals.textPercent')} ` }
          bold
          color={ colors.secondaryText }
        />
        <Typography
          text={ t('screens.Referals.textSecondStrEnd') }
          color={ colors.secondaryText }
        />
      </View>
      <Typography
        text={ t('screens.Referals.textThirdStr') }
        color={ colors.secondaryText }
      />
    </>
  );
};

export default ReferalsInfoText;
