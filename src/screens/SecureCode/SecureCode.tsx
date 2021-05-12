import React, {
  FC, useCallback, useEffect, useState,
} from 'react';

import {
  Alert, Dimensions, Platform, TouchableOpacity, View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import * as Haptics from 'expo-haptics';

import { Container } from 'components/Container';
import { Typography } from 'components/Typography';
import { useTheme } from 'helpers/ThemeManage';
import { mainColors } from 'constants/colors';
import { StackScreenProps } from '@react-navigation/stack';
import { MainStackParamList } from 'navigation/Navigation.types';
import { LocalAuthenticationServices } from 'services';
import { useDispatch, useSelector } from 'react-redux';
import { Actions, Selectors } from 'ducks';
import DeleteSecureCode from 'Icons/DeleteSecureCode.svg';
import TouchId from 'Icons/TouchId.svg';
import FaceId from 'Icons/FaceId.svg';
import { Preloader } from 'components/Preloader';
import { LocalAuthenticationResult } from 'expo-local-authentication';
import { useFocusEffect } from '@react-navigation/core';
import CustomHeaderSecureStore, { TYPE_SCREEN } from 'components/CustomHeaderSecureStore/CustomHeaderSecureStore';
import { useTranslation } from 'react-i18next';
import { styles } from './styles';

const COUNT_NUMBER = 4;
const DEFAULT_SCREEN = 'BottomNav';
const COUNT_ATTEMPTS = 5;
const DELAY = 1000;

export const renderName = (): {[x: string]: string} | null => {
  if (Platform.OS === 'android') {
    return {
      finger: 'Fingerprint',
      face: 'Face ID',
    };
  }

  if (Platform.OS === 'ios') {
    return {
      finger: 'Touch ID',
      face: 'Face ID',
    };
  }
  return null;
};

const { width } = Dimensions.get('window');

const typeIcon: {[x: string]: (colors: string) => React.ReactNode} = {
  finger: (color: string) => <TouchId fill={ color } />,
  face: (color: string) => <FaceId fill={ color } />,
};

export interface SecureCodeScreenProps extends StackScreenProps<MainStackParamList, 'SecureCodeScreen'>{}

const SecureCodeScreen:FC<SecureCodeScreenProps> = ({ navigation, route }) => {
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const [ firstCode, setFirstCode ] = useState('');
  const [ repeatCode, setRepeatCode ] = useState('');
  const [ lock, setLock ] = useState(false);
  const [ count, setCount ] = useState(COUNT_ATTEMPTS);
  const [ repeatCodeFlag, setRepeatCodeFlag ] = useState(false);
  const isSecureCode = useSelector(Selectors.Setting.isSecureCode);
  const typeLogin = useSelector(Selectors.Setting.getTypeLogin);
  const currentTypeLogin = useSelector(Selectors.Setting.getCurrentTypeLogin);
  const [ error, setError ] = useState('');
  const [ loading, setLoading ] = useState(false);
  const [ offBiometric, setOffBiometric ] = useState(false);

  const onChangeCode = (e: string) => {
    Haptics.selectionAsync();
    if (!repeatCodeFlag) {
      if (firstCode.length < COUNT_NUMBER) {
        setFirstCode(s => s + e);
      }
    } else if (repeatCode.length < 4) {
      setRepeatCode(s => s + e);
    }
  };

  const getCode = useCallback(async () => {
    setLoading(true);
    const code = await LocalAuthenticationServices.getCodeFromSecureStore();
    return code;
  }, []);

  const setOptionSecureStore = (options:{
    typeLogin: string[],
    visitSecureCodeScreen?: boolean,
    isSecureCodeAuth: boolean, currentTypeLogin: string, resetCode?: boolean}) => {
    dispatch(Actions.Setting.setSecureStoreData({ ...options }));
  };

  useFocusEffect(useCallback(() => {
    (async () => {
      const result = await LocalAuthenticationServices.hardwareAsync();
      setOffBiometric(!result);
      setOptionSecureStore({
        typeLogin,
        isSecureCodeAuth: isSecureCode,
        currentTypeLogin: result ? currentTypeLogin : '',
      });
    })();
  }, []));

  const ResetPassword = ({
    title = 'Вы использовали 5 попыток',
    message = 'Щас вас выкинет на авторизацию!',
  }: {title?: string, message?: string}) => {
    Alert.alert(
      title,
      message,
      [
        {
          text: 'Ok',
          onPress: () => dispatch(Actions.Auth.signOut.request({
            resolve: () => {
              LocalAuthenticationServices.saveCodeToSecureStore('').then(() => {
                setOptionSecureStore({
                  isSecureCodeAuth: false,
                  currentTypeLogin: '',
                  typeLogin,
                  resetCode: true,
                  visitSecureCodeScreen: false,
                });
              });
              navigation.replace('Auth');
            },
            reject: () => {
              LocalAuthenticationServices.saveCodeToSecureStore('').then(() => {
                setOptionSecureStore({
                  isSecureCodeAuth: false,
                  currentTypeLogin: '',
                  typeLogin,
                  resetCode: true,
                  visitSecureCodeScreen: false,
                });
              });
              navigation.replace('Auth');
            },
          })),
        },
        {
          text: 'Cancel',
          style: 'cancel',
        },
      ],
    );
  };

  const resetCode = useCallback(() => {
    setFirstCode('');
    setRepeatCode('');
    setRepeatCodeFlag(false);
    setLoading(false);
    setError('');
  }, []);

  const AuthWithLoginType = (cb: (res: LocalAuthenticationResult) => void) => {
    LocalAuthenticationServices.authenticateAsync({
      promptMessage: t('screens.SecureCodeScreen.authBimetricTitle'),
      fallbackLabel: t('screens.SecureCodeScreen.cancel'),
      cancelLabel: t('screens.SecureCodeScreen.cancel'),
      disableDeviceFallback: true,
    }).then((res:LocalAuthenticationResult) => {
      cb(res);
    }).catch(() => {
      setOffBiometric(true);
      setLoading(false);
    });
  };

  useEffect(() => {
    if (count < COUNT_ATTEMPTS) {
      setError(t('screens.SecureCodeScreen.errorNoRightCode', { repeatCount: count }));
    }
    if (count === 0) {
      ResetPassword({
        title: t('screens.SecureCodeScreen.notRightCodeTitle'),
        message: t('screens.SecureCodeScreen.notRightCodeDescription'),
      });
    }
  }, [ count ]);

  useFocusEffect(useCallback(() => {
    if (currentTypeLogin && isSecureCode
      && !(route.params && route.params.changeCode)
      && !(route.params && route.params.onlyCode)) {
      AuthWithLoginType(res => {
        if (res.success) {
          setLoading(true);
          if (route.params && route.params.removeSecureCode) {
            LocalAuthenticationServices.saveCodeToSecureStore('').then(() => {
              setOptionSecureStore({ isSecureCodeAuth: false, currentTypeLogin: '', typeLogin });
            });
          }
          setTimeout(() => {
            // setLoading(false);
            setLock(true);
          }, DELAY);
        } else {
          setLoading(false);
        }
      });
    }

    return () => {
      resetCode();
    };
  }, []));

  const loginWithTypeLogin = () => {
    AuthWithLoginType(res => {
      setLoading(true);
      if (res.success) {
        setTimeout(() => {
          setLock(true);
        }, DELAY);
      } else {
        setLoading(false);
      }
    });
  };

  useEffect(() => {
    if (firstCode.length === COUNT_NUMBER && !isSecureCode) {
      setRepeatCodeFlag(true);
    }
    if (firstCode.length === COUNT_NUMBER && isSecureCode) {
      getCode().then(code => {
        if (firstCode === code) {
          setLoading(true);
          setTimeout(() => {
            setLoading(false);
            setLock(true);
            if (route.params && route.params.removeSecureCode) {
              return LocalAuthenticationServices.saveCodeToSecureStore('').then(() => {
                setOptionSecureStore({ isSecureCodeAuth: false, currentTypeLogin: '', typeLogin });
              });
            }

            if (route.params && route.params.changeCode) {
              return LocalAuthenticationServices.saveCodeToSecureStore('').then(() => {
                resetCode();
                setOptionSecureStore({ isSecureCodeAuth: false, currentTypeLogin, typeLogin });
              });
            }
            return null;
          }, DELAY);
        } else {
          setTimeout(() => {
            setLoading(false);
            setCount(s => s - 1);
            setFirstCode('');
          }, DELAY);
        }
      });
    }
  }, [ firstCode ]);

  useEffect(() => {
    if (repeatCode.length === 4 && !isSecureCode) {
      if (repeatCode === firstCode) {
        LocalAuthenticationServices.saveCodeToSecureStore(repeatCode).then(() => {
          if (route.params && route.params.disableRequestBiometric && route.params.nextPath) {
            setOptionSecureStore({
              isSecureCodeAuth: true, typeLogin, currentTypeLogin, resetCode: false,
            });
            navigation.replace(route.params.nextPath);
          } else if (!offBiometric) {
            Alert.alert(
              renderName()![typeLogin[0] as string],
              t('screens.SecureCodeScreen.requestBioDescription', { type: renderName()![typeLogin[0]] }),
              [
                {
                  text: 'Ok',
                  onPress: () => {
                    if (route.params && !route.params.checkBiometryAfterSet) {
                      AuthWithLoginType(res => {
                        if (res.success) {
                          setOptionSecureStore({
                            isSecureCodeAuth: true, typeLogin, currentTypeLogin: typeLogin[0], resetCode: false,
                          });
                          if (route.params && route.params.nextPath) {
                            resetCode();
                            navigation.replace(route.params.nextPath);
                          } else {
                            resetCode();
                            navigation.replace(DEFAULT_SCREEN);
                          }
                        }
                      });
                    } else if (route.params && route.params.nextPath) {
                      setOptionSecureStore({
                        isSecureCodeAuth: true, typeLogin, currentTypeLogin: typeLogin[0], resetCode: false,
                      });
                      resetCode();
                      navigation.replace(route.params.nextPath);
                    } else {
                      setOptionSecureStore({
                        isSecureCodeAuth: true, typeLogin, currentTypeLogin: typeLogin[0], resetCode: false,
                      });
                      resetCode();
                      navigation.replace(DEFAULT_SCREEN);
                    }
                  },
                },
                {
                  text: 'Cancel',
                  onPress: () => {
                    setOptionSecureStore({
                      isSecureCodeAuth: true, typeLogin, currentTypeLogin: '', resetCode: false,
                    });
                    if (route.params && route.params.nextPath) {
                      resetCode();
                      navigation.replace(route.params.nextPath);
                    } else {
                      resetCode();
                      navigation.replace(DEFAULT_SCREEN);
                    }
                  },
                  style: 'cancel',
                },
              ],
            );
          } else {
            setOptionSecureStore({
              isSecureCodeAuth: true, typeLogin, currentTypeLogin: '', resetCode: false,
            });
            if (route.params && route.params.nextPath) {
              resetCode();
              navigation.replace(route.params.nextPath);
            } else {
              resetCode();
              navigation.replace(DEFAULT_SCREEN);
            }
          }
        });
      } else {
        setRepeatCode('');
        setError(t('screens.SecureCodeScreen.notMatch'));
      }
    }
  }, [ repeatCode ]);

  const deleteCode = () => {
    if (!repeatCodeFlag) {
      return setFirstCode(s => s.substring(0, s.length - 1));
    }
    return setRepeatCode(s => s.substring(0, s.length - 1));
  };
  const { colors } = useTheme();

  const renderActiveCircle = (index: number) => {
    if (!repeatCodeFlag) {
      return index + 1 <= firstCode.length ? colors.text : colors.backgroundSelectedItem;
    }
    return index + 1 <= repeatCode.length ? colors.text : colors.backgroundSelectedItem;
  };

  const renderTitle = () => {
    if (isSecureCode) {
      return (
        <Typography
          text={ t('screens.SecureCodeScreen.enterCode') }
          fontSize={ 14 }
          color={ colors.secondaryText }
        />
      );
    }
    if (repeatCodeFlag) {
      return (
        <Typography
          text={ t('screens.SecureCodeScreen.repeatCode') }
          fontSize={ 14 }
          color={ colors.secondaryText }
        />
      );
    }
    return (
      <Typography
        text={ t('screens.SecureCodeScreen.setCode') }
        fontSize={ 14 }
        color={ colors.secondaryText }
      />
    );
  };
  return (
    <SafeAreaView style={{
      flex: 1,
    }}
    >
      <CustomHeaderSecureStore
        navigationBack={ () => navigation.goBack() }
        active={ lock }
        cb={ () => {
          if (route.params && route.params.changeCode) {
            return null;
          } if ((Boolean(route.params) && !!route.params.nextPath) && !(route.params && route.params.changeCode)) {
            return navigation.replace(route.params.nextPath);
          }
          resetCode();
          return navigation.replace(DEFAULT_SCREEN);
        } }
        backArrow={ Boolean(route.params && route.params.nextPath) }
        skipAction={ (Boolean(route.params && !route.params.disableSkip) && isSecureCode)
        || Boolean(route.params && !route.params.disableSkip)
          ? () => navigation.replace(DEFAULT_SCREEN) : null }
        type={ !isSecureCode ? TYPE_SCREEN.NORMAL : TYPE_SCREEN.LOCK }
      />
      <Container paddingSize={ width / 6 } style={{ flex: 1, marginTop: 40 }}>
        <View style={{
          alignItems: 'center',
        }}
        >
          <View style={{
            alignItems: 'center',
            position: 'relative',
            minHeight: 70,
          }}
          >
            <View style={{
              marginBottom: 20,
            }}
            >
              {
                renderTitle()
              }
            </View>

            {
              loading
                ? <Preloader heightContainer={ 24 } stickStyle={{ backgroundColor: mainColors.blue }} />
                : (
                  <View style={{
                    flexDirection: 'row',
                  }}
                  >
                    {
                    Array(COUNT_NUMBER).fill(0).map((el, index) => (
                      <View
                        key={ String(index) }
                        style={{
                          width: 16,
                          height: 16,
                          marginHorizontal: 10,
                          borderRadius: 8,
                          backgroundColor: renderActiveCircle(index),
                        }}
                      />
                    ))
                  }
                  </View>
                )
            }

            {
              Boolean(error) && (
                <View style={{
                  position: 'absolute',
                  bottom: -15,
                }}
                >
                  <Typography text={ error } color={ mainColors.red } fontSize={ 12.8 } />
                </View>

              )
            }

          </View>
        </View>
        <View style={{
          flex: 1,
          alignItems: 'center',
          justifyContent: 'center',
        }}
        >
          <View style={{
            flexWrap: 'wrap',
            justifyContent: 'space-between',
            alignItems: 'center',
            flexDirection: 'row',
          }}
          >
            {
              Array(9).fill(0).map((el, index) => (
                <TouchableOpacity
                  onPress={ () => onChangeCode((index + 1).toString()) }
                  key={ String(index) }
                  style={{ ...styles.numberItem, backgroundColor: colors.backgroundSelectedItem }}
                >
                  <Typography text={ `${index + 1}` } color={ colors.text } bold fontSize={ 24 } />
                </TouchableOpacity>
              ))
            }

            <TouchableOpacity
              onPress={ isSecureCode ? () => ResetPassword({
                title: t('screens.SecureCodeScreen.resetPassCodeTitle'),
                message: t('screens.SecureCodeScreen.resetPassCodeDescription'),
              }) : () => {} }
              style={{
                ...styles.numberItem,
                backgroundColor: colors.backgroundColor,
                padding: 5,
              }}
            >
              {
                isSecureCode && (
                  <Typography text={ t('screens.SecureCodeScreen.exit') } color={ colors.text } bold fontSize={ 12 } />
                )
              }

            </TouchableOpacity>

            <TouchableOpacity
              onPress={ () => onChangeCode((0).toString()) }
              style={{ ...styles.numberItem, backgroundColor: colors.backgroundSelectedItem }}
            >
              <Typography text="0" color={ colors.text } bold fontSize={ 24 } />
            </TouchableOpacity>
            {
              Boolean(currentTypeLogin) && firstCode.length === 0
              && !(route.params && route.params.changeCode)
              && !(route.params && route.params.onlyCode)
              && !offBiometric
                ? (
                  <TouchableOpacity
                    onPress={ currentTypeLogin ? loginWithTypeLogin : () => {} }
                    style={{
                      ...styles.numberItem,
                      backgroundColor: colors.backgroundColor,
                      padding: 15,
                    }}
                  >
                    {Boolean(currentTypeLogin) && (
                      typeIcon[currentTypeLogin as string](colors.text)
                    )}
                  </TouchableOpacity>
                )
                : (
                  <TouchableOpacity
                    onPress={ deleteCode }
                    style={{ ...styles.numberItem, backgroundColor: colors.backgroundColor, padding: 15 }}
                  >
                    <DeleteSecureCode fill={ colors.text } />
                  </TouchableOpacity>
                )
            }

          </View>
        </View>
      </Container>
    </SafeAreaView>
  );
};

export default SecureCodeScreen;
