import React, { useEffect, useRef } from 'react';

import {
  View, Image, Animated,
} from 'react-native';

import { useTheme } from 'helpers/ThemeManage';

const BackgroundApp = ({ isFlagShow }: {isFlagShow: boolean}) => {
  const anim = useRef(new Animated.Value(0)).current;
  const { colors } = useTheme();

  useEffect(() => {
    if (isFlagShow) {
      Animated.timing(anim, {
        toValue: 1,
        duration: 200,
        useNativeDriver: true,
      }).start();
    } else {
      Animated.timing(anim, {
        toValue: 0,
        duration: 200,
        useNativeDriver: true,
      }).start();
    }
  }, [ isFlagShow ]);

  const opacity = anim.interpolate({
    inputRange: [ 0, 1 ],
    outputRange: [ 0, 1 ],
  });

  return (
    <Animated.View
      pointerEvents={ isFlagShow ? 'auto' : 'none' }
      style={{
        justifyContent: 'center',
        opacity,
        position: 'absolute',
        flex: 1,
        width: '100%',
        height: '100%',
        backgroundColor: colors.backgroundColor,
        zIndex: 99999,
        alignItems: 'center',
      }}
    >
      <View style={{
        alignItems: 'center',

      }}
      >
        <Image
          resizeMethod="resize"
          style={{ width: 300, height: 75 }}
          source={ require('../../../assets/app-splash.png') }
        />
      </View>

    </Animated.View>
  );
};

export default React.memo(BackgroundApp);
