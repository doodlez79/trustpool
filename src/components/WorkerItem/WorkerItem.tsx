import React, {
  FC, useEffect, useRef,
} from 'react';

import { View, TouchableOpacity } from 'react-native';

import { STATUS_WORKER_TYPE, WorkerItem } from 'entitiesState/workers';
import { mainColors } from 'constants/colors';
import { Typography } from 'components/Typography';
import { NumberToSystemMeasuring } from 'helpers/NumberToSystemMeasuring';
import { perfectSize } from 'helpers/PerfectSize';
import Chevron from 'Icons/Chevron.svg';

import { useTheme } from 'helpers/ThemeManage';
import { TimeTranslate } from 'constants/translateTimes';
import { TIME_CHART_TYPES } from 'entitiesState/general';

import { useTranslation } from 'react-i18next';

import Swipeable from 'react-native-gesture-handler/Swipeable';

import { styles } from './styles';
import { RightSwipeWorkerItem } from '../RightSwipeWorkerItem';

type WorkerItemProps = {
  onClick: () => void,
  data: WorkerItem
  moveToClick: ()=>void
  setSelectable: (val:boolean) => void
  setWorkerIdForMoving: (id:number)=>void
  moreAndMoveModal:boolean
  idForCloseSwipe: number
  setIdForCloseSwipe: (id:number)=> void
  selectableItem:boolean
}

const WorkerContentItem:FC<WorkerItemProps> = ({
  onClick, data, moveToClick, setSelectable, setWorkerIdForMoving,
  setIdForCloseSwipe, idForCloseSwipe, moreAndMoveModal, selectableItem,
}) => {
  const { colors } = useTheme();
  const { t } = useTranslation();
  const ref = useRef<Swipeable>();

  useEffect(() => {
    if (moreAndMoveModal === true && ref && ref.current) {
      ref.current.close();
    }
  }, [ moreAndMoveModal ]);

  useEffect(() => {
    if (idForCloseSwipe !== data.id) {
      ref.current?.close();
    }
  }, [
    idForCloseSwipe,
  ]);

  return (

    <TouchableOpacity
      onPress={ onClick }
      onLongPress={ () => { setSelectable(true); setWorkerIdForMoving(data.id); } }
      disabled={ selectableItem }
      delayLongPress={ 250 }
    >
      <Swipeable
        ref={ ref }
        renderRightActions={ dragX => !selectableItem && (
          <RightSwipeWorkerItem
            dragX={ dragX }
            moveToClick={ moveToClick }
            setWorkerIdForMoving={ () => setWorkerIdForMoving(data.id) }
          />
        ) }
        enabled={ !selectableItem }
        onSwipeableRightWillOpen={ () => setIdForCloseSwipe(data.id) }
      >
        <View
          style={ [ styles.container, { backgroundColor: colors.backgroundSelectedItem }] }
        >
          <View>
            <View style={ styles.rows }>
              <View style={ [ styles.indicator,
                {
                  backgroundColor: data.status === STATUS_WORKER_TYPE.ACTIVE
                    ? mainColors.green : mainColors.red,
                }] }
              />
              <Typography fontSize={ 16 } bold text={ data.name } color={ colors.text } />
            </View>
            <View
              style={ [ styles.rows, styles.mT ] }
            >
              <View style={ [ styles.columns ] }>
                <Typography
                  color={ colors.secondaryText }
                  fontSize={ 12.8 }
                  align="left"
                  text={ t('screens.Workers.minAvg') }
                />
                <View style={{ flexDirection: 'row' }}>
                  <Typography
                    color={ colors.text }
                    bold
                    fontSize={ 14 }
                    text={ String(NumberToSystemMeasuring(data.hashrate[TimeTranslate.min as TIME_CHART_TYPES],
                      3).newValue) }
                  />
                  <Typography
                    color={ colors.secondaryText }
                    bold
                    fontSize={ 14 }
                    text={ NumberToSystemMeasuring(data.hashrate[TimeTranslate.min as TIME_CHART_TYPES], 3).prefix }
                    style={{ marginLeft: perfectSize(3) }}
                  />
                </View>
              </View>
              <View style={ [ styles.columns ] }>
                <Typography
                  color={ colors.secondaryText }
                  fontSize={ 12.8 }
                  align="left"
                  text={ t('screens.Workers.hourAvg') }
                />
                <View style={{ flexDirection: 'row' }}>
                  <Typography
                    color={ colors.text }
                    bold
                    fontSize={ 14 }
                    text={ String(NumberToSystemMeasuring(data.hashrate[TimeTranslate.hour as TIME_CHART_TYPES],
                      3).newValue) }
                  />
                  <Typography
                    color={ colors.secondaryText }
                    bold
                    fontSize={ 14 }
                    text={ NumberToSystemMeasuring(data.hashrate[TimeTranslate.hour as TIME_CHART_TYPES], 3).prefix }
                    style={{ marginLeft: perfectSize(3) }}
                  />
                </View>
              </View>
              <View style={ [ styles.columns ] }>
                <Typography
                  color={ colors.secondaryText }
                  fontSize={ 12.8 }
                  align="left"
                  text={ t('screens.Workers.dayAvg') }
                />
                <View style={{ flexDirection: 'row' }}>
                  <Typography
                    color={ colors.text }
                    bold
                    fontSize={ 14 }
                    text={ String(NumberToSystemMeasuring(data.hashrate[TimeTranslate.day as TIME_CHART_TYPES],
                      3).newValue) }
                  />
                  <Typography
                    color={ colors.secondaryText }
                    bold
                    fontSize={ 14 }
                    text={ NumberToSystemMeasuring(data.hashrate[TimeTranslate.day as TIME_CHART_TYPES], 3).prefix }
                    style={{ marginLeft: perfectSize(3) }}
                  />
                </View>
              </View>
            </View>
          </View>
          <View style={ styles.icon }>
            <Chevron fill={ colors.secondaryText } />
          </View>
        </View>
      </Swipeable>

    </TouchableOpacity>

  );
};

export default WorkerContentItem;
