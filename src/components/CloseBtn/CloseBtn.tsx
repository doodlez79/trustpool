import React, { FC } from 'react';

import { ViewStyle, TouchableOpacity } from 'react-native';
import Close from 'Icons/Close.svg';
import { mainColors } from 'constants/colors';

const CloseBtn: FC<{onClick: () => void, styles: ViewStyle}> = ({ onClick, styles }) => (
  <TouchableOpacity onPress={ onClick } style={ styles }>
    <Close fill={ mainColors.blue } />
  </TouchableOpacity>
);

export default CloseBtn;
