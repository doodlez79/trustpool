import React from 'react';

import { View } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';

import { mainColors } from 'constants/colors';
import { useTheme } from 'helpers/ThemeManage';
import Chevron from 'Icons/Chevron.svg';
import { Typography } from '../Typography';

import { SelectorListProps } from './SelectorList.types';

import { styles } from './styles';

const SelectorList: React.FC <SelectorListProps> = ({
  onClick,
  icon,
  amount,
  username,
  coin,
  active,
  styleContainer,
}) => {
  const { colors } = useTheme();
  return (
    <TouchableOpacity
      activeOpacity={ 0.9 }
      onPress={ onClick }
      style={ [ styles.mainBox,
        { backgroundColor: colors.backgroundSelectedItem }, { ...styleContainer }] }
    >
      {icon
          && (
          <View
            style={ styles.iconBox }
          >
            {icon}
          </View>
          )}
      {Boolean(amount) && (
      <Typography
        bold
        fontSize={ 24 }
        color={ mainColors.blue }
        style={ styles.amount }
        text={ String(amount) }
      />
      )}
      {coin && (
      <Typography
        bold
        fontSize={ 16 }
        color={ colors.text }
        style={ styles.coin }
        text={ coin }

      />
      )}
      {Boolean(username) && (
      <Typography
        bold
        fontSize={ 16 }
        color={ colors.text }
        style={ styles.username }
        text={ username }
        ellipsizeMode="tail"
        numberOfLines={ 1 }
        width={ 80 }

      />
      )}
      {
        (Boolean(username) || Boolean(coin) || Boolean(amount) || Boolean(icon)) && (
          <View style={ [
            styles.iconChevron,
            active && styles.activeChevron ] }
          >
            <Chevron fill={ colors.secondaryText } />
          </View>
        )
      }

    </TouchableOpacity>
  );
};

export default SelectorList;

// home.msc.pavlov.a@gmail.com
// Diana2011!
