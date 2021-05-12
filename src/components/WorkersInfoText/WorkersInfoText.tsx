import React, { FC } from 'react';
import { useTranslation } from 'react-i18next';
import { useTheme } from 'helpers/ThemeManage';
import { View } from 'react-native';
import { Typography } from '../Typography';
import { styles } from './styles';

const WorkersInfoText: FC = () => {
  const { t } = useTranslation();
  const { colors } = useTheme();
  return (
    <>
      <Typography
        text={ t('screens.Workers.info.mainTextFirstStr') }
        color={ colors.secondaryText }
      />
      <View style={ styles.firstStr }>
        <Typography
          text={ `${t('screens.Workers.info.mainTextFirstBold')} ` }
          bold
          color={ colors.secondaryText }
        />
        <Typography
          text={ `${t('screens.Workers.info.mainTextSecondStr')} ` }
          color={ colors.secondaryText }
        />
      </View>
      <Typography
        text={ t('screens.Workers.info.mainTextMiddle') }
        color={ colors.secondaryText }

      />
      <View style={ styles.strWithBold }>
        <Typography
          text={ `${t('screens.Workers.info.mainTextFourthStr')} ` }
          color={ colors.secondaryText }
        />
        <Typography
          text={ `${t('screens.Workers.info.mainTextSecondBold')} ` }
          bold
          color={ colors.secondaryText }
        />
      </View>
      <Typography
        text={ t('screens.Workers.info.mainTextLastString') }
        color={ colors.secondaryText }
      />
    </>
  );
};

export default WorkersInfoText;
