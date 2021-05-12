import React from 'react';

import { View } from 'react-native';

import { StatusBar } from 'expo-status-bar';

import { Typography } from 'components/Typography';

import { mainColors } from 'constants/colors';
import { perfectSize } from 'helpers/PerfectSize';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useTranslation } from 'react-i18next';

type Props = {
  isConnection: boolean
}

const ErrorState: React.FC<Props> = ({ isConnection }) => {
  if (isConnection) {
    return null;
  }
  const { t } = useTranslation();
  const insert = useSafeAreaInsets();

  return (
    <>
      {/* eslint-disable-next-line react/style-prop-object */}
      { !isConnection && <StatusBar style="light" /> }
      <View
        style={{
          height: 70, zIndex: 3000,
        }}
      >
        <View
          style={{
            width: '100%',
            backgroundColor: mainColors.red,
            borderBottomLeftRadius: perfectSize(16),
            borderBottomRightRadius: perfectSize(16),
            alignItems: 'flex-end',
            flexDirection: 'row',
            justifyContent: 'center',
            paddingTop: insert.top + 10,
            paddingBottom: perfectSize(8),
            position: 'absolute',
          }}
        >
          <View>
            <Typography
              align="center"
              color={ mainColors.white }
              fontSize={ 13 }
              text={ t('disconnectOne') }
            />
            <Typography
              align="center"
              color={ mainColors.white }
              fontSize={ 13 }
              text={ t('disconnecTwo') }
            />
          </View>
        </View>
      </View>

    </>
  );
};

export default ErrorState;
