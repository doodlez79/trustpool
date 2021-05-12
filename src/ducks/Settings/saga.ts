import {
  call,
  put,
  takeLatest,
  select,
  getContext,
} from 'redux-saga/effects';

import { ERROR_ACTIONS } from 'types/ActionTypes';
import { ActionType } from 'deox';
import {
  LANG_TYPE, SettingsInfo, UnitsTypeResponse, WalletBalanceType,
} from 'entitiesState/settings';
import { LocalAuthenticationServices, Types as ServiceTypes } from 'services';
import { findWalletInfoByCurrentCoin } from 'helpers/FindWalletInfoByCurentCoin';
import { signOut } from '../Auth/actions';
import { getTokenChangePassword, getTokenAddressChange, getWalletInfo } from './selectors';
import {
  changeLangApi,
  setNewPassword,
  verifyOldPassword,
  getTrottlingData,
  getCodeEmail,
  verifyCodeEmail,
  sendAddressPayment,
  getWalletBalance,
  changeMinPayment,
  getSettingNotification, setSecureStoreDataError,
  getUnits, setSettingsFullInfo, changeStatus, changeSettings, secureStoreInit, setSecureStoreData,
} from './actions';

function* secureStoreInitTask() {
  try {
    const isHaveFacesOrFinger: string = yield call([ LocalAuthenticationServices, 'hardwareAsync' ]);
    const isHasSecureCode: string = yield call([ LocalAuthenticationServices, 'getCodeFromSecureStore' ]);
    let type = [ '' ];
    if (isHaveFacesOrFinger) {
      type = yield call([ LocalAuthenticationServices, 'supportAuthType' ]);
    }
    yield put(setSecureStoreData({ typeLogin: type as string[], isSecureCodeAuth: Boolean(isHasSecureCode) }));
  } catch (err) {
    yield put(setSecureStoreDataError(err));
  }
}

function* verifyOldPasswordTask(action: ActionType<typeof verifyOldPassword.request>) {
  const SettingService: ServiceTypes['Settings'] = yield getContext('settings');
  const { resolve, reject } = action.meta;
  try {
    const data: {token: string} = yield call([ SettingService, 'verifyOldPassword' ], action.payload);

    yield put(verifyOldPassword.successed(data));

    if (resolve) {
      resolve();
    }
  } catch (err) {
    if (err.type === ERROR_ACTIONS.VALIDATION) {
      yield put(verifyOldPassword.failed.validation());
    }
    if (err.type === ERROR_ACTIONS.NETWORK) {
      yield put(verifyOldPassword.failed.network());
      if (reject) {
        reject(err.code);
      }
    }
  }
}

function* setNewPasswordTask(action: ActionType<typeof setNewPassword.request>) {
  const SettingService: ServiceTypes['Settings'] = yield getContext('settings');
  const { resolve, reject } = action.meta;

  const tokenPassword: string = yield select(getTokenChangePassword);
  try {
    yield call([ SettingService, 'setNewPassword' ], { ...action.payload, token: tokenPassword });

    yield put(setNewPassword.successed());
    yield put(signOut.successed());
    if (resolve) {
      resolve();
    }
  } catch (err) {
    if (err.type === ERROR_ACTIONS.VALIDATION) {
      yield put(setNewPassword.failed.validation());
    }
    if (err.type === ERROR_ACTIONS.NETWORK) {
      yield put(setNewPassword.failed.network());
      if (reject) {
        reject(err.code);
      }
    }
  }
}
function* changeLangTask(action: ActionType<typeof changeLangApi.request>) {
  const SettingService: ServiceTypes['Settings'] = yield getContext('settings');

  const { resolve } = action.meta;

  try {
    const data:{lang: LANG_TYPE} = yield call([ SettingService, 'setLang' ], action.payload);
    yield put(changeLangApi.successed(data.lang));
    if (resolve) {
      resolve();
    }
  } catch (err) {
    if (err.type === ERROR_ACTIONS.VALIDATION) {
      yield put(changeLangApi.failed.validation());
    }
    if (err.type === ERROR_ACTIONS.NETWORK) {
      yield put(changeLangApi.failed.network());
    }
  }
}

