import * as LocalAuthenticationExpo from 'expo-local-authentication';
import * as SecureStore from 'expo-secure-store';
import { LocalAuthenticationOptions } from 'expo-local-authentication/src/LocalAuthentication.types';

const typeLoginEnter = [ '', 'finger', 'face', 'biometric' ];

export class LocalAuthentication {
  hardwareAsync = async () => {
    const hasHardware = await LocalAuthenticationExpo.hasHardwareAsync();

    const isEnrolled = await LocalAuthenticationExpo.isEnrolledAsync();

    return isEnrolled && hasHardware;
  };

  authenticateAsync = async (options:LocalAuthenticationOptions) => {
    const checkLocalAuth = await this.hardwareAsync();
    if (checkLocalAuth) {
      const result = await LocalAuthenticationExpo.authenticateAsync(options);
      return result;
    }
    // eslint-disable-next-line no-throw-literal
    throw { error: '' };
  }

  supportAuthType = async () => {
    const type = await LocalAuthenticationExpo.supportedAuthenticationTypesAsync();

    return type.map(el => typeLoginEnter[el]);
  }

  saveCodeToSecureStore = async (value: string) => {
    await SecureStore.setItemAsync('secureCode', value);
  }

  deleteCodeToSecureStore = async () => {
    await SecureStore.deleteItemAsync('secureCode');
  }

  getCodeFromSecureStore = async () => {
    const result = await SecureStore.getItemAsync('secureCode');
    if (result) {
      return result;
    }
    return null;
  }
}
