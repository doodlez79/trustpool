import React, {
  FC, useCallback, useEffect, useRef, useState,
} from 'react';
import {
  Dimensions,
  Keyboard,
  View,
} from 'react-native';
import { StackScreenProps } from '@react-navigation/stack';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';
import { useTranslation } from 'react-i18next';
import { useDispatch } from 'react-redux';
import { Actions } from 'ducks';

import { MainStackParamList } from 'navigation/Navigation.types';
import { Captcha } from 'components/Captcha';
import { RefTypesProps } from 'components/Captcha/types';
import { ModalComponent } from 'components/Modal';
import { POSITION_TYPE } from 'components/Modal/types';
import { HiddenKeyboardOutSideTab } from 'components/HiddenKeyboardOutSideTab';
import { Container } from 'components/Container';
import { AuthForm } from 'components/AuthForm';
import { Typography } from 'components/Typography';
import { mainColors } from 'constants/colors';
import { useTheme } from 'helpers/ThemeManage';
import { perfectSize } from 'helpers/PerfectSize';
import { AuthService, LinkingURLService } from 'services';

import { GeeTestTypes } from 'entitiesState/auth';
import { styles } from './styles';

export interface AuthProps extends StackScreenProps<MainStackParamList, 'Auth'>{}

const { width: deviceWidth } = Dimensions.get('window');

const AuthScreen:FC<AuthProps> = ({ navigation }) => {
  const dispatch = useDispatch();
  const [ readyCaptcha, setReadyCaptcha ] = useState(false);
  const [ geeTestData, setGeeTestData ] = useState<Nullable<GeeTestTypes>>(null);
  const [ modalCaptcha, setModalCaptcha ] = useState(false);
  const [ errorCode, setErrorCode ] = useState(0);
  const [ formData, setFormData ] = useState({ email: '', password: '' });
  const [ geeTestLoading, setGeeTestLoading ] = useState(false);
  const { t } = useTranslation();

  const goToNextPage = () => {
    navigation.replace('Main');
  };

  const updateGeeTestData = useCallback(formData => {
    setFormData(formData);
    setGeeTestLoading(true);
    AuthService.geeTest().then(res => {
      setGeeTestData(res);
      setGeeTestLoading(false);
    }).catch(() => {
      setGeeTestLoading(false);
    });
  }, []);

  useEffect(() => {
    if (geeTestData && formData && formData.email && formData.password) {
      setModalCaptcha(true);
    }
  }, [ geeTestData ]);

  const captchaRef = useRef<RefTypesProps>(null);

  const singInFunc = () => {
    if (readyCaptcha && captchaRef && captchaRef.current) {
      const result = captchaRef.current.handler();
      const resetCaptcha = captchaRef.current.reset;
      if (result) {
        result.then(res => dispatch(Actions.Auth.signIn.request({
          challenge: res.challenge,
          seccode: res.seccode,
          validate: res.validate,
          account: formData.email.trim(),
          password: formData.password,
        }, {
          resolve: () => {
            goToNextPage();
          },
          reject: errCode => {
            setErrorCode(errCode);
            setModalCaptcha(false);
            setReadyCaptcha(false);
            updateGeeTestData(resetCaptcha);
          },
        })));
      }
    }
  };
  useEffect(() => {
    if (readyCaptcha) {
      singInFunc();
    }
  }, [ readyCaptcha ]);
  const [ isKeyboardVisible, setKeyboardVisible ] = useState(false);

  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener(
      'keyboardDidShow',
      () => {
        setKeyboardVisible(true); // or some other action
      },
    );
    const keyboardDidHideListener = Keyboard.addListener(
      'keyboardDidHide',
      () => {
        setKeyboardVisible(false); // or some other action
      },
    );

    return () => {
      keyboardDidHideListener.remove();
      keyboardDidShowListener.remove();
    };
  }, []);

  const insets = useSafeAreaInsets();
  const { colors } = useTheme();

  return (
    <>
      <SafeAreaView style={{
        ...styles.safeAreaContainer,
        paddingBottom: insets.bottom + 20,
      }}
      >
        <HiddenKeyboardOutSideTab>

          <Container
            paddingSize={ 16 }
            style={ styles.container }
          >

            <View style={{
              flexDirection: 'row',
              justifyContent: 'center',
            }}
            >
              <Typography
                style={{
                  marginRight: perfectSize(5),
                }}
                fontSize={ 16 }
                color={ colors.text }
                align="center"
                text={ isKeyboardVisible ? '' : t('screens.Auth.description') }
              />
              <Typography
                style={ styles.linkText }
                onPress={ () => LinkingURLService.openURL('https://trustpool.ru/signup') }
                fontSize={ 16 }
                color={ mainColors.blue }
                align="center"
                text={ isKeyboardVisible ? '' : t('screens.Auth.linkDescription') }
              />
            </View>

            <AuthForm
              setErrors={ setErrorCode }
              loading={ geeTestLoading }
              setFormData={ value => updateGeeTestData(value) }
              setModalCaptcha={ value => setModalCaptcha(value) }
              disableBtn={ Boolean(geeTestData) }
              errorCode={ errorCode }
            />

          </Container>

        </HiddenKeyboardOutSideTab>
      </SafeAreaView>

      <ModalComponent
        width={ deviceWidth - perfectSize(16) }
        setModalVisible={ () => {
          setModalCaptcha(false);
          setReadyCaptcha(false);
        } }
        modalVisible={ modalCaptcha }
        position={ POSITION_TYPE.CENTER }
      >

        <Captcha
          onError={ () => {
            setReadyCaptcha(false);
            setModalCaptcha(false);
            updateGeeTestData(singInFunc);
          } }
          onSuccess={ () => {
            setModalCaptcha(false);
          } }
          onReady={ () => {
            setReadyCaptcha(true);
          } }
          ref={ captchaRef }
          config={ geeTestData! }
        />

      </ModalComponent>

    </>
  );
};

export default AuthScreen;
