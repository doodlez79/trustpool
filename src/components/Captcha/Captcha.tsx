import React, {
  forwardRef, useEffect, useImperativeHandle, useRef, useState,
} from 'react';
import { Platform, View } from 'react-native';
import { WebView } from 'react-native-webview';

import { CaptchaTypes } from 'entitiesState/auth';

import { CaptchaProps, RefTypesProps } from './types';

import { getJsCode } from './utils';

import { styles } from './Captcha.styles';

let resolve: ((value: CaptchaTypes) => void) | null = null;

const Captcha = forwardRef<RefTypesProps, CaptchaProps>(({
  config,
  onReady = () => {},
  onSuccess = () => {},
  onError = () => {},
}, ref) => {
  const [ captchaData, setCaptchaData ] = useState<CaptchaTypes | null>(null);
  const webviewRef = useRef<WebView>(null);

  useEffect(() => {
    if (captchaData && resolve) {
      resolve(captchaData);
    }
  }, [ captchaData ]);

  useImperativeHandle(ref, () => ({
    handler: () => {
      if (webviewRef.current) {
        webviewRef.current.postMessage('handler');

        return new Promise<CaptchaTypes>(resolve1 => {
          resolve = resolve1;
        });
      }
      return null;
    },
    reset: () => {
      if (webviewRef.current) {
        webviewRef.current.postMessage('reset');
        return true;
      }
      return null;
    },
  }));

  const onMessageFunc = (data: {type: string, data: any}) => {
    const { type, data: CaptchaData } = data;
    if (type === 'onReady' && onReady) {
      onReady();
    }
    if (type === 'onSuccess' && onSuccess) {
      setCaptchaData({
        seccode: CaptchaData.geetest_seccode,
        validate: CaptchaData.geetest_validate,
        challenge: CaptchaData.geetest_challenge,
      });
      onSuccess(CaptchaData as CaptchaTypes);
    }
    if (type === 'onError' && onError) {
      onError();
    }
  };

  let html = require('./index.html');

  if (Platform.OS === 'android') {
    html = { uri: 'https://trustpool.website.yandexcloud.net/captcha.html' };
  }

  return (
    <View style={ styles.container } onStartShouldSetResponder={ () => true }>
      {
        config && (
          <WebView
            ref={ webviewRef }
            originWhitelist={ [ '*' ] }
            source={ html }
            overScrollMode="always"
            setSupportMultipleWindows
            injectedJavaScript={ getJsCode(config) }
            onMessage={ event => {
              const data = JSON.parse(event.nativeEvent.data);
              onMessageFunc(data);
            } }
          />
        )
      }

    </View>
  );
});

export default Captcha;
