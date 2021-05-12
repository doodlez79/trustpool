import React, {
  FC, useCallback, useEffect, useState,
} from 'react';

import {
  View, TouchableOpacity, FlatList, RefreshControl,
} from 'react-native';

import { StackScreenProps } from '@react-navigation/stack';
import { MainStackParamList } from 'navigation/Navigation.types';
import { useDispatch, useSelector } from 'react-redux';
import { Actions, Selectors } from 'ducks';
import { perfectSize } from 'helpers/PerfectSize';
import { SelectorList } from 'components/SelectorList';
import { iconsByCoin } from 'constants/iconByCoin';
import { CoinModalSelected } from 'components/CoinModalSelected';
import { ModalComponent } from 'components/Modal';
import { COIN_TYPE } from 'entitiesState/currency';
import NotificationSettingItem from 'components/NotificationSettingItem/NotificationSettingItem';
import { useTranslation } from 'react-i18next';
import { Typography } from 'components/Typography';
import { useTheme } from 'helpers/ThemeManage';
import { mainColors } from 'constants/colors';
import { PushNotificationsInst } from 'services';
import { TITLE_SETTING_INFO } from 'entitiesState/settings';
import { ChangeModalSettings } from 'components/ChangeModalSettings';
import { FormValuesType } from 'screens/NotificationSetting/types';
import NavigationBack from 'components/NavigationBack/NavigationBack';
import Chevron from 'Icons/Chevron.svg';
import { styles } from './styles';

export interface NotificationSettingProps extends StackScreenProps<MainStackParamList, 'NotificationSetting'>{}

