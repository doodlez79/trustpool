import React, {
  FC, useEffect, useRef, useState,
} from 'react';

import {
  View, Animated, TouchableOpacity,
} from 'react-native';

import { perfectSize } from 'helpers/PerfectSize';
import { lightThemeColors, mainColors } from 'constants/colors';

type Props = {
  value: boolean
  onSwitch: () => void
}
const Switch:FC<Props> = ({ value, onSwitch }) => {
  const switchAnim = useRef(new Animated.Value(!value ? 1 : 0)).current;
  const [ statusSwitch, setStatusSwitch ] = useState(!value);

  useEffect(() => {
    Animated.timing(switchAnim, {
      toValue: !value ? 1 : 0,
      duration: 200,
      useNativeDriver: true,
    }).start(() => setStatusSwitch(!value));
  }, [ value ]);

  const bgSwitch = switchAnim.interpolate({
    inputRange: [ 0, 1 ],
    outputRange: [ perfectSize(2), perfectSize(49 - 27) ],
  });
  return (
    <TouchableOpacity onPress={ onSwitch } activeOpacity={ 0.9 }>
      <View style={{
        width: perfectSize(51),
        height: perfectSize(31),
        backgroundColor: !statusSwitch ? mainColors.blue : lightThemeColors.grey,
        borderRadius: perfectSize(51),
        justifyContent: 'center',
        transform: [{
          rotate: '180deg',
        }],
      }}
      >
        <Animated.View style={{
          height: perfectSize(27),
          width: perfectSize(27),
          borderRadius: perfectSize(27),
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: mainColors.white,
          borderColor: !statusSwitch ? '#3162F5' : '#677078',
          transform: [{
            translateX: bgSwitch,
          }],
        }}
        />

      </View>
    </TouchableOpacity>
  );
};

export default Switch;
