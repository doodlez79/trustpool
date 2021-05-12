import React, { FC } from 'react';

import {
  View, FlatList,
} from 'react-native';

import { ModalHeader } from 'components/ModalHeader';
import { perfectSize } from 'helpers/PerfectSize';
import { useTranslation } from 'react-i18next';
import { iconsByCoin } from 'constants/iconByCoin';
import { CoinModalSelect } from 'components/CoinModalSelect';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { COIN_TYPE } from 'entitiesState/currency';
import { styles } from './styles';

type CoinModalSelectedProps ={
  onSelectCoin: (coin: COIN_TYPE) => void
  coins: COIN_TYPE[]
  currentCoin: COIN_TYPE
  loading: boolean
}

const CoinModalSelected:FC<CoinModalSelectedProps> = ({
  coins, onSelectCoin, currentCoin, loading,
}) => {
  const { t } = useTranslation();
  const insets = useSafeAreaInsets();
  return (
    <View style={ styles.container }>
      <ModalHeader
        loading={ loading }
        title={ t('screens.Home.coinModalTitle') }
      />
      <FlatList
        contentContainerStyle={{
          paddingHorizontal: perfectSize(16),
          paddingBottom: insets.bottom + 10,
        }}
        keyExtractor={ item => item }
        data={ coins }
        renderItem={ ({ item }) => (
          <CoinModalSelect
            icon={ iconsByCoin[item] }
            active={ item === currentCoin }
            item={ item }
            onSelect={ onSelectCoin }
          />
        ) }
      />

    </View>
  );
};

export default CoinModalSelected;
