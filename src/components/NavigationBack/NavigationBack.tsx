import React, { FC } from 'react';

import { TouchableOpacity, View } from 'react-native';

import { Typography } from 'components/Typography';
import Back from 'Icons/Back.svg';
import { mainColors } from 'constants/colors';
import { styles } from './styles';

type Props = {
  text: string,
  onClick: (() => void) | undefined
}

const NavigationBack:FC<Props> = ({ text, onClick }) => (
  <TouchableOpacity
    onPress={ onClick }
    style={ styles.container }
  >
    <View style={ styles.icon }>
      <Back fill={ mainColors.blue } />
    </View>

    <Typography
      text={ text }
      color={ mainColors.blue }
      fontSize={ 14 }
    />
  </TouchableOpacity>
);

export default NavigationBack;
