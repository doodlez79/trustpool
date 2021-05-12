import React, { FC, useCallback } from 'react';

import { View } from 'react-native';

import { Typography } from 'components/Typography';

import { useTheme } from 'helpers/ThemeManage';

import { styles } from './styles';
import { Props } from './SelectedItemRadioType.types';

const SelectedItemRadioType:FC<Props> = ({
  style,
  text, Icon,
  active,
}) => {
  const { colors } = useTheme();

  const renderStyles = useCallback(() => {
    let result = {
      ...styles.selectedItem,
      ...style,
      backgroundColor: colors.backgroundSelectedItem,
    };
    if (active) {
      result = {
        ...result,
        ...styles.active,
      };
    }

    return result;
  }, [ active, colors ]);
  return (

    <View style={ renderStyles() }>
      <Typography text={ text } bold fontSize={ 14 } color={ colors.text as string } />
      {
        typeof Icon === 'string'
          ? <Typography text={ Icon } fontSize={ 14 } />
          : Icon
      }
    </View>
  );
};

export default SelectedItemRadioType;
