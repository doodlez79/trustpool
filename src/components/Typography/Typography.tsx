import React, { FC } from 'react';
import { Dimensions, Text } from 'react-native';

import { RFValue } from 'helpers/FontSizePerfect';
import { lightThemeColors } from 'constants/colors';
import { alignTextConfig, TypographyProps } from './Typography.types';

import { styles } from './styles';

const { height } = Dimensions.get('window');

const Typography: FC<TypographyProps> = ({
  text,
  fontSize = 16,
  color = lightThemeColors.text,
  style,
  bold = false,
  align = alignTextConfig.CENTER,
  props,
  onPress,
  width,
  numberOfLines,
  selectable = false,
  ellipsizeMode,
}) => {
  const getStyles = () => {
    let result = {};
    if (fontSize) {
      result = {
        ...result,
        fontSize: RFValue(fontSize, height),
      };
    }
    if (bold) {
      result = {
        ...result,
        fontFamily: 'OpenSans-Bold',
      };
    }
    if (align) {
      result = {
        ...result,
        textAlign: align,
      };
    }
    if (color) {
      result = {
        ...result,
        color,
      };
    }
    if (width) {
      result = {
        ...result,
        width,
      };
    }

    return {
      ...styles.title,
      ...result,
      ...style,
    };
  };

  return (
    <Text
      selectable={ selectable }
      { ...props }
      numberOfLines={ numberOfLines }
      ellipsizeMode={ ellipsizeMode }
      onPress={ onPress }
      style={ getStyles() }
    >
      {text}
    </Text>
  );
};

export default Typography;
