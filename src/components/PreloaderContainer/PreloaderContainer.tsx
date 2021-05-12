import React, { FC } from 'react';

import { View, ViewStyle } from 'react-native';

import { perfectSize } from 'helpers/PerfectSize';
import { useTheme } from 'helpers/ThemeManage';
import { styles } from './styles';

type props = {
  containerStyle?: ViewStyle
}
const PreloaderContainer:FC<props> = ({ children, containerStyle }) => {
  const { colors } = useTheme();
  return (
    <View style={ styles.container }>
      <View style={{
        flexDirection: 'row',
        justifyContent: 'space-around',
        backgroundColor: colors.backgroundSelectedItem,
        padding: perfectSize(31),
        borderRadius: 30,
        ...containerStyle,
      }}
      >
        {
          children
        }
      </View>
    </View>
  );
};

export default PreloaderContainer;
