import React, { FC, useEffect, useRef } from 'react';

import {
  View, Animated, ViewStyle,
} from 'react-native';

import { useTheme } from 'helpers/ThemeManage';
import { perfectSize } from 'helpers/PerfectSize';
import { styles } from './styles';

type PreloaderProps = {
  heightContainer: number
  stickStyle?: ViewStyle
}

const Preloader:FC<PreloaderProps> = ({ heightContainer = 48, stickStyle = {} }) => {
  const { colors } = useTheme();
  const fadeAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.loop(Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 1000,
      useNativeDriver: true,
    })).start(() => Animated.timing(fadeAnim, {
      toValue: 0,
      duration: 1000,
      useNativeDriver: true,
    }).start());
  }, [ fadeAnim ]);

  const height = fadeAnim.interpolate({
    inputRange: [ 0, 0.5, 1 ],
    outputRange: [ perfectSize(heightContainer) / 2, 0, perfectSize(heightContainer) / 2 ],
  });

  const anotherHeight = fadeAnim.interpolate({
    inputRange: [ 0, 0.5, 1 ],
    outputRange: [ 0, perfectSize(heightContainer) / 2, 0 ],
  });

  return (

    <View
      style={{
        height: perfectSize(heightContainer),
        width: perfectSize(heightContainer),
        paddingHorizontal: perfectSize(heightContainer / 4),
        ...styles.container,
      }}
    >
      <View
        style={{
          height: perfectSize(heightContainer),
          width: perfectSize(heightContainer / 6),
          borderRadius: perfectSize(4),
          overflow: 'hidden',
        }}
      >
        <Animated.View
          style={{
            height: perfectSize(heightContainer),
            width: perfectSize(heightContainer / 6),
            backgroundColor: colors.secondaryText,
            transform: [
              {
                translateY: anotherHeight,
              },
            ],
            ...styles.stick,
            ...stickStyle,
          }}
        />
      </View>
      <View
        style={{
          height: perfectSize(heightContainer),
          width: perfectSize(heightContainer / 6),
          borderRadius: perfectSize(4),
          overflow: 'hidden',
        }}
      >
        <Animated.View
          style={{
            height: perfectSize(heightContainer),
            width: perfectSize(heightContainer / 6),
            backgroundColor: colors.secondaryText,
            transform: [
              {
                translateY: height,
              },
            ],
            ...styles.stick,
            ...stickStyle,
          }}
        />
      </View>
    </View>

  );
};

export default Preloader;
