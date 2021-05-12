import React, { FC } from 'react';
import { TouchableOpacity } from 'react-native';
import InfoIcon from 'Icons/Info.svg';
import { mainColors } from 'constants/colors';
import { styles } from './styles';
import { NavigationRightProps } from './NavifationRightBtn.types';

const NavigationRightBtn: FC<NavigationRightProps> = ({
  onClick,
}) => (
  <TouchableOpacity
    style={ styles.btn }
    onPress={ onClick }
  >
    <InfoIcon fill={ mainColors.blue } />
  </TouchableOpacity>
);

export default NavigationRightBtn;
