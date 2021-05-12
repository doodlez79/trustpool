import React from 'react';
import { Animated, TouchableOpacity } from 'react-native';

import Move from 'Icons/Move.svg';
import { useTheme } from 'helpers/ThemeManage';
import { mainColors } from 'constants/colors';
import { styles } from './styles';

const RightSwipeWorkerItem:React.FC = ({
  dragX, moveToClick, setWorkerIdForMoving,
}) => {
  const scale = dragX.interpolate({
    inputRange: [ -100, 0 ],
    outputRange: [ 1, 0 ],
    extrapolate: 'clamp',
  });

  const { colors } = useTheme();

  return (
    <TouchableOpacity
      style={{ ...styles.rightAction, backgroundColor: colors.backgroundSelectedItem }}
      onPress={ () => { setWorkerIdForMoving(); moveToClick(); } }
    >
      <Animated.View style={{ transform: [{ translateX: scale }], height: 14, width: 20 }}>
        <Move fill={ mainColors.blue } />

      </Animated.View>

    </TouchableOpacity>

  );
};

export default RightSwipeWorkerItem;