const NotificationSetting:FC<NotificationSettingProps> = ({ navigation, route }) => {
  const dispatch = useDispatch();

  const coin = useSelector(Selectors.Currency.currentCoin);
  const coins = useSelector(Selectors.Setting.getCoinListFromSettings);
  const [ refreshStatus, setRefreshStatus ] = useState(false);
  const { colors } = useTheme();
  const [ currentCoin, setCurrentCoin ] = useState(coin);
  const [ errorCodeStatus, setErrorCodeStatus ] = useState(0);
  const [ coinModal, setCoinModal ] = useState(false);
  const [ changeModalSettings, setChangeModalSettings ] = useState(false);
  const [ statusNotification, setStatusNotification ] = useState('');
  const infoByCurrentCoin = useSelector(Selectors.Setting.getInfoByCurrentCoin(currentCoin));
  const loadingSetting = useSelector(Selectors.Setting.isLoading);
  const { t } = useTranslation();

  useEffect(() => {
    if (errorCodeStatus) {
      setTimeout(() => {
        setErrorCodeStatus(0);
      }, 3000);
    }
  }, [ errorCodeStatus ]);

  useEffect(() => {
    if (route.params.leftTitle) {
      navigation.setOptions({
        headerLeft: ({ onPress }) => (
          <NavigationBack
            onClick={ onPress }
            text={ t(`screens.Settings.tabName.${route.params.leftTitle}`) as string }
          />
        ),
      });
    }
  }, [ route.params.leftTitle ]);

  const updateSetting = useCallback((swipeRefresh: boolean = false) => {
    if (swipeRefresh) {
      setRefreshStatus(true);
    }
    dispatch(Actions.Setting.getSettingNotification.request({},
      {
        resolve: () => {
          if (swipeRefresh) {
            setRefreshStatus(false);
          }
        },
      }));
  }, []);

  const changeStatus = (business: TITLE_SETTING_INFO, isOn: number, cb: ()=> void) => {
    dispatch(Actions.Setting.changeStatus.request(
      { business, coin: currentCoin, isOn },
      {
        resolve: () => {
          cb();
          updateSetting(false);
        },
        reject: code => {
          if (code) {
            setErrorCodeStatus(code);
          }
        },
      },
    ));
  };

  useEffect(() => {
    (async () => {
      if (statusNotification === '') {
        const status = await PushNotificationsInst.getPermissionNotifications();
        setStatusNotification(status);
      }
    })();
  }, []);

  const openModalCoin = useCallback(() => {
    setCoinModal(true);
  }, []);
  const closeModalCoin = useCallback(() => {
    setCoinModal(false);
  }, []);

  const openChangeModalSettings = useCallback(() => {
    setChangeModalSettings(true);
  }, []);
  const closeChangeModalSettings = useCallback(() => {
    setChangeModalSettings(false);
  }, []);

  const selectCoin = (coin: COIN_TYPE) => {
    setCurrentCoin(coin);
    closeModalCoin();
  };

  const submitForm = (values: FormValuesType) => {
    dispatch(Actions.Setting.changeSettings.request({ ...values, coin: currentCoin }, {
      resolve: () => {
        updateSetting();
        closeChangeModalSettings();
      },
    }));
  };
  return (
    <>
      <View style={{
        justifyContent: 'flex-start',
        flex: 1,
      }}
      >
        <View style={{
          alignItems: 'center',
          marginVertical: perfectSize(20),

        }}
        >
          <SelectorList
            icon={ iconsByCoin[currentCoin] }
            onClick={ openModalCoin }
            active={ coinModal }
            coin={ currentCoin }
          />
        </View>
        {
          statusNotification !== 'granted' && (
            <View style={{ paddingVertical: perfectSize(20) }}>
              <Typography
                text={ t('screens.NotificationSetting.noPushStatus') }
                color={ colors.text }

              />
              <TouchableOpacity onPress={ () => {} }>
                <Typography
                  color={ mainColors.blue }
                  text={ t('screens.NotificationSetting.noPushStatusLink') }
                />
              </TouchableOpacity>
            </View>
          )
        }

        <FlatList
          showsVerticalScrollIndicator={ false }
          directionalLockEnabled={ false }
          automaticallyAdjustContentInsets={ false }
          ListHeaderComponent={ () => (
            <View style={{
              height: perfectSize(20),
            }}
            >
              {
              errorCodeStatus ? (

                <Typography
                  fontSize={ 12.8 }
                  color={ mainColors.red }
                  text={ t(`screens.NotificationSetting.errors.${errorCodeStatus}`) }
                />
              )
                : null
            }
            </View>
          ) }
          contentContainerStyle={{
            paddingHorizontal: perfectSize(16),
          }}
          refreshControl={ (
            <RefreshControl
              tintColor={ mainColors.blue }
              refreshing={ loadingSetting && refreshStatus }
              onRefresh={ () => updateSetting(true) }
            />
          ) }
          keyExtractor={ (item, index) => String(index) }
          data={ infoByCurrentCoin ? infoByCurrentCoin.remindSettingList : [] }
          ListFooterComponent={ () => (
            <TouchableOpacity
              style={{ ...styles.alertSetting, borderColor: colors.backgroundSelectedItem }}
              onPress={ openChangeModalSettings }
            >
              <View style={{
                flexDirection: 'row',
                alignItems: 'center',
              }}
              >
                <Typography
                  text={ t('screens.NotificationSetting.AlertSetting') }
                  bold
                  color={ colors.text }
                />
              </View>
              <View style={ styles.chevron }>
                <Chevron fill={ colors.secondaryText } />
              </View>
            </TouchableOpacity>
          ) }
          renderItem={ ({ item }) => (
            <NotificationSettingItem
              onClickValue={ openChangeModalSettings }
              changeStatus={ cb => changeStatus(item.business, !item.status ? 1 : 0, cb) }
              title={ t(`screens.NotificationSetting.${item.title}`) }
              status={ item.status }
              hashRate={ `${item.value}` }
              unit={ `${item.unit}` }
            />
          ) }

        />

      </View>
      <ModalComponent modalVisible={ coinModal } setModalVisible={ closeModalCoin }>
        <CoinModalSelected
          loading={ false }
          currentCoin={ currentCoin }
          onSelectCoin={ selectCoin }
          coins={ coins! }
        />
      </ModalComponent>
      <ModalComponent
        KeyboardAvoidingViewParam
        modalVisible={ changeModalSettings }
        setModalVisible={ closeChangeModalSettings }
      >
        <ChangeModalSettings
          loading={ loadingSetting }
          handleSubmit={ submitForm }
          infoByCurrentCoin={ infoByCurrentCoin! }
        />
      </ModalComponent>
    </>
  );
};

export default NotificationSetting;
