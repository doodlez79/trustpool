import {
  LANG_TYPE,
  RemindSettingListType,
  SendAddressRequestType,
  SettingsInfo,
  TITLE_SETTING_INFO, TITLE_SETTING_INFO_NORMAL,
  VerifyCodeEmailRequestType,
  WalletBalanceType,
} from 'entitiesState/settings';
import mapper from 'helpers/Mapper';
import validationResponseFromApi from 'helpers/ValidationResponseFromApi';
import { ERROR_ACTIONS } from 'types/ActionTypes';
import { titleByBusiness } from 'constants/titleByBusiness';
import { COIN_TYPE } from 'entitiesState/currency';
import { RequestMethods } from 'services/API/types';
import axios from 'axios';
import { APIService } from '../API';
import {
  schemaLang,
  schemaSendAddressRequest,
  schemaSettingValidation,
  schemaVerifyCodeEmail,
  schemaVerifyPassword,
  schemaWalletBalance,
} from './SchemaType';
import {
  mapperGetWalletBalance, mapperRemindSettingList, mapperRequestVerifyCode, mapperSetting,
} from './schemaMapper';

export default class SettingsServices {
  constructor(private readonly apiService: APIService) {}

  verifyOldPassword(data: { password: string, verifyCode: string, verifyType: string }) {
    const newDataRequest = mapper<{ password: string, verifyCode: string, verifyType: '' }>(data,
      { verifyType: 'verify_type', password: 'password', verifyCode: 'verify_code' });

    return this.apiService.post('/setting/password/signin/verify', newDataRequest).then(res => {
      const newData = mapper<{token: string}>(res, { token: 'token' });
      const validate = validationResponseFromApi<{token: string}>(schemaVerifyPassword);
      const valid = validate(newData);

      if (!valid) {
        const error = { ...validate.errors, type: ERROR_ACTIONS.VALIDATION };

        throw error;
      }

      return newData;
    }).catch(e => {
      throw e;
    });
  }

  setLang(lang: LANG_TYPE) {
    return this.apiService.get('/account/user/info', {}, { 'accept-language': lang })
      .then(res => {
        const newData = mapper<{lang: LANG_TYPE}>(res, { lang: 'lang' });
        const validate = validationResponseFromApi<{lang: LANG_TYPE}>(schemaLang);
        const valid = validate(newData);

        if (!valid) {
          const error = { ...validate.errors, type: ERROR_ACTIONS.VALIDATION };

          throw error;
        }

        return newData;
      }).catch(e => {
        throw e;
      });
  }

  setNewPassword(data: { token: string, password: string }) {
    return this.apiService.put('/setting/password/signin', data).catch(e => {
      throw e;
    });
  }

  sendCodeToEmail(data: { business: string }) {
    return this.apiService.get('/common/email/code', data).catch(e => {
      throw e;
    });
  }

  verifyCodeEmail(data: { coin: string, emailCaptcha: string, verifyCode: string, verifyType: string }) {
    const requestData = mapper<VerifyCodeEmailRequestType>(data, mapperRequestVerifyCode);
    const validate = validationResponseFromApi<VerifyCodeEmailRequestType>(schemaVerifyCodeEmail);
    const valid = validate(requestData);

    if (valid) {
      // eslint-disable-next-line max-len
      return this.apiService.post('/wallet/withdraw/address/verify', requestData).catch(e => {
        throw e;
      });
    }

    const error = { ...validate.errors, type: ERROR_ACTIONS.VALIDATION };
    throw error;
  }

  sendAddressPayment(data: { coin: string, token: string, withdrawAddress: string }) {
    const requestData = mapper<SendAddressRequestType>(data, {
      coin: 'coin',
      token: 'token',
      withdrawAddress: 'withdraw_address',
    });

    const validate = validationResponseFromApi<SendAddressRequestType>(schemaSendAddressRequest);
    const valid = validate(requestData);

    if (valid) {
      return this.apiService.post('/wallet/withdraw/address', requestData).catch(e => {
        throw e;
      });
    }

    const error = { ...validate.errors, type: ERROR_ACTIONS.VALIDATION };

    throw error;
  }

  getWalletBalance() {
    return this.apiService.get('/wallet/balance').then(res => {
      const newData = res.map(item => mapper<WalletBalanceType>(item, mapperGetWalletBalance)) as WalletBalanceType[];
      const validate = validationResponseFromApi<WalletBalanceType[]>(schemaWalletBalance);
      const valid = validate(newData);

      if (!valid) {
        const error = { ...validate.errors, type: ERROR_ACTIONS.VALIDATION };

        throw error;
      }

      return newData;
    }).catch(e => {
      throw e;
    });
  }

  changeMinPayment(data: { value: string, coin: string }) {
    const requestData = mapper<{coin: string, ['minimal_payment']: string}>(data, {
      coin: 'coin',
      value: 'minimal_payment',
    });

    return this.apiService.put('/wallet/withdraw/minimal/payment', requestData).catch(e => {
      throw e;
    });
  }

  getTogglingData() {
    return axios('https://storage.yandexcloud.net/trustpool/features.json', {
      method: RequestMethods.GET,
    }).then(res => res.data).catch(e => {
      const err = { ...e, type: ERROR_ACTIONS.NETWORK };
      throw (err);
    });
  }

  getSettingNotification() {
    return this.apiService.get('/setting/hashremind').then(res => {
      const newData = res.map(item => {
        const mapperData = mapper<Omit<SettingsInfo, 'units'>>(item, mapperSetting);
        const newMapperData = mapperData.remindSettingList.map(el => {
          const dataAfterMapper = mapper<Omit<RemindSettingListType, 'title'>>(el, mapperRemindSettingList);
          return {
            ...dataAfterMapper,
            title: titleByBusiness[el.business],
          };
        });

        return {
          coin: mapperData.coin,
          remindSettingList: newMapperData,
        };
      });
      const validate = validationResponseFromApi<Omit<SettingsInfo[], 'units'>>(schemaSettingValidation);
      const valid = validate(newData);

      if (!valid) {
        const error = { ...validate.errors, type: ERROR_ACTIONS.VALIDATION };

        throw error;
      }

      return newData;
    }).catch(e => {
      throw e;
    });
  }

  getUnitsSettings() {
    return this.apiService.get('/setting/hashremind/unit').then(res => res).catch(e => {
      throw e;
    });
  }

  changeStatusSettings(data: {business: TITLE_SETTING_INFO, coin: COIN_TYPE, isOn: number }) {
    const newData = mapper(data, { business: 'business', coin: 'coin', isOn: 'is_on' });
    return this.apiService.post('/setting/hashremind/status', newData).then(res => res).catch(e => {
      throw e;
    });
  }

  changeSettings(data:{[x in TITLE_SETTING_INFO_NORMAL]: {value: number, unit: string}}, coin: COIN_TYPE) {
    const objectData = {
      float_rate: data[TITLE_SETTING_INFO_NORMAL.FLUCTUATION].value,
      hashrate_threshold: data[TITLE_SETTING_INFO_NORMAL.THRESHOLDS].value,
      unit: data[TITLE_SETTING_INFO_NORMAL.THRESHOLDS].unit,
      workernum_threshold: data[TITLE_SETTING_INFO_NORMAL.ACTIVE_WORKERS].value,
      coin,
    };

    return this.apiService.post('/setting/hashremind', objectData).then(res => res).catch(e => {
      throw e;
    });
  }
}
