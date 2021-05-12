import React, {
  FC, useCallback, useEffect, useMemo, useState,
} from 'react';
import {
  RefreshControl, ScrollView, TouchableOpacity, View,
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { StackScreenProps } from '@react-navigation/stack';
import { format } from 'date-fns';
import { useTranslation } from 'react-i18next';

import { MainStackParamList } from 'navigation/Navigation.types';
import { Actions, Selectors } from 'ducks';
import { TIME_CHART_TYPES } from 'entitiesState/general';
import { NavigationBack } from 'components/NavigationBack';
import { WidgetHashrateChart } from 'components/WidgetHashrateChart';
import { Container } from 'components/Container';
import { Typography } from 'components/Typography';
import { useTheme } from 'helpers/ThemeManage';
import More from 'Icons/More.svg';
import { NumberToSystemMeasuring } from 'helpers/NumberToSystemMeasuring';

import { perfectSize } from 'helpers/PerfectSize';
import { StackHeaderLeftButtonProps } from '@react-navigation/stack/src/types';
import { TimeTranslate } from 'constants/translateTimes';

import { FORMAT } from 'constants/format';
import { ModalComponent } from 'components/Modal';
import { MovedToGroupWorkerComponent } from 'components/MovedToGroupWorkerComponent';
import { styles } from './styles';

export interface WorkerDetailProps extends StackScreenProps<MainStackParamList, 'DetailWorker'>{}

const DetailWorkerScreen:FC<WorkerDetailProps> = ({ route, navigation }) => {
  const { data } = route.params;
  const dispatch = useDispatch();
  const loading = useSelector(Selectors.Workers.isLoading);
  const coin = useSelector(Selectors.Currency.currentCoin);
  const workerChart = useSelector(Selectors.Workers.getWorkerChart);
  const [ timeChart, setTimeChart ] = useState(TIME_CHART_TYPES.HOUR);
  const { t } = useTranslation();
  const { colors } = useTheme();
  const allWorkers = useSelector(Selectors.Workers.getAllWorkers);
  const dataWorker = allWorkers.find(el => el.id === data.id);
  const groups = useSelector(Selectors.Workers.getWorkersGroup);

  const avgRejectRate = useMemo(() => workerChart[timeChart].rejectRate.reduce((acc, item) => {
    acc += item;
    return acc;
  }, 0) / workerChart[timeChart].rejectRate.length, [ workerChart, timeChart ]);

  const updateChartData = (time:TIME_CHART_TYPES) => {
    dispatch(Actions.Workers.getWorker.request({ id: data.id, time, coin }));
  };
  useEffect(() => {
    updateChartData(timeChart);
  }, []);

  const [ moreAndMoveModal, setMoreAndMoveModal ] = useState(false);
  const [ activeGroup, setActiveGroup ] = useState(dataWorker?.groupId);

  const changeChartInfo = (type: TIME_CHART_TYPES) => {
    setTimeChart(type);
    dispatch(Actions.General.setCurrentTimeForMainChart(type));
  };

  const openModalMoreAndMove = useCallback(() => {
    setMoreAndMoveModal(true);
  }, []);
  const closeModalMoreAndMove = useCallback(() => {
    setMoreAndMoveModal(false);
  }, []);

  const moveToNewGroup = (id:number) => {
    dispatch(Actions.Workers.moveItemsToNewGroup.request({
      group: id,
      elements: [ data.id ],
    }, {
      resolve: () => {
        closeModalMoreAndMove();
        setActiveGroup(id);
      },
      reject: () => {},
    }));
  };

  useEffect(() => {
    navigation.setOptions({
      title: String(data.name),
      headerLeft: ({ onPress, label }: StackHeaderLeftButtonProps) => {
        if (label) {
          return <NavigationBack onClick={ onPress } text={ t('screens.Workers.nameScreen') } />;
        }
        return null;
      },
      headerRight: () => (
        <TouchableOpacity
          style={{
            height: 28, width: 28, justifyContent: 'center', alignItems: 'center',
          }}
          onPress={ openModalMoreAndMove }
        >
          <More height={ 20 } width={ 20 } fill={ colors.text } />
        </TouchableOpacity>
      ),
    });
  }, [ data.id ]);

  return (
    <>
      <Container paddingSize={ 8 } style={{ marginTop: perfectSize(20), flex: 1 }}>
        <View style={{
          minHeight: perfectSize(300),
        }}
        >
          {
          dataWorker && (
            <WidgetHashrateChart
              loading={ loading }
              titleAlign="center"
              changeChartInfo={ changeChartInfo }
              currentTime={ timeChart }
              data={ workerChart }
              hashAvg={ NumberToSystemMeasuring(dataWorker.hashrate[TimeTranslate[timeChart] as TIME_CHART_TYPES],
                3).newValue }
              hashPrefix={ NumberToSystemMeasuring(dataWorker.hashrate[TimeTranslate[timeChart] as TIME_CHART_TYPES],
                3).prefix }
              setTimeChartRequest={ changeChartInfo }
            />
          )
        }

        </View>

        <ScrollView
          showsVerticalScrollIndicator={ false }
          refreshControl={ (
            <RefreshControl
              refreshing={ false }
              onRefresh={ () => updateChartData(timeChart) }
            />
) }
          style={{
            marginTop: perfectSize(30),
            paddingHorizontal: perfectSize(8),
          }}
        >
          <View style={ styles.infoItem }>
            {
            dataWorker && (
              <>
                <Typography
                  fontSize={ 12.8 }
                  text={ t('screens.DetailWorker.lastSubmit') }
                  color={ colors.secondaryText }
                />
                <Typography
                  text={ format(dataWorker.lastActive, FORMAT) }
                  bold
                  color={ colors.text }
                />
              </>
            )
          }

          </View>
          {
          dataWorker && (
            <View style={ styles.infoItem }>
              <Typography
                fontSize={ 12.8 }
                text={ t('screens.DetailWorker.status') }
                color={ colors.secondaryText }
              />
              <Typography text={ t(`screens.DetailWorker.${dataWorker.status}`) } bold color={ colors.text } />
            </View>
          )
        }
          {
          dataWorker && (
            <View style={ styles.infoItem }>
              <Typography
                fontSize={ 12.8 }
                text={ t('screens.DetailWorker.rejectRate') }
                color={ colors.secondaryText }
              />
              <View style={ styles.row }>
                <Typography
                  text={ avgRejectRate.toFixed(3).toString() }
                  bold
                  color={ colors.text }
                />
                <Typography text="%" style={ styles.mL } bold color={ colors.secondaryText } />
              </View>
            </View>
          )
        }
          {
          dataWorker && (
            <View style={ styles.infoItem }>
              <Typography
                fontSize={ 12.8 }
                text={ t('screens.DetailWorker.10minAvg') }
                color={ colors.secondaryText }
              />
              <View style={ styles.row }>
                <Typography
                  /* eslint-disable-next-line max-len */
                  text={ String(NumberToSystemMeasuring(dataWorker.hashrate[TimeTranslate.min as TIME_CHART_TYPES], 3).newValue) }
                  bold
                  color={ colors.text }
                />
                <Typography
                  text={ NumberToSystemMeasuring(dataWorker.hashrate[TimeTranslate.min as TIME_CHART_TYPES], 3).prefix }
                  bold
                  color={ colors.secondaryText }
                  style={ styles.mL }
                />
              </View>
            </View>
          )
        }
          {
          dataWorker && (
            <View style={ styles.infoItem }>
              <Typography
                fontSize={ 12.8 }
                text={ t('screens.DetailWorker.1hourAvg') }
                color={ colors.secondaryText }
              />
              <View style={ styles.row }>
                <Typography
                  /* eslint-disable-next-line max-len */
                  text={ NumberToSystemMeasuring(dataWorker.hashrate[TimeTranslate.hour as TIME_CHART_TYPES], 3).newValue.toString() }
                  bold
                  color={ colors.text }
                />
                <Typography
                  /* eslint-disable-next-line max-len */
                  text={ NumberToSystemMeasuring(dataWorker.hashrate[TimeTranslate.hour as TIME_CHART_TYPES], 3).prefix }
                  bold
                  color={ colors.secondaryText }
                  style={ styles.mL }
                />
              </View>
            </View>
          )
        }
          {
          dataWorker && (
            <View style={ styles.infoItem }>
              <Typography
                fontSize={ 12.8 }
                text={ t('screens.DetailWorker.1dayAvg') }
                color={ colors.secondaryText }
              />
              <View style={ styles.row }>
                <Typography
                  /* eslint-disable-next-line max-len */
                  text={ NumberToSystemMeasuring(dataWorker.hashrate[TimeTranslate.day as TIME_CHART_TYPES], 3).newValue.toString() }
                  bold
                  color={ colors.text }
                />
                <Typography
                  text={ NumberToSystemMeasuring(dataWorker.hashrate[TimeTranslate.day as TIME_CHART_TYPES], 3).prefix }
                  bold
                  color={ colors.secondaryText }
                  style={ styles.mL }
                />
              </View>

            </View>
          )
        }

        </ScrollView>
      </Container>

      <ModalComponent
        modalVisible={ moreAndMoveModal }
        setModalVisible={ closeModalMoreAndMove }
      >
        <MovedToGroupWorkerComponent
          groups={ groups }
          closeModal={ closeModalMoreAndMove }
          moveToGroup={ moveToNewGroup }
          choosenItem={ dataWorker?.id }
          aloneItem={ activeGroup }
        />
      </ModalComponent>
    </>

  );
};

export default DetailWorkerScreen;
