import React, { FC } from 'react';

import { View, ViewStyle } from 'react-native';

import { perfectSize } from 'helpers/PerfectSize';

type Props = {
  paddingSize: number

  style?:ViewStyle
}

const Container:FC<Props> = ({ children, paddingSize, style }) => (
  <View
    style={{
      paddingHorizontal: perfectSize(paddingSize),
      ...style,
    }}
  >
    {
      children
    }
  </View>
);

export default Container;
