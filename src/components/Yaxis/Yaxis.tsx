import React, { FC } from 'react';

import { View } from 'react-native';

import { Typography } from 'components/Typography';
import { useTheme } from 'helpers/ThemeManage';

type YaxisProps = {
  data: {date: number, value: number}[]
  countTicks: number
  // padding: number
}

const Yaxis:FC<YaxisProps> = ({ data, countTicks = 3 }) => {
  const { colors } = useTheme();
  const maxValue = Math.max(...data.map(item => item.value));
  // const minValue = Math.min(...data.map(item => item.value));

  let step = 0;

  if (maxValue < 5) {
    step = Math.ceil(maxValue * 2) / 2;
  }
  if (maxValue >= 5 && maxValue < 25) {
    step = Math.ceil(maxValue / 5) * 5;
  }
  if (maxValue >= 25 && maxValue < 50) {
    step = Math.ceil(maxValue / 10) * 10;
  }
  if (maxValue >= 50 && maxValue < 100) {
    step = Math.ceil(maxValue / 20) * 20;
  }
  if (maxValue >= 100) {
    step = Math.ceil(maxValue / 50) * 50;
  }

  const ticksData = Array(countTicks).fill(0).reduce((acc, item, index) => {
    acc = [ ...acc, (step / (countTicks - 1)) * index ];
    return acc;
  }, []);

  return (
    <View
      pointerEvents="none"
      style={{
        position: 'absolute',
        left: 5,
        top: -5,
        width: 50,
        height: '105%',
        zIndex: 99999,
        justifyContent: 'space-between',
      }}
    >
      {
        ticksData.reverse().map((item: string | undefined, index: any) => (
          <View
            pointerEvents="none"
            key={ String(index) }
            style={{
              flexDirection: 'row',
              alignItems: 'center',
            }}
          >
            <View style={{
              height: 1,
              width: 5,
              backgroundColor: colors.text,
            }}
            />
            <Typography
              text={ item }
              fontSize={ 10 }
              color={ colors.text }
            />
          </View>

        ))
      }
    </View>
  );
};

export default React.memo(Yaxis);
