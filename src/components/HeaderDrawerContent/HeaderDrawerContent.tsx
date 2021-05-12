import React, { FC } from 'react';

import { View, TouchableOpacity } from 'react-native';
import Close from 'Icons/Close.svg';

import { mainColors } from 'constants/colors';
import { SelectorList } from 'components/SelectorList';
import { iconsByCoin } from 'constants/iconByCoin';
import { perfectSize } from 'helpers/PerfectSize';
import { styles } from './styles';
import { HeaderDrawerContentProps } from './types';

const HeaderDrawerContent:FC<HeaderDrawerContentProps> = ({
  onClose, activeAccountModal, userName, openUserModal, openCoinModal, coin, activeCoinModal,
}) => (
  <View style={{
    marginBottom: perfectSize(40),
  }}
  >
    <TouchableOpacity
      onPress={ onClose }
      style={ styles.btn }
    >
      <View style={{
        width: perfectSize(18),
        height: perfectSize(18),
      }}
      >
        <Close fill={ mainColors.blue } />
      </View>

    </TouchableOpacity>
    <View style={{
      flexDirection: 'row',
      justifyContent: 'space-between',
    }}
    >
      <SelectorList
        icon={ iconsByCoin[coin] }
        onClick={ openCoinModal }
        active={ activeCoinModal }
        coin={ coin }
      />
      <SelectorList onClick={ openUserModal } active={ activeAccountModal } username={ userName } />
    </View>
  </View>
);

export default HeaderDrawerContent;
