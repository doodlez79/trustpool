import React from 'react';
import { View } from 'react-native';

import { useTranslation } from 'react-i18next';
import { useTheme } from 'helpers/ThemeManage';
import { SelectorList } from 'components/SelectorList';
import { iconsByCoin } from 'constants/iconByCoin';
import { Typography } from '../Typography';

import { ReferalRewardEmptyScreenProps } from './ReferalRewardEmptyScreen.types';

const ReferalRewardEmptyScreen: React.FC<ReferalRewardEmptyScreenProps> = ({
  coin, onClick, active,
}) => {
  const { t } = useTranslation();
  const { colors } = useTheme();

  return (
    <View style={{
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
    }}
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
      <View style={{ marginTop: 20 }}>
        <Typography
          text={ t('screens.Referals.isRewardListEmpty') }
          color={ colors.text }
          fontSize={ 16 }
        />
      </View>

      {/* {!workers && (
          <Typography
            color={ colors.text }
            text={ t('screens.Payment.havntPaymentHow') }
          />
          )}
          {(status === WORKERS_CONTENT_TYPE.ALL || !workers) && <BtnFaq />}
        </> */}
      {/* )} */}

    </View>
  );
};

export default ReferalRewardEmptyScreen;
