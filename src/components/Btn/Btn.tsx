import React, { FC } from 'react';
import {
  TouchableHighlight, View,
} from 'react-native';

import { lightThemeColors, mainColors } from 'constants/colors';
import Preloader from 'components/Preloader/Preloader';
import { styles } from './styles';
import { Props, SizeBtn } from './Btn.types';
import { Typography } from '../Typography';

const Btn:FC<Props> = ({
  Icon,
  title,
  onClick,
  disabled = false,
  style,
  props,
  loading = false,
  size,
  textColor,
}) => {
  const getClasses = () => {
    let result = {};
    if (size === SizeBtn.SMALL) {
      result = {
        ...result,
        ...styles.btnSizeSmall,
      };
    }

    if (size === SizeBtn.MEDIUM) {
      result = {
        ...result,
        ...styles.btnSizeMedium,
      };
    }
    if (disabled) {
      result = {
        ...result,
        backgroundColor: lightThemeColors.grey,
      };
    }

    return {
      ...styles.btn,
      ...result,
      ...style,
    };
  };

  return (
    <TouchableHighlight
      onPress={ onClick }
      disabled={ disabled }
      { ...props }
      style={ getClasses() }
    >
      {loading ? (
        <Preloader heightContainer={ 22 } stickStyle={{ backgroundColor: mainColors.white }} />
      ) : (
        <>
          <Typography style={{ width: '100%' }} color={ textColor || mainColors.white } bold text={ title } />
          {Icon && <View style={ styles.icon }>{Icon}</View>}
        </>
      )}
    </TouchableHighlight>
  );
};

export default Btn;
