import React, { useEffect, useRef } from 'react';

import {
  Animated, View,
} from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';

import { TIME_CHART_TYPES } from 'entitiesState/general';
import { useTheme } from 'helpers/ThemeManage';
import { perfectSize } from 'helpers/PerfectSize';
import { useTranslation } from 'react-i18next';
import Chart from 'components/Chart/Chart';
import { Typography } from '../Typography';
import { TabItemChart } from '../TabItemChart';

import { WidgetHashrateChartProps } from './WidgetHashrate.types';

import {
  TimeChartTranslate,
} from './utils';

import { styles } from './styles';

const WidgetHashrateChart: React.FC<WidgetHashrateChartProps> = ({
  data,
  changeChartInfo,
  currentTime,
  loading,
  hashAvg,
  hashPrefix,
  titleAlign = 'left',
}) => {
  const { t } = useTranslation();
  const animPreloaderChart = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (loading) {
      Animated.timing(animPreloaderChart, {
        toValue: 1,
        useNativeDriver: true,
        duration: 500,
      }).start();
    } else {
      Animated.timing(animPreloaderChart, {
        toValue: 0,
        useNativeDriver: true,
        duration: 500,
      }).start();
    }
  }, [ loading ]);

  const { colors } = useTheme();

  return (
    <View
      style={ [ styles.container, { backgroundColor: colors.backgroundSelectedItem }] }
    >
      <View>

        <View
          style={ styles.title }
        >
          <View style={{
            flexDirection: 'row',
            alignItems: 'center',
            position: 'relative',
          }}
          >
            <Typography
              style={{ marginRight: perfectSize(5), width: '100%' }}
              bold
              align={ titleAlign }
              color={ colors.text }
              text={ t('screens.Home.chartTitle') }
              fontSize={ 16 }
            />
          </View>
        </View>

        <View style={ styles.timeRow }>
          {
            // eslint-disable-next-line max-len
            (Object.keys(TimeChartTranslate) as [ TIME_CHART_TYPES.HOUR, TIME_CHART_TYPES.DAY, TIME_CHART_TYPES.MIN]).map(item => (
              <TouchableOpacity key={ item } onPress={ () => changeChartInfo(item) }>
                <TabItemChart
                  text={ t(`screens.Home.widgetChart.${TimeChartTranslate[item]}`) }
                  active={ item === currentTime }
                />
              </TouchableOpacity>
            ))
          }
        </View>
        <View style={ [ styles.line, { backgroundColor: colors.backgroundColor }] } />

      </View>
      <View
        style={{
          alignItems: 'center',
          paddingBottom: 30,
        }}
      >
        <Chart
          loading={ loading }
          data={ data[currentTime] }
          hashAvg={ hashAvg }
          hashPrefix={ hashPrefix }
          currentTime={ currentTime }
        />
      </View>
    </View>
  );
};

export default React.memo(WidgetHashrateChart);
