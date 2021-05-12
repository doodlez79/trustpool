import React, {
  FC, useCallback, useEffect, useState,
} from 'react';

import {
  Dimensions, View,
} from 'react-native';
import { StackScreenProps } from '@react-navigation/stack';
import { useDispatch, useSelector } from 'react-redux';
import { useFocusEffect } from '@react-navigation/native';
import { useTranslation } from 'react-i18next';

import { format, isValid } from 'date-fns';
import { TabView } from 'react-native-tab-view';

import { MainStackParamList } from 'navigation/Navigation.types';
import { Actions, Selectors } from 'ducks';
import { WORKERS_CONTENT_TYPE } from 'screens/Workers/Workers.types';
import { CustomTabsWorkers } from 'components/CustomTabsWorkers/CustomTabsWorkers';
import { WorkersContent } from 'components/WorkersContent';
import { ModalComponent } from 'components/Modal';
import { CoinModalSelected } from 'components/CoinModalSelected';
import { COIN_TYPE } from 'entitiesState/currency';
import { WorkerItem } from 'entitiesState/workers';
import { FORMAT } from 'constants/format';
import { SelectorList } from 'components/SelectorList';
import { iconsByCoin } from 'constants/iconByCoin';
import { Scene } from 'react-native-tab-view/lib/typescript/src/types';
import { WorkersInfoBlock } from 'components/WorkersInfoBlock';
import { CustomHeaderTabNavigatorWorkers } from 'components/CustomHeaderTabNavigatorWorkers';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { WorkerSortModal } from 'components/WorkerSortModal';
import { GroupModalSelect } from 'components/GroupModalSelect';
import { ModalMovedGroupWorkers } from 'components/ModalMovedGroupWorkers';
import { MovedToGroupWorkerComponent } from 'components/MovedToGroupWorkerComponent';

export interface WorkersProps extends StackScreenProps<MainStackParamList, 'Workers'>{}

