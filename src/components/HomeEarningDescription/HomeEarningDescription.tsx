import React, { FC } from 'react';

import { View } from 'react-native';

import { Typography } from 'components/Typography';
import { useTheme } from 'helpers/ThemeManage';
import { perfectSize } from 'helpers/PerfectSize';

type HomeEarningDescriptionProps = {
  coin: string,
  value: string
  title: string
}
const HomeEarningDescription:FC<HomeEarningDescriptionProps> = ({ coin, value, title }) => {
  const { colors } = useTheme();

  return (
    <View style={{
      alignItems: 'center',
    }}
    >
      <Typography
        style={{ marginBottom: perfectSize(5) }}
        fontSize={ 12.8 }
        text={ title }
        color={ colors.secondaryText }
      />
      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
        <Typography style={{ marginRight: perfectSize(4) }} text={ value } bold fontSize={ 14 } color={ colors.text } />
        <Typography bold fontSize={ 12.8 } text={ coin } color={ colors.secondaryText } />
      </View>
    </View>
  );
};

export default HomeEarningDescription;
