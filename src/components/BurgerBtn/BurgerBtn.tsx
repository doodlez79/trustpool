import React, { FC } from 'react';

import { View, TouchableOpacity } from 'react-native';

import Menu from 'Icons/BottomTabBar/Menu.svg';
import { mainColors } from 'constants/colors';
import { styles } from './styles';

const BurgerBtn:FC<{onPress: () => void}> = ({ onPress }) => (
  <TouchableOpacity
    onPress={ onPress }
    style={ styles.container }
  >
    <Menu fill={ mainColors.blue } />
    <View />
  </TouchableOpacity>
);

export default BurgerBtn;
