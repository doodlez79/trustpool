import React from 'react';

import { View } from 'react-native';
import { useTheme } from 'helpers/ThemeManage';
import { Typography } from '../Typography';

import { TabItemChartProps } from './TabItemChart.types';

import { styles } from './styles';

const TabItemChart: React.FC<TabItemChartProps> = ({
  text,
  active,
}) => {
  const { colors } = useTheme();

  return (
    <View
      style={ [ active && styles.activeTab, { paddingBottom: 10 }] }
    >
      <Typography
        bold
        fontSize={ 14 }
        text={ text }
        color={ active ? colors.text : colors.secondaryText }
      />

    </View>

  );
};

export default TabItemChart;
