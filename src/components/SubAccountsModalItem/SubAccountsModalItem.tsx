import React, { FC } from 'react';

import { View, TouchableOpacity } from 'react-native';

import { Typography } from 'components/Typography';
import { mainColors } from 'constants/colors';
import Chevron from 'Icons/Chevron.svg';
import { useTheme } from 'helpers/ThemeManage';

import { SubAccountsModalItemProps } from './SubAccountsModalItem.types';
import { styles } from './styles';

const SubAccountsModalItem:FC<SubAccountsModalItemProps> = ({
  item, onSelect, active,
}) => {
  const { colors } = useTheme();
  return (
    <TouchableOpacity
      onPress={ () => onSelect(item.id) }
      style={{ ...styles.container, borderBottomColor: colors.backgroundSelectedItem }}
    >
      <View style={{
        flexDirection: 'row',
        alignItems: 'center',
      }}
      >
        <Typography
          text={ item.account }
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

export default SubAccountsModalItem;