const { width } = Dimensions.get('window');
const WorkersScreen: FC<WorkersProps> = ({ navigation }) => {
  const allWorkers = useSelector(Selectors.Workers.getAllWorkers);
  const pageInfoWorkers = useSelector(Selectors.Workers.getPageInfoWorkers);
  const unActiveWorkers = useSelector(Selectors.Workers.getUnActiveWorkers);
  const activeWorkers = useSelector(Selectors.Workers.getActiveWorkers);
  const loadingWorkers = useSelector(Selectors.Workers.isLoading);
  const coins = useSelector(Selectors.Currency.allCoins);
  const workersInfo = useSelector(Selectors.General.getGeneralWorkersInfo);
  const loadingCoinChange = useSelector(Selectors.Currency.isLoading);
  const stratumInfo = useSelector(Selectors.General.getGeneralStratumInfo);
  const userInfo = useSelector(Selectors.Account.getUserInfo);
  const sortConfig = useSelector(Selectors.Workers.getSortConfig);
  const groupWorkers = useSelector(Selectors.Workers.getWorkersGroup);

  const { t } = useTranslation();
  const dispatch = useDispatch();

  const [ firstVisit, setFirstVisit ] = useState(false);
  const [ coinModal, setCoinModal ] = useState(false);
  const [ sortModal, setSortModal ] = useState(false);
  const [ groupModal, setGroupModal ] = useState(false);
  const [ moreAndMoveModal, setMoreAndMoveModal ] = useState(false);
  const [ selectableItem, setSelectableItem ] = useState(false);
  const [ moveAloneItem, setMoveAloneItem ] = useState(false);
  const [ searchActive, setSearchActive ] = useState(false);

  const [ groupValue, setGroupValue ] = useState(-1);
  const [ workerIdforMoving, setWorkerIdForMoving ] = useState([ ]);

  const renderTitle = () => {
    const newTitle = groupWorkers.find(el => el.groupId === groupValue);
    let title = '';

    const checkName = () => {
      if (newTitle?.groupId === -1) {
        return title = t('screens.Workers.nameScreen');
      }
      if (newTitle?.groupId === 0) {
        return title = t('screens.Workers.group.defaultWorkers');
      } return title = newTitle?.groupName;
    };

    if (checkName()?.length > 13) {
      title = checkName()?.slice(0, 13).concat('...');
    }
    return title;
  };

  useEffect(() => {
    if (selectableItem === false) {
      setWorkerIdForMoving([]);
    }
  }, [ selectableItem ]);

  const openModalCoin = useCallback(() => {
    setCoinModal(true);
  }, []);
  const coin = useSelector(Selectors.Currency.currentCoin);
  const closeModalCoin = useCallback(() => {
    setCoinModal(false);
  }, []);

  const closeModalGroup = useCallback(() => {
    setGroupModal(false);
  }, []);

  const openModalGroup = useCallback(() => {
    setGroupModal(true);
  }, []);

  const closeModalMoreAndMove = useCallback(() => {
    setMoreAndMoveModal(false);
  }, []);

  const openModalMoreAndMove = useCallback(() => {
    setMoreAndMoveModal(true);
  }, []);
  const openModalMoreAndMoveAlone = useCallback(() => {
    setMoveAloneItem(true);
  }, []);
  const closeModalMoreAndMoveAlone = useCallback(() => {
    setMoveAloneItem(false);
    setWorkerIdForMoving([]);
  }, []);

  const openSortModal = useCallback(() => {
    setSortModal(true);
  }, []);
  const closeSortModal = useCallback(() => {
    setSortModal(false);
  }, []);

  const changeGroup = (id:number) => {
    setGroupValue(id);
  };

  const selectCoin = (coin: COIN_TYPE) => {
    dispatch(Actions.Currency.postChangeCoin.request(coin,
      {
        resolve: () => {
          closeModalCoin(); setSearchActive(false);
          dispatch(Actions.Workers.setSortConfig({
            sortValue: { orderBy: '', sortBy: '' },
            searchValue: '',
            status: '',
          }));
        },
      }));
    dispatch(Actions.General.getGeneralInfo.request(coin));
    setGroupValue(-1);
  };

  const unSelectAllWorkers = useCallback(() => {
    setWorkerIdForMoving([]);
  }, []);

  const [ index, setIndex ] = React.useState(0);
  const [ routes, setRoutes ] = useState([
    {
      key: 'all',
      title: t('screens.Workers.tabsName.all'),
      count: allWorkers.length,
    },
    {
      key: 'active',
      title: t('screens.Workers.tabsName.active'),
      count: activeWorkers.length,
    },
    {
      key: 'unActive',
      title: t('screens.Workers.tabsName.unActive'),
      count: unActiveWorkers.length,
    },
  ]);

  useEffect(() => {
    setRoutes([
      {
        key: 'all',
        title: t('screens.Workers.tabsName.all'),
        count: allWorkers.length,
      },
      {
        key: 'active',
        title: t('screens.Workers.tabsName.active'),
        count: activeWorkers.length,
      },
      {
        key: 'unActive',
        title: t('screens.Workers.tabsName.unActive'),
        count: unActiveWorkers.length,
      },
    ]);
  }, [ allWorkers.length, activeWorkers.length, unActiveWorkers.length ]);

  const selectAllWorkers = useCallback(() => {
    const curentGroup = () => {
      if (index === 0) {
        return allWorkers;
      }
      if (index === 1) {
        return activeWorkers;
      }
      if (index === 2) {
        return unActiveWorkers;
      }
      return allWorkers;
    };
    const allWorkersId = curentGroup().map(el => el.id);
    setWorkerIdForMoving(allWorkersId);
  }, [ index ]);

  const updateWorkers = useCallback((pageInfo = 1, replace = true, coinCurrent: COIN_TYPE = coin) => {
    dispatch(Actions.General.getGeneralInfo.request(coinCurrent));
    dispatch(Actions.Workers.getWorkersGroups.request());
    dispatch(Actions.Workers.getWorkers.request({
      group: groupValue,
      coin: coinCurrent,
      page: pageInfo,
      replace,
    }, {
      resolve: () => {
        if (!firstVisit) { setFirstVisit(true); }
      },
    }));
  }, [ coin, groupValue, userInfo.id ]);

  useFocusEffect(updateWorkers);

  const goToAllWorkers = () => {
    setGroupValue(-1);
    setSearchActive(false);
    updateWorkers();
  };

  const moveToNewGroup = (id:number) => {
    dispatch(Actions.Workers.moveItemsToNewGroup.request({
      group: id,
      elements: workerIdforMoving,
    }, {
      resolve: () => {
        closeModalMoreAndMove();
        unSelectAllWorkers();
        setSelectableItem(false);
        closeModalMoreAndMoveAlone();
        updateWorkers();
      },
      reject: () => {},
    }));
  };

  const pressToWorkerItem = (item:WorkerItem) => {
    const newData = { ...item, lastActive: isValid(item.lastActive) ? format(item.lastActive, FORMAT) : '' };
    navigation.navigate('DetailWorker', { data: newData });
  };

  const setSortConfigInGlobalState = value => {
    const data = {
      ...sortConfig,
      ...value,
    };

    dispatch(Actions.Workers.setSortConfig(data));
  };

  const loadingStatus = loadingWorkers && allWorkers.length === 0 && !firstVisit;

  useEffect(() => {
    updateWorkers(1, true);
  }, [ sortConfig.sortValue?.sortBy, sortConfig.sortValue?.orderBy ]);

  const renderScene = ({ route }: Scene<{key: string, count: number, title: string}>) => {
    switch (route.key) {
      case 'all':
        return (
          <WorkersContent
            meta={ pageInfoWorkers }
            loading={ loadingStatus }
            firstVisit={ firstVisit }
            updateWorkers={ updateWorkers }
            onClick={ pressToWorkerItem }
            status={ WORKERS_CONTENT_TYPE.ALL }
            data={ allWorkers }
            coin={ coin }
            active={ coinModal }
            onPress={ openModalCoin }
            coinModal={ coinModal }
            openModalCoin={ openModalCoin }
            moveToClick={ openModalMoreAndMoveAlone }
            selectableItem={ selectableItem }
            setSelectableItem={ (val:boolean) => setSelectableItem(val) }
            setWorkerIdForMoving={ (val:number[]) => setWorkerIdForMoving(val) }
            workerIdforMoving={ workerIdforMoving }
            moreAndMoveModal={ moveAloneItem }
            groupValue={ groupValue }
            goToAllWorkers={ goToAllWorkers }
            sortConfig={ sortConfig }
            allWorkerslength={ allWorkers.length }
          />
        );
      case 'active':
        return (
          <WorkersContent
            firstVisit={ firstVisit }
            meta={ pageInfoWorkers }
            loading={ loadingStatus }
            updateWorkers={ updateWorkers }
            onClick={ pressToWorkerItem }
            status={ WORKERS_CONTENT_TYPE.ACTIVE }
            data={ activeWorkers }
            coin={ coin }
            active={ coinModal }
            onPress={ openModalCoin }
            coinModal={ coinModal }
            openModalCoin={ openModalCoin }
            moveToClick={ openModalMoreAndMoveAlone }
            selectableItem={ selectableItem }
            setSelectableItem={ (val:boolean) => setSelectableItem(val) }
            setWorkerIdForMoving={ (val:number[]) => setWorkerIdForMoving(val) }
            workerIdforMoving={ workerIdforMoving }
            moreAndMoveModal={ moveAloneItem }
            groupValue={ groupValue }
            goToAllWorkers={ goToAllWorkers }
            sortConfig={ sortConfig }
            allWorkerslength={ allWorkers.length }

          />
        );
      case 'unActive':
        return (
          <WorkersContent
            firstVisit={ firstVisit }
            meta={ pageInfoWorkers }
            loading={ loadingStatus }
            updateWorkers={ updateWorkers }
            onClick={ pressToWorkerItem }
            status={ WORKERS_CONTENT_TYPE.INACTIVE }
            data={ unActiveWorkers }
            coin={ coin }
            active={ coinModal }
            onPress={ openModalCoin }
            coinModal={ coinModal }
            openModalCoin={ openModalCoin }
            moveToClick={ openModalMoreAndMoveAlone }
            selectableItem={ selectableItem }
            setSelectableItem={ (val:boolean) => setSelectableItem(val) }
            setWorkerIdForMoving={ (val:number[]) => setWorkerIdForMoving(val) }
            workerIdforMoving={ workerIdforMoving }
            moreAndMoveModal={ moveAloneItem }
            groupValue={ groupValue }
            goToAllWorkers={ goToAllWorkers }
            sortConfig={ sortConfig }
            allWorkerslength={ allWorkers.length }

          />
        );
      default:
        return null;
    }
  };
  const insets = useSafeAreaInsets();

  const render = () => {
    if (workersInfo.totalActive === 0 && workersInfo.totalUnactive === 0) {
      return (
        <>
          <View style={{
            justifyContent: 'space-between',
            paddingHorizontal: 16,
          }}
          >
            <View style={{
              alignItems: 'center',
              marginVertical: 20,
            }}
            >
              <SelectorList
                icon={ iconsByCoin[coin] }
                onClick={ openModalCoin }
                active={ coinModal }
                coin={ coin }
              />
            </View>

          </View>
          <WorkersInfoBlock
            stratumInfo={ stratumInfo }
            coin={ coin }
          />
        </>
      );
    }
    if ((workersInfo.totalActive > 0 || workersInfo.totalUnactive > 0) || allWorkers.length === 0) {
      return (
        <TabView
          renderTabBar={ props => (

            <CustomTabsWorkers
              { ...props }
            />

          ) }
          navigationState={{ index, routes }}
          renderScene={ renderScene }
          onIndexChange={ setIndex }
          initialLayout={{ width }}
          renderLazyPlaceholder={ () => <></> }
          tabBarPosition="top"
          lazy
          swipeEnabled={ !selectableItem }
          lazyPreloadDistance={ 1 }
        />
      );
    }
    return <></>;
  };

  return (
    <>
      <View
        style={{
          flex: 1,
          marginTop: insets.top,
          justifyContent: 'flex-start',
        }}
      >
        <CustomHeaderTabNavigatorWorkers
          searchValue={ sortConfig.searchValue! }
          setChangeSearch={ e => {
            setSortConfigInGlobalState({ searchValue: e });
          } }
          setChangeSearch1={ () => updateWorkers() }
          sortClick={ openSortModal }
          activeSort={ sortConfig.sortValue }
          searchValue1={ sortConfig.searchValue }
          loadingUpdate={ loadingWorkers }
          titleClick={ openModalGroup }
          title={ renderTitle() }
          selectableItem={ selectableItem }
          setSelectableItem={ (val:boolean) => setSelectableItem(val) }
          moreToClick={ openModalMoreAndMove }
          searchActive={ searchActive }
          setSearchActive={ (val:boolean) => setSearchActive(val) }
          clearInput={ () => updateWorkers() }
        />
        {
          render()
        }
      </View>
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
      <ModalComponent
        modalVisible={ moreAndMoveModal }
        setModalVisible={ closeModalMoreAndMove }
      >
        <ModalMovedGroupWorkers
          groups={ groupWorkers }
          closeModal={ closeModalMoreAndMove }
          currentIdGroup={ groupValue }
          moveToGroup={ moveToNewGroup }
          selectAll={ selectAllWorkers }
          unSelectAll={ unSelectAllWorkers }
        />
      </ModalComponent>
      <ModalComponent
        modalVisible={ moveAloneItem }
        setModalVisible={ closeModalMoreAndMoveAlone }
      >
        <MovedToGroupWorkerComponent
          groups={ groupWorkers }
          closeModal={ closeModalMoreAndMoveAlone }
          moveToGroup={ moveToNewGroup }
          workers={ allWorkers }
          choosenItem={ workerIdforMoving[0] }
        />
      </ModalComponent>
      <ModalComponent
        modalVisible={ groupModal }
        setModalVisible={ closeModalGroup }
        KeyboardAvoidingViewParam
      >
        <GroupModalSelect
          id={ groupValue }
          groups={ groupWorkers }
          chooseGroup={ id => changeGroup(id) }
          loading={ loadingWorkers }
        />
      </ModalComponent>
      <ModalComponent
        modalVisible={ sortModal }
        setModalVisible={ closeSortModal }
      >
        <WorkerSortModal
          resetSort={ () => {
            setSortConfigInGlobalState({ sortValue: { orderBy: '', sortBy: '' } });
            closeSortModal();
          } }
          loading={ loadingWorkers }
          setChangeSort={ value => setSortConfigInGlobalState({ sortValue: value }) }
          sort={ sortConfig.sortValue! }
        />
      </ModalComponent>
    </>
  );
};

export default WorkersScreen;
