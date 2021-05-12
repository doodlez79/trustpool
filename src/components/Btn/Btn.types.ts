import React from 'react';
import { TouchableHighlightProps, ViewStyle } from 'react-native';

export type Props ={
  Icon?: React.ReactNode
  title?: string
  onClick?: ()=> void
  disabled?: boolean
  style?: ViewStyle

  props?: TouchableHighlightProps

  loading?: boolean

  size?: SizeBtn
  textColor? : string
}

export enum SizeBtn {
  MEDIUM = 'MEDIUM',
  SMALL = 'SMALL',
}
