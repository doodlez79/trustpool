import React from 'react';
import { ViewStyle } from 'react-native';

export interface SelectorListProps{
  onClick: ()=>void

  active?: boolean
  amount?: number | string
  coin?: string
  icon?: React.ReactNode
  username?: string
  styleContainer?:ViewStyle
}
