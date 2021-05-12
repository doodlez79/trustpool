import React from 'react';

import { useTranslation } from 'react-i18next';
import { LinkingURLService } from 'services';
import { mainColors } from 'constants/colors';
import { perfectSize } from 'helpers/PerfectSize';
import { Btn } from '../Btn';

const BtnFaq :React.FC = () => {
  const { t } = useTranslation();
  return (
    <Btn
      onClick={ () => LinkingURLService.openURL('https://trustpool.ru/help?category=payment') }
      style={{ backgroundColor: mainColors.green, marginTop: perfectSize(20) }}
      title={ t('screens.Settings.readFaq') }
    />
  );
};

export default BtnFaq;
