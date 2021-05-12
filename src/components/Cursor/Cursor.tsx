import * as React from 'react';
import {
  View, StyleSheet, Animated,
} from 'react-native';
import {
  PanGestureHandler,
} from 'react-native-gesture-handler';
import { svgPathProperties } from 'svg-path-properties';
import {
  FC, useEffect, useRef,
} from 'react';
import SVGPathYFromX from 'helpers/SVGPathYFromX/SVGPathYFromX';

type CursorProps = {
  d: string;
  r: number;
  borderWidth: number;
  borderColor: string;
  w: number
  h: number
  onPress: (value: boolean) => void
  onChange: (x: number) => void
}

const Cursor:FC<CursorProps> = ({
  d, r, borderWidth, borderColor, w, h = 180, onChange, onPress,
}) => {
  const refCursor = useRef<View>(null);
  const radius = r + borderWidth / 2;
  const x = useRef(new Animated.Value(0)).current;
  const state = useRef(new Animated.Value(0)).current;
  const properties = svgPathProperties(d);

  const moveCursorBinary = (value: number) => {
    const x = value - borderWidth;
    const y = SVGPathYFromX(properties, x);

    onChange(x - borderWidth);

    if (refCursor.current !== null && !Number.isNaN(y - borderWidth / 2) && !Number.isNaN(x - borderWidth / 2)) {
      refCursor.current.setNativeProps({
        top: y - borderWidth / 2,
        left: x - borderWidth / 2,
      });
    }
  };

  useEffect(() => {
    x.addListener(({ value }) => {
      if (value < w && value > 9) {
        moveCursorBinary(value);
      }
    });
  }, [ d ]);

  const showIndicator = (opacity: number) => {
    if (refCursor.current !== null) {
      refCursor.current.setNativeProps({ opacity });
    }
  };

  return (
    <View style={{
      height: h,
      position: 'absolute',
      width: w,
    }}
    >

      <PanGestureHandler
        onHandlerStateChange={ ({ nativeEvent }) => {
          if (nativeEvent.state === 1 || nativeEvent.state === 3 || nativeEvent.state === 5) {
            showIndicator(0);
            onPress(false);
          } else if (nativeEvent.state === 2) {
            onPress(true);
            showIndicator(1);
          }
        } }
        onGestureEvent={ Animated.event([{ nativeEvent: { x, state } }], { useNativeDriver: false }) }
      >
        <Animated.View
          style={ StyleSheet.absoluteFill }
          onMoveShouldSetResponder={ () => false }
          onResponderTerminationRequest={ () => {
            showIndicator(0);
            return true;
          } }
          onStartShouldSetResponder={ () => true }
          onResponderRelease={ () => {
            onPress(false);
            showIndicator(0);
          } }
          onResponderGrant={ evt => {
            const touchLocation = evt.nativeEvent.locationX;
            showIndicator(1);
            onPress(true);
            moveCursorBinary(touchLocation);
          } }
        />

      </PanGestureHandler>
      <Animated.View
        ref={ refCursor }
        style={{
          opacity: 0,
          position: 'absolute',
          alignItems: 'center',
          justifyContent: 'center',

        }}
      >
        <View style={{
          width: radius * 2,
          height: radius * 2,
          borderRadius: radius,
          borderColor,
          borderWidth,
          backgroundColor: borderColor,
        }}
        />
        <View style={{
          width: 2,
          height: h,
          backgroundColor: borderColor,
        }}
        />
      </Animated.View>
    </View>

  );
};

export default Cursor;
