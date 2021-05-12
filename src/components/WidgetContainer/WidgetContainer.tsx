import React from 'react';
import { View } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';

import { perfectSize } from 'helpers/PerfectSize';
import { useTheme } from 'helpers/ThemeManage';
import Chevron from 'Icons/Chevron.svg';

import { Typography } from '../Typography';

import { WidgetContainerProps } from './WidgetContainer.types';

import { styles } from './styles';

const WidgetContainer: React.FC<WidgetContainerProps> = ({
  children,
  onClick,
  label,
}) => {
  const { colors } = useTheme();
  return (
    <TouchableOpacity
      style={ [ styles.container, { backgroundColor: colors.backgroundSelectedItem }] }
      onPress={ onClick }
    >
      <Typography
        bold
        text={ label }
        align="center"
        fontSize={ 14 }
        color={ colors.text }
        style={{ width: '100%', marginVertical: perfectSize(11) }}
      />
      <View style={ styles.mainBox }>
        {children}
      </View>
      <View style={ styles.icon }>
        <Chevron fill={ colors.secondaryText } />
      </View>
    </TouchableOpacity>
  );
};

export default WidgetContainer;
