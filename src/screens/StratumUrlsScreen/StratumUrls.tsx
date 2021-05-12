import React, { useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Actions, Selectors } from 'ducks';

import { WorkersInfoBlock } from 'components/WorkersInfoBlock';
import { ModalComponent } from 'components/Modal';
import { CoinModalSelected } from 'components/CoinModalSelected';
import { SelectorList } from 'components/SelectorList';
import { iconsByCoin } from 'constants/iconByCoin';
import { COIN_TYPE } from 'entitiesState/currency';
import { View } from 'react-native';

const StratumUrls:React.FC = () => {
  const dispatch = useDispatch();

  const coin = useSelector(Selectors.Currency.currentCoin);
  const loading = useSelector(Selectors.Currency.isLoading);
  const stratumInfo = useSelector(Selectors.General.getGeneralStratumInfo);
  const allCoins = useSelector(Selectors.Currency.allCoins);

  useEffect(() => {
    dispatch(Actions.General.getGeneralInfo.request(coin));
  }, [ dispatch, coin ]);

  const [ coinModal, setCoinModal ] = useState(false);

  const openModalCoin = useCallback(() => {
    setCoinModal(true);
  }, []);
  const closeModalCoin = useCallback(() => {
    setCoinModal(false);
  }, []);

  const selectCoin = (coin: COIN_TYPE) => {
    dispatch(Actions.Currency.postChangeCoin.request(coin, {
      resolve: () => {
      },
    }));
  };

  return (
    <View
      style={{ flex: 1, alignItems: 'center' }}
    >
      <View
        style={{ marginVertical: 20 }}
      >
        <SelectorList
          icon={ iconsByCoin[coin] }
          onClick={ openModalCoin }
          active={ coinModal }
          coin={ coin }
        />
      </View>

      <WorkersInfoBlock stratumInfo={ stratumInfo } coin={ coin } />

      <ModalComponent modalVisible={ coinModal } setModalVisible={ closeModalCoin }>
        <CoinModalSelected
          loading={ loading }
          currentCoin={ coin }
          onSelectCoin={ selectCoin }
          coins={ allCoins }
        />
      </ModalComponent>
    </View>
  );
};

export default StratumUrls;
