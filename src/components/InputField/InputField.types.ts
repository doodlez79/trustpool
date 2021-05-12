import { TextInputProps, TextStyle, ViewStyle } from 'react-native';
import React from 'react';

export interface InputFieldProps {

  onChange: (e: string) => void;
  value: string;

  error?: string | number;
  autoCompleteType?: TextInputProps['autoCompleteType'];
  withOutIcon?: boolean;
  status?: string;
  placeholder?: string;
  editFlagProps?: boolean;
  disableEdit?: boolean;

  onClick?: () => void;
  setError?: () => void;
  onClickIcon?: () => void;
  label?: string;
  disable?: boolean
  inputProps?: TextInputProps
  style?: ViewStyle
  styleContainer?: ViewStyle
  inputContainerStyle?: ViewStyle
  inputStyle?: TextStyle
  Icon?: (passwordShow: boolean) => React.ReactNode
  LeftIcon?: () => React.ReactNode
  Loading?: () => React.ReactNode
  postFix?: React.ReactNode
}
