import { ReactNode } from 'react';
import { ViewStyle } from 'react-native';

export type Props = {
  text: string,
  active: boolean

  Icon?: ReactNode | string
  style?: ViewStyle
}
