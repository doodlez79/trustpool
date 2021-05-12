import React, { FC } from 'react';

import {
  Dimensions, KeyboardAvoidingView, View, Platform,
} from 'react-native';
import Modal from 'react-native-modal';

import { perfectSize } from 'helpers/PerfectSize';

import { useTheme } from 'helpers/ThemeManage';

import { ModalComponentProps, POSITION_TYPE } from './types';

const { width: widthDevice } = Dimensions.get('window');

const ModalComponent: FC<ModalComponentProps> = ({
  modalVisible,
  setModalVisible,
  children,
  position = POSITION_TYPE.END,
  width = widthDevice,
  mb = 0,
  KeyboardAvoidingViewParam = false,
  backdropColor,
  moreBorder,
}) => {
  const { colors } = useTheme();
  return (
    <Modal
      onBackdropPress={ setModalVisible }
      isVisible={ modalVisible }
      swipeDirection={ [ 'down' ] }
      onSwipeComplete={ setModalVisible }
      propagateSwipe
      deviceHeight={ Dimensions.get('screen').height }
      backdropColor={ backdropColor || 'rgba(0,0,0,0.5)' }
      style={{
        borderRadius: 30,
        justifyContent: position,
        margin: 0,
        alignItems: 'center',
      }}
    >
      <KeyboardAvoidingView
        pointerEvents="box-none"
        keyboardVerticalOffset={ Platform.OS === 'android' ? -500 : 0 }
        behavior="padding"
        enabled={ KeyboardAvoidingViewParam }
      >

        <View
          style={{
            borderBottomLeftRadius: position === POSITION_TYPE.CENTER ? 10 : 0,
            borderBottomRightRadius: position === POSITION_TYPE.CENTER ? 10 : 0,
            borderTopLeftRadius: moreBorder ? 30 : 10,
            borderTopRightRadius: moreBorder ? 30 : 10,
            borderBottomEndRadius: moreBorder ? 30 : 0,
            borderBottomStartRadius: moreBorder ? 30 : 0,
            width: width || 'auto',
            margin: position === POSITION_TYPE.CENTER ? 8 : 0,
            minHeight: 200,
            backgroundColor: colors.backgroundColor,
            justifyContent: 'center',
            alignItems: 'center',
            marginBottom: mb,
          }}
        >
          {position !== POSITION_TYPE.CENTER && (
          <View
            style={{
              position: 'absolute',
              height: perfectSize(5),
              width: perfectSize(48),
              top: perfectSize(-10),
              borderRadius: 2.5,
              backgroundColor: '#F5F7FA',

            }}
          />
          )}
          {children}
        </View>
      </KeyboardAvoidingView>
    </Modal>
  );
};

export default ModalComponent;
