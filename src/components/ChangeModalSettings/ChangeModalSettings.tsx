import { Formik } from 'formik';
import React, { FC, useCallback, useState } from 'react';
import {
  Dimensions, FlatList, ScrollView, View,
} from 'react-native';

import { InputField } from 'components/InputField';
import { useTranslation } from 'react-i18next';
import { TITLE_SETTING_INFO, TITLE_SETTING_INFO_NORMAL } from 'entitiesState/settings';
import { Typography } from 'components/Typography';
import { Container } from 'components/Container';
import { ModalHeader } from 'components/ModalHeader';
import Chevron from 'Icons/Chevron.svg';

import { perfectSize } from 'helpers/PerfectSize';
import { Btn } from 'components/Btn';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useTheme } from 'helpers/ThemeManage';
import { ModalComponent } from 'components/Modal';
import { POSITION_TYPE } from 'components/Modal/types';
import { DrawerItem } from 'components/DrawerItem';
import { FormValuesType } from 'screens/NotificationSetting/types';

import { styles } from './styles';
import { ChangeModalSettingsProps } from './types';

const { width } = Dimensions.get('window');

const ChangeModalSettings:FC<ChangeModalSettingsProps> = ({
  infoByCurrentCoin,
  loading,
  handleSubmit,
}) => {
  const { t } = useTranslation();
  const { colors } = useTheme();
  const insert = useSafeAreaInsets();
  const [ unitModal, setUnitModal ] = useState(false);

  const openUnitModal = useCallback(() => {
    setUnitModal(true);
  }, []);
  const closeModalUnit = useCallback(() => {
    setUnitModal(false);
  }, []);

  return (
    <Container
      paddingSize={ 16 }
      style={{
        ...styles.container,
        marginBottom: insert.bottom + 10,
      }}
    >
      <ModalHeader
        longTitle
        loading={ loading }
        title={ t('screens.NotificationSetting.modalName') }
      />

      <Formik<{
        [x in TITLE_SETTING_INFO_NORMAL]: {value: number, unit: string}
      }>
        onSubmit={ handleSubmit }
        /* eslint-disable-next-line max-len */
        initialValues={ infoByCurrentCoin.remindSettingList.reduce((acc, item) => ({ ...acc, [item.title]: { value: item.value, unit: item.unit } }), {}) as FormValuesType }
      >
        {
          ({
            values, setFieldValue, handleSubmit, dirty,
          }) => (
            <>

              <ScrollView showsVerticalScrollIndicator={ false }>
                {
                    infoByCurrentCoin.remindSettingList.map(item => {
                      if (item.business === TITLE_SETTING_INFO.LOW_HASH_REMIND) {
                        return (
                          <View key={ item.title } style={{ marginBottom: perfectSize(20) }}>
                            <InputField
                              Icon={ () => (
                                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                  <Typography
                                    bold
                                    fontSize={ 14 }
                                    style={{ marginRight: perfectSize(11) }}
                                    color={ colors.text }
                                    text={ values[TITLE_SETTING_INFO_NORMAL.THRESHOLDS].unit }
                                  />
                                  <View style={{
                                    ...styles.iconContainer,
                                    transform: [{
                                      rotate: unitModal ? '-90deg' : '0deg',
                                    }],
                                  }}
                                  >
                                    <Chevron fill={ colors.text } />
                                  </View>

                                </View>

                              ) }
                              onClickIcon={ openUnitModal }
                              value={ String(values[item.title as TITLE_SETTING_INFO_NORMAL].value) }
                              label={ item.title === 'Fluctuation'
                                ? `${t(`screens.NotificationSetting.${item.title}`)}, ${item.unit}`
                                : t(`screens.NotificationSetting.${item.title}`) }
                              inputProps={{
                                keyboardType: 'numeric',
                              }}
                              onChange={ e => {
                                const regValue = /^[1-9]\d{0,8}$|^[1-9]\d{0,8}\.\d{0,2}$|^[0][.]\d{2}$|^[0]$/;

                                const newValue = e.replace(/,/, '.');
                                if (e) {
                                  if (regValue.test(newValue)) {
                                    setFieldValue(TITLE_SETTING_INFO_NORMAL.THRESHOLDS,
                                      { ...values[TITLE_SETTING_INFO_NORMAL.THRESHOLDS], value: newValue });
                                  }
                                } else {
                                  setFieldValue(TITLE_SETTING_INFO_NORMAL.THRESHOLDS,
                                    { ...values[TITLE_SETTING_INFO_NORMAL.THRESHOLDS], value: e });
                                }
                              } }
                            />
                          </View>

                        );
                      }

                      return (
                        <View key={ item.title } style={{ marginBottom: perfectSize(20) }}>
                          <InputField
                            inputProps={{
                              keyboardType: 'numeric',
                            }}
                            value={ String(values[item.title as TITLE_SETTING_INFO_NORMAL].value) }
                            label={ t(`screens.NotificationSetting.${item.title}`) }
                            onChange={ e => {
                              const regexpNaturalCount = /^[1-9]\d{0,8}$/;
                              const regValue = /^[1-9]\d{0,8}$|^[1-9]\d{0,8}\.\d{0,2}$|^[0][.]\d{0,2}$|^[0]$/;
                              const newValue = e.replace(/,/, '.');

                              if (e) {
                                if (item.title === TITLE_SETTING_INFO_NORMAL.ACTIVE_WORKERS
                                  && regexpNaturalCount.test(newValue)) {
                                  setFieldValue(item.title,
                                    { ...values[item.title as TITLE_SETTING_INFO_NORMAL], value: newValue });
                                }
                                if (item.title === TITLE_SETTING_INFO_NORMAL.FLUCTUATION && regValue.test(newValue)) {
                                  setFieldValue(item.title,
                                    { ...values[item.title as TITLE_SETTING_INFO_NORMAL], value: newValue });
                                }
                              } else {
                                setFieldValue(item.title,
                                  { ...values[item.title as TITLE_SETTING_INFO_NORMAL], value: e });
                              }
                            } }
                          />
                        </View>
                      );
                    })
                  }
              </ScrollView>
              <Btn
                disabled={ !dirty }
                onClick={ handleSubmit }
                title={ t('screens.NotificationSetting.modalBtn') }
              />
              <ModalComponent
                modalVisible={ unitModal }
                setModalVisible={ closeModalUnit }
                position={ POSITION_TYPE.CENTER }
              >
                <View style={{
                  width,
                }}
                >
                  <FlatList
                    contentContainerStyle={{ maxHeight: perfectSize(300), padding: perfectSize(16) }}
                    data={ infoByCurrentCoin!.units }
                    keyExtractor={ item => item }
                    renderItem={ ({ item }) => (
                      <View style={{
                        width: '100%',
                      }}
                      >
                        <DrawerItem
                          active={ item === values.Thresholds.unit }
                          title={ item }
                          onPress={ () => {
                            setFieldValue(TITLE_SETTING_INFO_NORMAL.THRESHOLDS, { ...values.Thresholds, unit: item });
                            setUnitModal(false);
                          } }
                        />
                      </View>

                    ) }
                  />
                </View>

              </ModalComponent>

            </>

          )
        }
      </Formik>

    </Container>

  );
};

export default ChangeModalSettings;
