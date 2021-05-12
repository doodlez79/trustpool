import React, {
  FC, useEffect, useRef, useState,
} from 'react';

import {
  Platform, RefreshControl, View, FlatList, Animated, TouchableHighlight,
} from 'react-native';

import { WorkerItem } from 'entitiesState/workers';

import WorkerContentItem from 'components/WorkerItem/WorkerItem';
import { perfectSize } from 'helpers/PerfectSize';

import { Preloader } from 'components/Preloader';
import { mainColors } from 'constants/colors';
import { iconsByCoin } from 'constants/iconByCoin';
import { useTheme } from 'helpers/ThemeManage';

import { useTranslation } from 'react-i18next';
import { WorkersContentProps } from './WorkersContent.types';
import { PaymentAnotherInfo } from '../PaymentAnotherInfo';
import { SelectorList } from '../SelectorList';

import { RadioButtonForGroupWorkers } from '../RadioButtonForGroupWorkers';
import { Typography } from '../Typography';
import { Btn } from '../Btn';

import { styles } from './styles';

const WorkersContent:FC<WorkersContentProps> = ({
  data, onClick, updateWorkers,
  status,
  active: stateCoinModal,
  onPress: onPressCoinTab, firstVisit,
  meta,
  coinModal, openModalCoin, coin,
  loading,
  moveToClick,
  selectableItem,
  workerIdforMoving,
  setSelectableItem,
  setWorkerIdForMoving,
  moreAndMoveModal,
  groupValue,
  goToAllWorkers,
  sortConfig,
  allWorkerslength,
}) => {
  const { colors } = useTheme();

  const { t } = useTranslation();

  const fadeAnim = useRef(new Animated.Value(0)).current;

  const showRadio = () => {
    Animated.timing(fadeAnim, {
      toValue: 40,
      duration: 200,
      useNativeDriver: true,
    }).start();
  };
  const hideRadio = () => {
    Animated.timing(fadeAnim, {
      toValue: 0,
      duration: 200,
      useNativeDriver: true,
    }).start();
  };

  const [ idForCloseSwipe, setIdForCloseSwipe ] = useState(0);

  useEffect(() => {
    if (selectableItem) {
      showRadio();
    } else {
      hideRadio();
    }
  }, [ selectableItem ]);

  const renderEmptyState = () => {
    if (sortConfig.searchValue !== '' && data.length === 0) {
      return (
        <View style={ styles.emptyView }>
          <SelectorList
            styleContainer={{
              borderWidth: 2,
              borderColor: colors.backgroundColor,
            }}
            icon={ iconsByCoin[coin] }
            onClick={ openModalCoin }
            active={ coinModal }
            coin={ coin }
          />
          <View>
            <Typography
              style={{ marginVertical: 40 }}
              color={ colors.text }
              text={ t('screens.Workers.group.badSearch') }
            />
          </View>
        </View>
      );
    }
    if (data.length === 0 && groupValue !== -1 && allWorkerslength === 0) {
      return (
        <View style={ styles.emptyView }>
          <SelectorList
            styleContainer={{
              borderWidth: 2,
              borderColor: colors.backgroundColor,
            }}
            icon={ iconsByCoin[coin] }
            onClick={ openModalCoin }
            active={ coinModal }
            coin={ coin }
          />
          <View>
            <Typography
              style={{ marginVertical: 40 }}
              color={ colors.text }
              text={ t('screens.Workers.group.empty') }
            />
            <Btn
              onClick={ goToAllWorkers }
              title={ t('screens.Workers.group.goToAllWorkers') }
            />
          </View>
        </View>
      );
    }
    return (
      <PaymentAnotherInfo
        coin={ coin }
        onClick={ onPressCoinTab }
        active={ stateCoinModal }
        workers
        status={ status }
      />
    );
  };

  return (
    <>
      {
        (data.length !== 0) && (
          <View style={{
            alignItems: 'center',
            position: 'relative',
            zIndex: 1000,
            width: '100%',
            marginVertical: perfectSize(20),
            paddingHorizontal: 16,
          }}
          >
            <SelectorList
              styleContainer={{
                borderWidth: 2,
                borderColor: colors.backgroundColor,
              }}
              icon={ iconsByCoin[coin] }
              onClick={ openModalCoin }
              active={ coinModal }
              coin={ coin }
            />
          </View>
        )
      }
      {
        loading || !firstVisit
          ? (
            <View style={{ flex: 1 }}>
              <View style={{
                position: 'relative',
                backgroundColor: colors.backgroundColor,
                width: '100%',
                alignItems: 'center',
                justifyContent: 'center',
                height: '100%',
              }}
              >
                <Preloader heightContainer={ 48 } stickStyle={{ backgroundColor: mainColors.blue }} />
              </View>
            </View>

          )
          : (
            <FlatList<WorkerItem>
              style={{
                flex: 1,
                paddingHorizontal: perfectSize(16),
              }}
              contentContainerStyle={{ flex: data.length > 0 ? 0 : 1 }}
              keyboardShouldPersistTaps="handled"
              data={ data }
              ListFooterComponent={ (
                <View style={{ alignItems: 'center' }}>
                  {meta.hasNext
                  && (
                    <View>
                      <Preloader heightContainer={ 24 } stickStyle={{ backgroundColor: mainColors.blue }} />
                    </View>
                  )}
                </View>
              ) }
              ListEmptyComponent={ () => (
                renderEmptyState()
              ) }
              showsVerticalScrollIndicator={ false }
              scrollEventThrottle={ 16 }
              keyExtractor={ (item, index) => `${index}-${item.id}` }
              refreshControl={ (
                <RefreshControl
                  refreshing={ false }
                  onRefresh={ () => updateWorkers(1, true) }
                />
              ) }
              onEndReached={ () => {
                if (meta.hasNext) {
                  updateWorkers(meta.currPage + 1, false);
                }
              } }
              onEndReachedThreshold={ Platform.OS === 'ios' ? 0 : 0.5 }
              renderItem={ ({ item }) => (

                <View style={{
                  position: 'relative',
                  justifyContent: 'center',
                }}
                >
                  {selectableItem && (
                    <RadioButtonForGroupWorkers
                      active={ workerIdforMoving.includes(item.id) }
                      onClick={ () => {
                        if (!workerIdforMoving.includes(item.id)) {
                          setWorkerIdForMoving([ ...workerIdforMoving, item.id ]);
                        } else {
                          setWorkerIdForMoving(workerIdforMoving.filter(el => el !== item.id));
                        }
                      } }
                    />
                  )}
                  <Animated.View style={{ transform: [{ translateX: fadeAnim }] }}>
                    <TouchableHighlight
                      activeOpacity={ 0 }
                      underlayColor="transparent"
                      onPress={ () => {
                        if (!workerIdforMoving.includes(item.id)) {
                          setWorkerIdForMoving([ ...workerIdforMoving, item.id ]);
                        } else {
                          setWorkerIdForMoving(workerIdforMoving.filter(el => el !== item.id));
                        }
                      } }
                      disabled={ !selectableItem }
                    >
                      <WorkerContentItem
                        data={ item }
                        selectableItem={ selectableItem }
                        onClick={ () => onClick(item) }
                        moveToClick={ moveToClick }
                        setSelectable={ (val: boolean) => setSelectableItem(val) }
                        setWorkerIdForMoving={ (id: number) => setWorkerIdForMoving([ ...workerIdforMoving, id ]) }
                        moreAndMoveModal={ moreAndMoveModal }
                        idForCloseSwipe={ idForCloseSwipe }
                        setIdForCloseSwipe={ (id:number) => setIdForCloseSwipe(id) }
                      />
                    </TouchableHighlight>

                  </Animated.View>

                </View>

              ) }
            />

          )
      }
    </>
  );
};

export default WorkersContent;
