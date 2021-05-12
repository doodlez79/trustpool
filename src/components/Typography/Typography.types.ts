import { TextProps, TextStyle } from 'react-native';

export type TYPE_ALIGN_TEXT = 'center' | 'left' | 'right';

export const alignTextConfig: { [x: string]: TYPE_ALIGN_TEXT } = {
  CENTER: 'center',
  LEFT: 'left',
  RIGHT: 'right',
};

export interface TypographyProps {
  text?: string;
  style?: TextStyle;
  bold?: boolean;
  selectable?: boolean;
  onPress?: () => void;
  align?:
    | typeof alignTextConfig.CENTER
    | typeof alignTextConfig.RIGHT
    | typeof alignTextConfig.LEFT;
  color?: string;
  fontSize?: number;
  props?: TextProps;
  numberOfLines?: number;
  ellipsizeMode?: 'head' | 'middle' | 'tail' | 'clip'
  width?: number
}
