import React from 'react';
import { View, ViewStyle } from 'react-native';

import { mainColors } from 'constants/colors';
import { perfectSize } from 'helpers/PerfectSize';
import { useTheme } from 'helpers/ThemeManage';

interface Props {
  active?: number
  count: number
  style?: ViewStyle
}

const PageControl :React.FC<Props> = ({
  active,
  count = 2,
  style,
}) => {
  const { colors } = useTheme();
  const ll = new Array(count).fill(new Date());
  return (

    <View style={{ flexDirection: 'row', justifyContent: 'center', ...style }}>
      {ll.map((i, index) => (
        <View
          key={ `item${i + Math.random()}` }
          style={{
            backgroundColor: active === index ? mainColors.blue : colors.secondaryText,
            borderRadius: perfectSize(50),
            width: perfectSize(7),
            height: perfectSize(7),
            marginLeft: index > 0 ? perfectSize(10) : 0,
          }}
        />
      ))}
    </View>
  );
};

export default PageControl;
