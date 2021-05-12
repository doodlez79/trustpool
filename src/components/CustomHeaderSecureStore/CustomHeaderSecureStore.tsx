import React, { FC, useEffect, useRef } from 'react';

import { View, Animated } from 'react-native';
import Lock from 'Icons/Lock.svg';
import { Typography } from 'components/Typography';
import NavigationBack from 'components/NavigationBack/NavigationBack';
import { mainColors } from 'constants/colors';
import { useTheme } from 'helpers/ThemeManage';
import { useTranslation } from 'react-i18next';

export enum TYPE_SCREEN {
  LOCK = 'LOCK',
  NORMAL ='NORMAL'
}

type Props = {
  active: boolean
  backArrow: boolean
  skipAction: (() => void) | null
  cb: (() => void) | null
  type: TYPE_SCREEN,
  navigationBack: () => void

}

const CustomHeaderSecureStore:FC<Props> = ({
  active, skipAction, type, navigationBack, cb, backArrow,
}) => {
  const anim = useRef(new Animated.Value(0)).current;
  const { t } = useTranslation();
  const { colors } = useTheme();
  useEffect(() => {
    if (active) {
      Animated.timing(anim, {
        toValue: 1,
        duration: 100,
        useNativeDriver: true,
      }).start(() => {
        if (cb) {
          cb();
        }
      });
    }
  }, [ active ]);

  const translateX = anim.interpolate({
    inputRange: [ 0, 1 ],
    outputRange: [ 0, 5 ],
  });

  return (
    <View style={{
      height: 44,
      paddingHorizontal: 16,
      flexDirection: 'row',
      alignItems: 'center',
    }}
    >
      <View style={{ flex: 1 }}>
        {
          backArrow && (
            <NavigationBack onClick={ navigationBack } text="" />
          )
        }

      </View>
      <View style={{
        flex: 2, alignItems: 'center', justifyContent: 'center',
      }}
      >
        {
          type === TYPE_SCREEN.LOCK
            ? (
              <View style={{
                height: 16,
                width: 16,
                position: 'relative',
                justifyContent: 'flex-end',
                alignItems: 'center',
              }}
              >
                <Animated.View style={{
                  transform: [{
                    translateX,
                  }],
                  position: 'absolute',
                  width: 14,
                  height: 14,
                  top: 2,
                  left: -2.5,
                  zIndex: 99999,
                }}
                >
                  <Lock fill={ colors.text } />
                </Animated.View>
                <View style={{
                  backgroundColor: colors.text,
                  alignItems: 'center',
                  justifyContent: 'center',
                  height: 8,
                  width: 8,
                  borderRadius: 2,
                }}
                />

              </View>
            )
            : (<Typography bold text={ t('screens.SecureCodeScreen.nameScreen') } color={ colors.text } />)
        }

      </View>
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'flex-end' }}>
        {
          skipAction && (
            <Typography
              text={ t('screens.SecureCodeScreen.skip') }
              fontSize={ 14 }
              onPress={ skipAction }
              color={ mainColors.blue }
            />
          )
        }

      </View>
    </View>
  );
};

export default CustomHeaderSecureStore;