function* getCodeEmailTask() {
  const SettingService: ServiceTypes['Settings'] = yield getContext('settings');

  try {
    yield call([ SettingService, 'sendCodeToEmail' ], { business: 'change_withdraw_address' });
    yield put(getCodeEmail.successed());
  } catch (err) {
    if (err.type === ERROR_ACTIONS.VALIDATION) {
      yield put(getCodeEmail.failed.validation());
    }
    if (err.type === ERROR_ACTIONS.NETWORK) {
      yield put(getCodeEmail.failed.network());
    }
  }
}

function* verifyCodeEmailTask(action: ActionType<typeof verifyCodeEmail.request>) {
  const SettingService: ServiceTypes['Settings'] = yield getContext('settings');
  const { resolve, reject } = action.meta;
  const {
    code, gaCode, verifyType, coin,
  } = action.payload;
  try {
    const data: {token: string} = yield call([ SettingService, 'verifyCodeEmail' ],
      {
        coin, emailCaptcha: code, verifyCode: gaCode, verifyType,
      });
    yield put(verifyCodeEmail.successed(data));
    if (resolve) {
      resolve();
    }
  } catch (err) {
    if (err.type === ERROR_ACTIONS.VALIDATION) {
      yield put(verifyCodeEmail.failed.validation());
    }
    if (err.type === ERROR_ACTIONS.NETWORK) {
      yield put(verifyCodeEmail.failed.network());
      if (reject) {
        reject(err.code);
      }
    }
  }
}

function* sendAddressPaymentTask(action: ActionType<typeof sendAddressPayment.request>) {
  const SettingService: ServiceTypes['Settings'] = yield getContext('settings');
  const { address, coin } = action.payload;
  const { resolve, reject } = action.meta;
  const token: string = yield select(getTokenAddressChange);
  try {
    yield call([ SettingService, 'sendAddressPayment' ],
      { token, coin, withdrawAddress: address });
    yield put(sendAddressPayment.successed());
    if (resolve) {
      resolve();
    }
  } catch (err) {
    if (err.type === ERROR_ACTIONS.VALIDATION) {
      yield put(sendAddressPayment.failed.validation());
    }
    if (err.type === ERROR_ACTIONS.NETWORK) {
      yield put(sendAddressPayment.failed.network());
      if (reject) {
        reject(err.code);
      }
    }
  }
}
function* getWalletBalanceTask() {
  const SettingService: ServiceTypes['Settings'] = yield getContext('settings');
  try {
    const data: WalletBalanceType[] = yield call([ SettingService, 'getWalletBalance' ]);
    yield put(getWalletBalance.successed(data));
  } catch (err) {
    if (err.type === ERROR_ACTIONS.VALIDATION) {
      yield put(getWalletBalance.failed.validation());
    }
    if (err.type === ERROR_ACTIONS.NETWORK) {
      yield put(getWalletBalance.failed.network());
    }
  }
}

function* changeMinPaymentTask(action: ActionType<typeof changeMinPayment.request>) {
  const SettingService: ServiceTypes['Settings'] = yield getContext('settings');
  const { resolve } = action.meta;
  const { id, coin } = action.payload;
  const wallet: WalletBalanceType[] = yield select(getWalletInfo);
  const currentWallet = findWalletInfoByCurrentCoin(wallet, coin);
  const value = currentWallet.minimalPaymentChoices!.find(item => item.value === id)!;

  try {
    yield call([ SettingService, 'changeMinPayment' ], { value: value.label || '', coin });
    yield put(changeMinPayment.successed());
    if (resolve) {
      resolve();
    }
  } catch (err) {
    if (err.type === ERROR_ACTIONS.VALIDATION) {
      yield put(changeMinPayment.failed.validation());
    }
    if (err.type === ERROR_ACTIONS.NETWORK) {
      yield put(changeMinPayment.failed.network());
    }
  }
}

