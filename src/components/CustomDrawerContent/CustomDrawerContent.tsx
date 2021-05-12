import { DrawerContentComponentProps } from '@react-navigation/drawer';
import React, { FC, useCallback, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { SafeAreaView } from 'react-native-safe-area-context';

import { HeaderDrawerContent } from 'components/HeaderDrawerContent';
import { Actions, Selectors } from 'ducks';
import { Container } from 'components/Container';
import { useTheme } from 'helpers/ThemeManage';
import { ModalComponent } from 'components/Modal';
import { SubAccountsModalContent } from 'components/SubAccountsModalContent';
import { CoinModalSelected } from 'components/CoinModalSelected';
import DrawerItem from 'components/DrawerItem/DrawerItem';
import { COIN_TYPE } from 'entitiesState/currency';
import { perfectSize } from 'helpers/PerfectSize';
import { TIME_CHART_TYPES } from 'entitiesState/general';
import { useFocusEffect } from '@react-navigation/core';
import { DrawerConfig } from './DrawerContent.config';

const CustomDrawerContent:FC<DrawerContentComponentProps> = ({ navigation }) => {
  const { t } = useTranslation();
  const isAuth = useSelector(Selectors.Auth.isAuthorized);
  const coin = useSelector(Selectors.Currency.currentCoin);
  const coins = useSelector(Selectors.Currency.allCoins);
  const [ errorCode, setErrorCode ] = useState(0);
  const { colors } = useTheme();
  const [ userModal, setUserModal ] = useState(false);
  const [ coinModal, setCoinModal ] = useState(false);
  const dispatch = useDispatch();
  const accountsList = useSelector(Selectors.Account.getVisibleAccounts);
  const userInfo = useSelector(Selectors.Account.getUserInfo);
  const loadingChangeSubAccount = useSelector(Selectors.Account.isLoading);
  const loadingCoinChange = useSelector(Selectors.Currency.isLoading);
  const currentChartTime = useSelector(Selectors.General.getCurrentChartTime);
  const sortConfig = useSelector(Selectors.Workers.getSortConfig);

  const refreshAllActions = useCallback((time: TIME_CHART_TYPES = currentChartTime, cb:() => void = () => {},

    curCoin: COIN_TYPE = coin, countPage = 1, page = 1, replace = true) => {
    dispatch(Actions.App.refresh60sec.request({
      time, curCoin, countPage, page, replace, sortConfig, isAuth,
    }, { resolve: cb, reject: cb }));
  }, [ currentChartTime, coin, isAuth ]);

  useFocusEffect(refreshAllActions);

  const onSelectSubAccounts = (id: number) => {
    dispatch(Actions.Account.putChangeSubAccount.request(id, {
      resolve: () => {
        setUserModal(false);
      },
    }));
  };
  const addSubAccounts = (name: string, cb: () => void) => {
    dispatch(Actions.Account.postSubAccount.request({ account: name },
      { resolve: () => cb(), reject: (code: number) => { setErrorCode(code); } }));
  };

  const selectCoin = (coin: COIN_TYPE) => {
    dispatch(Actions.Currency.postChangeCoin.request(coin, {
      resolve: () => {
        setUserModal(false);
      },
    }));
  };
  const openModal = useCallback(() => {
    setUserModal(true);
  }, []);
  const closeModal = useCallback(() => {
    setUserModal(false);
  }, []);
  const openModalCoin = useCallback(() => {
    setCoinModal(true);
  }, []);
  const closeModalCoin = useCallback(() => {
    setCoinModal(false);
  }, []);

  return (
    <SafeAreaView style={{
      backgroundColor: colors.backgroundColor,
      flex: 1,
      paddingTop: perfectSize(10),
    }}
    >
      <Container paddingSize={ 16 }>
        <HeaderDrawerContent
          openCoinModal={ openModalCoin }
          openUserModal={ openModal }
          userName={ userInfo.account }
          onClose={ navigation.closeDrawer }
          activeAccountModal={ false }
          activeCoinModal={ false }
          coin={ coin }
        />
        {
          DrawerConfig.map(({ name, id, icon }) => (
            <DrawerItem
              key={ id }
              onPress={ () => navigation.navigate(name) }
              title={ t(`screens.${name}.nameScreen`) }
              icon={ () => icon(colors.secondaryText) }
            />
          ))
        }
      </Container>

      <ModalComponent modalVisible={ userModal } setModalVisible={ closeModal } KeyboardAvoidingViewParam>
        <SubAccountsModalContent
          setErrorSubAccount={ setErrorCode }
          errorSubAccountForm={ errorCode }
          loading={ loadingChangeSubAccount }
          onSelectSubAccounts={ onSelectSubAccounts }
          accounts={ accountsList }
          currentNameId={ userInfo.id }
          addSubAccounts={ addSubAccounts }
        />
      </ModalComponent>

      <ModalComponent modalVisible={ coinModal } setModalVisible={ closeModalCoin }>
        <CoinModalSelected
          loading={ loadingCoinChange }
          currentCoin={ coin }
          onSelectCoin={ selectCoin }
          coins={ coins }
        />
      </ModalComponent>

    </SafeAreaView>
  );
};

export default CustomDrawerContent;
