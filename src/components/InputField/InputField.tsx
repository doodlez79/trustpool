import React, {
  FC, useCallback, useState,
} from 'react';
import {
  View, TextInput, TouchableOpacity, Keyboard,
} from 'react-native';

import { mainColors } from 'constants/colors';
import { useTheme } from 'helpers/ThemeManage/ThemeManage';
import { perfectSize } from 'helpers/PerfectSize';
import { Typography } from '../Typography';
import { InputFieldProps } from './InputField.types';
import { styles } from './styles';

const InputField: FC<InputFieldProps> = ({
  value,
  error,
  onChange,
  disable,
  onClick,
  label = '',
  status,
  placeholder,
  autoCompleteType = 'off',
  inputProps = { secureTextEntry: false },
  styleContainer,
  Icon,
  LeftIcon,
  inputStyle,
  postFix,
  inputContainerStyle,
  onClickIcon,
  Loading,
}) => {
  const [ editFlag, setEditFlag ] = useState(false);

  const [ showPassword, setShowPassword ] = useState(inputProps?.secureTextEntry);

  const { colors } = useTheme();

  const getInputStyle = useCallback(() => {
    let result = {
      ...styles.input,
      borderColor: colors.backgroundColor,
      backgroundColor: colors.backgroundSelectedItem,
    };

    if (editFlag) {
      result = {
        ...result,
        borderColor: mainColors.blue,
      };
    }

    if (value?.length && !editFlag) {
      result = {
        ...result,
        borderColor: mainColors.green,
      };
    }

    if (status === 'warning') {
      result = {
        ...result,
        borderColor: '#FFBA00',
      };
    }
    if (error) {
      result = {
        ...result,
        borderColor: mainColors.red,
      };
    }
    return result;
  }, [ value, error, colors ]);

  const onPressIcon = useCallback(() => {
    if (inputProps?.secureTextEntry) {
      setShowPassword(s => !s);
      return;
    }
    if (onChange && !onClickIcon) {
      onChange('');
      setEditFlag(false);
    }
    if (onClickIcon) {
      onClickIcon();
    }
  }, []);

  const newInputProps = {
    ...inputProps,
    secureTextEntry: showPassword,
  };

  return (

    <TouchableOpacity
      style={{ ...styleContainer }}
      onPress={ onClick }
    >
      {
        Boolean(label) && (
          <Typography
            text={ label }
            color={ colors.text }
            fontSize={ 14 }
            align="left"
            style={ styles.label }
          />
        )
      }
      <View
        pointerEvents={ onClick ? 'none' : 'auto' }
        style={{ ...styles.container, ...getInputStyle(), ...inputContainerStyle }}
      >
        {
            Icon && Boolean(value) && (
              <TouchableOpacity
                style={ styles.icon }
                onPress={ onPressIcon }
              >
                {
                  Icon(Boolean(showPassword))
                }
              </TouchableOpacity>
            )
          }
        { LeftIcon
              && (
              <View style={ styles.leftIcon }>
                {LeftIcon()}
              </View>
              )}
        { Loading
        && (
        <View style={ styles.icon }>
          {Loading()}
        </View>
        )}
        <TextInput
          onStartShouldSetResponder={ () => true }
          style={{
            ...styles.text,
            paddingLeft: LeftIcon ? 13 : 16,
            fontSize: LeftIcon ? 14 : 16,
            paddingBottom: LeftIcon ? 0 : 18,
            paddingTop: LeftIcon ? 0 : 16,
            color: colors.text,
            ...inputStyle,
          }}
          editable={ !disable }
          onSubmitEditing={ Keyboard.dismiss }
          onFocus={ () => setEditFlag(true) }
          onBlur={ () => setEditFlag(false) }
          autoFocus={ editFlag }
          autoCompleteType={ autoCompleteType }
          placeholderTextColor={ colors.secondaryText }
          placeholder={ placeholder }
          onChangeText={ onChange }
          value={ value || '' }
          secureTextEntry={ showPassword }
          { ...newInputProps }
        />
        {
          postFix
        }

      </View>
      {
        typeof error === 'string' && (
          <Typography
            style={{ width: '100%', position: 'absolute', bottom: perfectSize(-17) }}
            text={ error }
            color={ mainColors.red }
            fontSize={ 12.8 }
            align="left"
          />
        )
      }

    </TouchableOpacity>
  );
};

export default InputField;
