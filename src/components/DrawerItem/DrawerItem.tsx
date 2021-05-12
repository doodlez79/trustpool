import React, { FC } from 'react';

import { View, TouchableOpacity, Dimensions } from 'react-native';

import Chevron from 'Icons/Chevron.svg';
import Check from 'Icons/Check.svg';

import { Typography } from 'components/Typography';
import { useTheme } from 'helpers/ThemeManage';
import { Preloader } from 'components/Preloader';
import { mainColors } from 'constants/colors';
import { styles } from './styles';

type DrawerItemProps = {
  title: string,
  onPress: () => void

  icon?: ()=>React.ReactNode
  loading?: boolean
  active?: boolean
  withOutChevron? :boolean
}

const { width } = Dimensions.get('window');

const DrawerItem:FC<DrawerItemProps> = ({
  onPress, title, icon, loading, active = false, withOutChevron,
}) => {
  const { colors } = useTheme();

  return (
    <TouchableOpacity
      onPress={ onPress }
      style={{ ...styles.container, borderBottomColor: colors.backgroundSelectedItem }}
    >
      <View style={{
        flexDirection: 'row',
        alignItems: 'center',

      }}
      >
        {
          icon && (
            <View style={{
              marginRight: 16,
              width: 20,
              height: 16,

            }}
            >
              { icon()}
            </View>
          )
        }

        <Typography
          align="left"
          style={{ flexWrap: 'wrap', maxWidth: width - 80 }}
          text={ title }
          bold
          fontSize={ 16 }
          color={ active ? mainColors.blue : colors.text }
        />
      </View>
      {withOutChevron ? (
        <View style={{
          width: 10,
          height: 10,
        }}
        >
          {active && <Check fill={ mainColors.green } />}
        </View>

      ) : (

        <View style={{
          width: 10,
          height: 10,
          transform: [{
            rotate: loading ? '0deg' : '-90deg',
          }],
        }}
        >
          {
    loading
      ? <Preloader heightContainer={ 16 } stickStyle={{ backgroundColor: mainColors.blue }} />
      : <Chevron fill={ colors.secondaryText } />
  }

        </View>
      )}

    </TouchableOpacity>
  );
};

export default DrawerItem;
