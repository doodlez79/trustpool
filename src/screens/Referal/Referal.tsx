import React, {
  useCallback, useEffect, useState,
} from 'react';

import {
  Dimensions, View,
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { useFocusEffect } from '@react-navigation/native';
import { StackScreenProps } from '@react-navigation/stack';

import { Actions, Selectors } from 'ducks';
import { MainStackParamList } from 'navigation/Navigation.types';
import { TabView } from 'react-native-tab-view';
import { CustomTabsReferals } from 'components/CustomTabsReferals/CustomTabsReferals';

import { ReferalsContent } from 'components/ReferalsContent';
import NavigationBack from 'components/NavigationBack/NavigationBack';
import NavigationRightBtn from 'components/NavigationRightBtn/NavigationRightBtn';
import { ModalComponent } from 'components/Modal';
import { ReferalModalContent } from 'components/ReferalModalContent';
import { iconsByCoin } from 'constants/iconByCoin';

import { ReferalsInfoBlock } from 'components/ReferalsInfoBlock';
import { ReferralRulesBlock } from 'components/ReferralRulesBlock';
import { Container } from 'components/Container';
import { SelectorList } from 'components/SelectorList';
import { CoinModalSelected } from 'components/CoinModalSelected';
import { COIN_TYPE } from 'entitiesState/currency';
import { TYPE_REFERALS_CONTENT } from './types';

export interface ReferalProps extends StackScreenProps<MainStackParamList, 'Referals'>{}

const { width } = Dimensions.get('window');

const Referal:React.FC<ReferalProps> = ({ navigation, route }) => {
  const { t } = useTranslation();

  const [ index, setIndex ] = React.useState(0);

  const [ referalModal, setReferalModal ] = useState(false);

  const [ routes ] = useState([
    { key: 'myReferrals', title: t('screens.Referals.tabName.myReferrals') },
    { key: 'rewardList', title: t('screens.Referals.tabName.rewardList') },
  ]);

  const dispatch = useDispatch();

  const ReferalList = useSelector(Selectors.Referals.getReferalsList);
  const ReferalProfit = useSelector(Selectors.Referals.getReferalsProfit);
  const loading = useSelector(Selectors.Referals.isLoading);
  const CurrentUserInfo = useSelector(Selectors.Account.getAccountInfo);
  const metaProfit = useSelector(Selectors.Referals.getProfitListMeta);
  const coins = useSelector(Selectors.Currency.allCoins);
  const coin = useSelector(Selectors.Currency.currentCoin);
  const loadingCoinChange = useSelector(Selectors.Currency.isLoading);

  const [ coinModal, setCoinModal ] = useState(false);
  const [ firstVisit, setFirstVisit ] = useState(false);

  const openModalCoin = useCallback(() => {
    setCoinModal(true);
  }, []);

  const closeModalCoin = useCallback(() => {
    setCoinModal(false);
  }, []);

  const openReferalModal = useCallback(() => {
    setReferalModal(true);
  }, []);

  const closeReferalModal = useCallback(() => {
    setReferalModal(false);
  }, []);

  const updateReferalsList = useCallback(() => {
    dispatch(Actions.Referals.getReferalsList.request(coin, {
      resolve: () => {
        if (!firstVisit) {
          setFirstVisit(true);
        }
      },
    }));
  }, []);

  const updateReferalsProfit = useCallback((countPage = 1, replace = true) => {
    dispatch(Actions.Referals.getReferalsProfit.request({ coin, countPage, replace }, {
      resolve: () => {
        if (!firstVisit) {
          setFirstVisit(true);
        }
      },
    }));
  }, []);

  useFocusEffect(updateReferalsList);
  useFocusEffect(updateReferalsProfit);

  const selectCoin = (coin: COIN_TYPE, countPage = 1, replace = true) => {
    dispatch(Actions.Currency.postChangeCoin.request(coin, { resolve: closeModalCoin }));
    dispatch(Actions.General.getGeneralInfo.request(coin));
    dispatch(Actions.Referals.getReferalsList.request(coin, {
      resolve: () => {
        if (!firstVisit) {
          setFirstVisit(true);
        }
      },
    }));
    dispatch(Actions.Referals.getReferalsProfit.request({ coin, countPage, replace }, {
      resolve: () => {
        if (!firstVisit) {
          setFirstVisit(true);
        }
      },
    }));
  };

  useEffect(() => {
    navigation.setOptions({
      headerLeft: ({ onPress }) => (
        <NavigationBack
          onClick={ onPress }
          text={ route.params && route.params.leftTitle
            ? t(`screens.Settings.tabName.${route.params.leftTitle}`) : '' as string }
        />
      ),
      headerRight: () => (ReferalList.length > 0 ? <NavigationRightBtn onClick={ openReferalModal } /> : <></>),
    });
  }, [ ReferalList ]);

  const loadingStatus = loading && ReferalList.length === 0 && !firstVisit;

  const renderScene = ({ route }) => {
    switch (route.key) {
      case 'myReferrals':
        return (
          <ReferalsContent
            data={ ReferalList }
            loading={ loadingStatus }
            type={ TYPE_REFERALS_CONTENT.REFERALS_LIST }
            updateData={ updateReferalsList }
            userId={ CurrentUserInfo.id }
          />
        );
      case 'rewardList':
        return (
          <ReferalsContent
            data={ ReferalProfit }
            loading={ loadingStatus }
            type={ TYPE_REFERALS_CONTENT.REWARD_LIST }
            updateData={ updateReferalsProfit }
            userId={ CurrentUserInfo.id }
            meta={ metaProfit }
            onClick={ openModalCoin }
            coin={ coin }
          />
        );
      default:
        return null;
    }
  };

  return (
    <>
      {ReferalList!.length !== 0 ? (
        <TabView<{key: string, title: string}>
          lazy
          renderTabBar={ props => (
            <CustomTabsReferals
              { ...props }
              openReferalModal={ openReferalModal }
              referalModal={ referalModal }
              coinModal={ coinModal }
              openModalCoin={ openModalCoin }
              coin={ coin }
              dontShowCoin={ Boolean(ReferalProfit.length === 0 && routes[index].key === 'rewardList') }
            />
          ) }
          navigationState={{ index, routes }}
          renderScene={ renderScene }
          onIndexChange={ setIndex }
          initialLayout={{ width }}
        />
      ) : (
        <Container paddingSize={ 16 }>
          <View
            style={{
              alignItems: 'center',
              marginTop: 20,
            }}
          >
            <SelectorList
              icon={ iconsByCoin[coin] }
              onClick={ openModalCoin }
              active={ coinModal }
              coin={ coin }
            />
          </View>
          <ReferalsInfoBlock
            loading={ loading }
            onRefresh={ () => {} }
            userId={ CurrentUserInfo.id }
          />
          <View>
            <ReferralRulesBlock />
          </View>
        </Container>
      )}
      <ModalComponent
        modalVisible={ coinModal }
        setModalVisible={ closeModalCoin }
      >
        <CoinModalSelected
          loading={ loadingCoinChange }
          currentCoin={ coin }
          onSelectCoin={ selectCoin }
          coins={ coins }
        />
      </ModalComponent>
      <ModalComponent modalVisible={ referalModal } setModalVisible={ closeReferalModal }>
        <ReferalModalContent
          userId={ CurrentUserInfo.id }
        />
      </ModalComponent>
    </>
  );
};
export default Referal;
