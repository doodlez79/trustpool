import React, { FC } from 'react';

import { View, TouchableOpacity } from 'react-native';

import { useTheme } from 'helpers/ThemeManage';
import { Typography } from 'components/Typography';
import { mainColors } from 'constants/colors';
import Chevron from 'Icons/Chevron.svg';
import { perfectSize } from 'helpers/PerfectSize';
import { COIN_TYPE } from 'entitiesState/currency';
import { styles } from './styles';

type CoinModalSelectProps = {
  icon: React.ReactNode
  active: boolean
  item: COIN_TYPE
  onSelect: (value: COIN_TYPE) => void
}

const CoinModalSelect:FC<CoinModalSelectProps> = ({
  active, item, onSelect, icon,
}) => {
  const { colors } = useTheme();
  return (
    <TouchableOpacity
      onPress={ () => onSelect(item) }
      style={{ ...styles.container, borderBottomColor: colors.backgroundSelectedItem }}
    >
      <View style={{
        flexDirection: 'row',
        alignItems: 'center',
      }}
      >
        <View style={{
          width: perfectSize(24),
          height: perfectSize(24),
          marginRight: perfectSize(10),
        }}
        >
          {icon}
        </View>
        <Typography
          text={ item }
          bold
          fontSize={ 16 }
          color={ active ? mainColors.blue : colors.text }
        />
      </View>

      <View style={ styles.icon }>
        <Chevron fill={ colors.secondaryText } />
      </View>

    </TouchableOpacity>
  );
};

export default CoinModalSelect;