function* getSettingNotificationTask() {
  const SettingService: ServiceTypes['Settings'] = yield getContext('settings');

  try {
    const data:Omit<SettingsInfo[], 'units'> = yield call([ SettingService, 'getSettingNotification' ]);
    const units:UnitsTypeResponse = yield call([ SettingService, 'getUnitsSettings' ]);

    const newData = data.map(item => {
      if (units[item.coin]) {
        return {
          ...item,
          units: units[item.coin],
        };
      }
      return item;
    }) as SettingsInfo[];

    yield put(setSettingsFullInfo.successed(newData));
  } catch (err) {
    if (err.type === ERROR_ACTIONS.VALIDATION) {
      yield put(getSettingNotification.failed.validation());
    }
    if (err.type === ERROR_ACTIONS.NETWORK) {
      yield put(getSettingNotification.failed.network());
    }
  }
}

function* getUnitsTask() {
  const SettingService: ServiceTypes['Settings'] = yield getContext('settings');

  try {
    yield call([ SettingService, 'getUnitsSettings' ]);

    yield put(getUnits.successed());
  } catch (err) {
    if (err.type === ERROR_ACTIONS.VALIDATION) {
      yield put(getUnits.failed.validation());
    }
    if (err.type === ERROR_ACTIONS.NETWORK) {
      yield put(getUnits.failed.network());
    }
  }
}

function* changeStatusSettingsTask(action: ActionType<typeof changeStatus.request>) {
  const SettingService: ServiceTypes['Settings'] = yield getContext('settings');

  const { resolve, reject } = action.meta;

  try {
    yield call([ SettingService, 'changeStatusSettings' ], action.payload);

    yield put(changeStatus.successed());
    if (resolve) {
      resolve();
    }
  } catch (err) {
    if (err.type === ERROR_ACTIONS.VALIDATION) {
      yield put(changeStatus.failed.validation());
    }
    if (err.type === ERROR_ACTIONS.NETWORK) {
      yield put(changeStatus.failed.network());
      if (reject) {
        reject(err.code);
      }
    }
  }
}

function* changeSettingTask(action: ActionType<typeof changeSettings.request>) {
  const SettingService: ServiceTypes['Settings'] = yield getContext('settings');

  const { resolve, reject } = action.meta;

  try {
    yield call([ SettingService, 'changeSettings' ], action.payload, action.payload.coin);

    yield put(changeSettings.successed());
    if (resolve) {
      resolve();
    }
  } catch (err) {
    if (err.type === ERROR_ACTIONS.VALIDATION) {
      yield put(changeSettings.failed.validation());
    }
    if (err.type === ERROR_ACTIONS.NETWORK) {
      yield put(changeSettings.failed.network());
      if (reject) {
        reject(err.code);
      }
    }
  }
}

function* getTrottlingDataTask() {
  const SettingService: ServiceTypes['Settings'] = yield getContext('settings');

  try {
    const data:{
      easterEgg: boolean
    } = yield call([ SettingService, 'getTogglingData' ]);

    yield put(getTrottlingData.successed(data));
  } catch (err) {
    if (err.type === ERROR_ACTIONS.VALIDATION) {
      yield put(getTrottlingData.failed.validation());
    }
    if (err.type === ERROR_ACTIONS.NETWORK) {
      yield put(getTrottlingData.failed.network());
    }
  }
}

export default function* () {
  yield takeLatest(verifyOldPassword.request, verifyOldPasswordTask);
  yield takeLatest(getTrottlingData.request, getTrottlingDataTask);
  yield takeLatest(changeSettings.request, changeSettingTask);
  yield takeLatest(getUnits.request, getUnitsTask);
  yield takeLatest(changeStatus.request, changeStatusSettingsTask);
  yield takeLatest(getSettingNotification.request, getSettingNotificationTask);
  yield takeLatest(getWalletBalance.request, getWalletBalanceTask);
  yield takeLatest(sendAddressPayment.request, sendAddressPaymentTask);
  yield takeLatest(changeMinPayment.request, changeMinPaymentTask);
  yield takeLatest(verifyCodeEmail.request, verifyCodeEmailTask);
  yield takeLatest(getCodeEmail.request, getCodeEmailTask);
  yield takeLatest(changeLangApi.request, changeLangTask);
  yield takeLatest(setNewPassword.request, setNewPasswordTask);
  yield takeLatest(secureStoreInit, secureStoreInitTask);
}
