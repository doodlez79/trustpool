import React, {
  FC, useEffect, useMemo, useRef, useState,
} from 'react';

import {
  Animated, Dimensions, StyleSheet, TextInput, View, Platform,
} from 'react-native';
import * as Haptics from 'expo-haptics';
import Svg, {
  Defs, LinearGradient, Path, Stop,
} from 'react-native-svg';
import { ChartType } from 'types/chart';
import { format, fromUnixTime } from 'date-fns';
import Cursor from 'components/Cursor/Cursor';
import { TIME_CHART_TYPES } from 'entitiesState/general';
import { mainColors } from 'constants/colors';
import { useTheme } from 'helpers/ThemeManage';
import Tap from 'Icons/Tap.svg';
import { GetLinePath } from 'helpers/GetLinePath/GetLinePath';
import { Typography } from 'components/Typography';
import { FORMAT, FORMAT_DAYS } from 'constants/format';
import Yaxis from 'components/Yaxis/Yaxis';
import { useTranslation } from 'react-i18next';
import { Preloader } from 'components/Preloader';

type ChartProps = {
  data: Omit<ChartType, 'time'> & {start: number[]}
  currentTime: TIME_CHART_TYPES
  hashPrefix?: string
  hashAvg?: number
  loading: boolean
}
const { width } = Dimensions.get('window');

const strokeWidth = 2;
// const padding = 20;
const CURSOR_RADIUS = 2;
const STROKE_WIDTH = CURSOR_RADIUS / 2;
const positionChart = 0;
const heightChart = 145;
const widthChart = width - positionChart;

const getTime = {
  [TIME_CHART_TYPES.DAY]: 30,
  [TIME_CHART_TYPES.MIN]: 72,
  [TIME_CHART_TYPES.HOUR]: 48,
};

const Chart: FC<ChartProps> = ({
  data, loading, currentTime, hashPrefix, hashAvg,
}) => {
  const { colors } = useTheme();
  const { t } = useTranslation();

  const [ press, setPress ] = useState(false);

  const animation = useRef(new Animated.Value(0)).current;
  const animationPreloader = useRef(new Animated.Value(0)).current;

  const refHashRate = useRef<TextInput>(null);
  const refWorkers = useRef<TextInput>(null);
  const regReject = useRef<TextInput>(null);
  const refTime = useRef<TextInput>(null);

  const dataTransform = useMemo(() => data.hashrate
    .slice(data.hashrate.length - getTime[currentTime])
    .map((item, index) => ({
      date: index,
      value: item,
    })), [ data, currentTime ]);

  const newDataHashRate = [
    { date: 0, value: 0 },
    ...dataTransform,
  ];

  useEffect(() => {
    if (loading) {
      Animated.timing(animationPreloader, {
        duration: 200,
        toValue: 0,
        useNativeDriver: true,
      }).start();
    } else {
      Animated.timing(animationPreloader, {
        duration: 300,
        toValue: 1,
        useNativeDriver: true,
      }).start();
    }
  }, [ loading ]);

  const workersData = (data.workers || []).slice(data.hashrate.length - getTime[currentTime]);
  const timeData = (data.time ? data.time : data.start).slice(data.hashrate.length - getTime[currentTime]);
  const opacityPreloader = animationPreloader.interpolate({
    inputRange: [ 0, 1 ],
    outputRange: [ 1, 0 ],
  });
  const dataTransformRejectRate = data.rejectRate
    .slice(data.hashrate.length - getTime[currentTime])
    .map((item, index) => ({
      date: index,
      value: item,
    }));

  const maxRejectRate = Math.max(...dataTransformRejectRate.map(el => el.value));

  const avgRejectRate = useMemo(() => data.rejectRate.reduce((acc, item) => {
    acc += item;
    return acc;
  }, 0) / data.rejectRate.length, [ data.rejectRate ]);

  const avgHashRate = useMemo(() => dataTransform.reduce((acc, item) => {
    acc += item.value;
    return acc;
  }, 0) / data.hashrate.length, [ data.hashrate ]);

  const max = Math.max(...dataTransform.map(el => el.value));

  let maxCeil = max;
  if (max < 50 && max > 0) {
    maxCeil = Math.ceil(max / 5) * 5;
  }
  if (max >= 50 && max < 100 && max > 0) {
    maxCeil = Math.ceil(max / 20) * 20;
  }
  if (max >= 100 && max > 0) {
    maxCeil = Math.ceil(max / 50) * 50;
  }

  const paddingTest = heightChart - ((max * heightChart) / maxCeil);

  const HashRateLine = GetLinePath(newDataHashRate,
    widthChart,
    heightChart,
    Number.isNaN(paddingTest) ? heightChart : paddingTest);

  const rejectRateHeight = ((heightChart * maxRejectRate) / 100) < 2 ? 3 : (heightChart * maxRejectRate) / 100;

  const RejectRateLine = GetLinePath(dataTransformRejectRate, widthChart, rejectRateHeight, 0);

  const onChange = (x: number) => {
    const xPosition = Math.ceil(HashRateLine.scaleX.invert(x));

    if (refHashRate.current !== null && xPosition > 0 && dataTransform[xPosition]) {
      refHashRate.current!.setNativeProps({
        text: newDataHashRate[xPosition + 1].value.toString(),
      });
    }
    if (regReject.current !== null && xPosition > 0 && dataTransformRejectRate[xPosition]) {
      regReject.current.setNativeProps({
        text: dataTransformRejectRate[xPosition].value.toFixed(3),
      });
    }
    // eslint-disable-next-line max-len
    if (refWorkers.current !== null && xPosition > 0 && workersData.length > 0 && Boolean(workersData[xPosition])) {
      refWorkers.current.setNativeProps({
        text: workersData[xPosition].toString(),
      });
    }

    if (refTime.current !== null && xPosition > 0 && timeData[xPosition]) {
      refTime.current.setNativeProps({
        text: format(fromUnixTime(timeData[xPosition]), currentTime === TIME_CHART_TYPES.DAY
          ? FORMAT_DAYS
          : FORMAT),
      });
    }
  };

  const onPressChart = (value: boolean) => {
    setPress(value);
    if (value) {
      if (Platform.OS === 'ios') {
        Haptics.selectionAsync();
      }

      return Animated.timing(animation, {
        duration: 300,
        useNativeDriver: true,
        toValue: 1,
      }).start();
    }
    return Animated.timing(animation, {
      duration: 300,
      useNativeDriver: true,
      toValue: 0,
    }).start();
  };

  const translateY = animation.interpolate({
    inputRange: [ 0, 1 ],
    outputRange: [ -100, 5 ],
  });

  const opacity = animation.interpolate({
    inputRange: [ 0, 1 ],
    outputRange: [ 1, 0 ],
  });

  const opacityYaix = animation.interpolate({
    inputRange: [ 0, 1 ],
    outputRange: [ 0, 1 ],
  });
  const clickTranslateY = animation.interpolate({
    inputRange: [ 0, 1 ],
    outputRange: [ 0, 100 ],
  });

  return (
    <>

      <Animated.View
        pointerEvents="none"
        style={ [ StyleSheet.absoluteFill, {
          zIndex: 99999999,
          alignItems: 'center',
          opacity: opacityPreloader,
          justifyContent: 'center',
          backgroundColor: colors.backgroundSelectedItem,
        }] }
      >
        <Preloader heightContainer={ 48 } stickStyle={{ backgroundColor: mainColors.blue }} />
      </Animated.View>
      <Animated.View
        pointerEvents="none"
        style={{
          position: 'absolute',
          bottom: 7,
          zIndex: 99999,
          alignItems: 'center',
          justifyContent: 'center',
          flexDirection: 'row',
          width: '100%',
          transform: [{
            translateY: clickTranslateY,
          }],
        }}
      >
        <View style={{
          height: 16,
          width: 14,
          marginRight: 5,
        }}
        >
          <Tap fill={ colors.secondaryText } />
        </View>

        <Typography
          text={ t('Chart.click') }
          fontSize={ 12.8 }
          color={ colors.secondaryText }
        />
      </Animated.View>
      <View
        style={{
          overflow: 'hidden',
        }}
      >

        <Animated.View
          style={{
            marginTop: 10,
            marginHorizontal: 20,
            justifyContent: 'center',
            alignItems: 'center',

            transform: [{
              translateY,
            }],
          }}
        >
          <View style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
          }}
          >
            <View style={{ flex: 1, alignItems: 'center' }}>
              <Typography text={ t('Chart.hashRate') } color={ colors.text } fontSize={ 12.8 } />
              <View style={{
                flexDirection: 'row',
                alignItems: 'center',
              }}
              >
                <TextInput
                  editable={ false }
                  style={{
                    fontFamily: 'OpenSans-Bold',
                    color: mainColors.green,
                    marginRight: 3,
                  }}
                  ref={ refHashRate }
                />
                <Typography text={ hashPrefix } bold fontSize={ 12.8 } color={ colors.text } />
              </View>
            </View>
            {
            workersData.length > 1 && (
              <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                <Typography
                  text={ t('Chart.Workers') }
                  color={ colors.text }
                  fontSize={ 12.8 }
                />
                <TextInput
                  editable={ false }
                  style={{
                    fontFamily: 'OpenSans-Bold',
                    color: colors.text,
                    textAlign: 'center',
                  }}
                  ref={ refWorkers }
                />
              </View>
            )
          }

            <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
              <Typography text={ t('Chart.rejectRate') } color={ colors.text } fontSize={ 12.8 } />
              <View style={{
                flexDirection: 'row',
                alignItems: 'center',
              }}
              >
                <TextInput
                  editable={ false }
                  style={{
                    fontFamily: 'OpenSans-Bold',
                    color: mainColors.red,
                  }}
                  ref={ regReject }
                />
                <Typography text="%" bold fontSize={ 12.8 } color={ colors.text } />
              </View>
            </View>
          </View>

          <TextInput
            editable={ false }
            style={{
              fontSize: 12.8,
              fontFamily: 'OpenSans-Regular',
              color: colors.secondaryText,
            }}
            ref={ refTime }
          />

        </Animated.View>

        <Animated.View
          pointerEvents="none"
          style={{
            opacity,
            position: 'absolute',
            zIndex: 9999999,
            width: '100%',
            height: '100%',
            left: 0,
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
        >
          <View style={{
            flex: 1,
            justifyContent: 'center',

          }}
          >
            <View style={{
              marginBottom: 10,
              alignItems: 'center',
            }}
            >
              <View style={{ }}>
                <Typography text={ t(`Chart.${currentTime}`) } color={ colors.text } style={{ }} />
              </View>

              <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 5 }}>
                <Typography
                  text={ String(hashAvg) }
                  bold
                  fontSize={ 36 }
                  color={ hashPrefix ? mainColors.green : mainColors.red }
                />
                <Typography text={ ` ${hashPrefix}H/S` } bold fontSize={ 24 } color={ colors.text } />
              </View>

            </View>
            {
              Boolean(avgRejectRate) && (
              <View style={{ alignItems: 'center' }}>
                <Typography text={ t('Chart.rejectRate') } fontSize={ 12.8 } color={ colors.text } />
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                  <Typography
                    text={ avgRejectRate.toFixed(3).toString() }
                    bold
                    fontSize={ 14 }
                    color={ mainColors.red }
                  />
                  <Typography text="%" bold fontSize={ 12.8 } color={ colors.text } />
                </View>
              </View>
              )
            }

          </View>

        </Animated.View>

        <View
          onStartShouldSetResponder={ () => true }
          style={{
            width: widthChart,
            height: heightChart,
            marginLeft: -10,
            overflow: 'hidden',
            // backgroundColor: 'green',
          }}
        >

          {
            avgHashRate > 0 && (
              <Animated.View
                pointerEvents="none"
                style={{
                  opacity: opacityYaix,
                  left: 9,
                  top: 5,
                  height: '105%',
                  width: 50,
                  position: 'absolute',
                  zIndex: 99999,
                }}
              >
                <Yaxis data={ newDataHashRate } countTicks={ 3 } />
              </Animated.View>
            )
          }

          <Svg style={ StyleSheet.absoluteFill }>
            <Defs>
              <LinearGradient id="gradient" x1="50%" y1="0%" x2="50%" y2="100%">
                <Stop offset="0%" stopColor={ mainColors.green } stopOpacity={ press ? '0.6' : '0.3' } />
                <Stop offset="100%" stopColor={ colors.backgroundSelectedItem } />
              </LinearGradient>
            </Defs>
            <Path
              fill="transparent"
              stroke={ `#00D58E${press ? 'E6' : '59'}` }
              { ...{ d: HashRateLine.line, strokeWidth } }
            />

            <Path
              d={ `${HashRateLine.line}L ${widthChart} ${heightChart} L ${0} ${heightChart}` }
              fill="url(#gradient)"
            />

          </Svg>
          <Cursor
            onPress={ onPressChart }
            w={ widthChart }
            h={ heightChart }
            onChange={ onChange }
            r={ CURSOR_RADIUS }
            borderWidth={ STROKE_WIDTH }
            borderColor={ colors.text }
            { ...{ d: HashRateLine.line } }
          />
          <View style={{
            position: 'relative',
            zIndex: 99999999999,
            top: heightChart - rejectRateHeight,
          }}
          >
            <Svg style={{
              height: rejectRateHeight,
            }}
            >
              <Defs>
                <LinearGradient id="gradientReject" x1="50%" y1="0%" x2="50%" y2="100%">
                  <Stop offset="0%" stopColor={ mainColors.red } stopOpacity={ press ? '0.6' : '0.3' } />
                  <Stop offset="100%" stopColor={ colors.backgroundSelectedItem } stopOpacity={ 1 } />
                </LinearGradient>
              </Defs>

              <Path
                d={ `${RejectRateLine.line}L ${widthChart} ${rejectRateHeight} L ${0} ${rejectRateHeight}` }
                fill="url(#gradientReject)"
              />
              <Path
                fill="transparent"
                stroke={ `#DC3545${press ? 'E6' : '59'}` }
                { ...{ d: RejectRateLine.line, strokeWidth } }
              />
            </Svg>
          </View>

        </View>
      </View>
    </>
  );
};

export default Chart;
