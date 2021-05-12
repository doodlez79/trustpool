import { generateAsyncActions } from 'helpers/Redux/Redux';
import { createActionCreator } from 'deox';

import {
  COIN_TYPE, CurrencyTypeToState, CurrencysCourseType, CURRENCY_TYPE,
} from 'entitiesState/currency';
import { ActionMetaPromise } from 'types/ActionTypes';

const rootPrefix = '@Currency';

/** CurrencysInfo */
const prefixCurrencya = `${rootPrefix}/AllCurrencys`;
const GetCurrencysActionTypes = generateAsyncActions(prefixCurrencya);

export interface GetCurrencysAction {
  type: typeof GetCurrencysActionTypes.REQUEST;
  payload?: {
    loadingFlag?: boolean
  }
}
export interface GetCurrencysActionSuccessed {
  type: typeof GetCurrencysActionTypes.SUCCESSED;
  payload: Pick<CurrencyTypeToState, 'allCoins' | 'allValuts'>
}
export interface GetCurrencysActionFailedNetwork {
  type: typeof GetCurrencysActionTypes.FAILED_NETWORK;
}
export interface GetCurrencysActionFailedValidation {
  type: typeof GetCurrencysActionTypes.FAILED_VALIDATION;
}

const getCurrencysInfo = {
  request: createActionCreator(GetCurrencysActionTypes.REQUEST,
    resolve => (payload: GetCurrencysAction['payload']) => resolve(payload)),
  successed: createActionCreator(GetCurrencysActionTypes.SUCCESSED,
    resolve => (payload:GetCurrencysActionSuccessed['payload']) => resolve(payload)),
  failed: {
    network: createActionCreator(GetCurrencysActionTypes.FAILED_NETWORK),
    validation: createActionCreator(GetCurrencysActionTypes.FAILED_VALIDATION),
  },
};

/** CurrencysCourse */
const prefixCurrencysCourse = `${rootPrefix}/Course`;
const GetCurrencysCourseActionTypes = generateAsyncActions(prefixCurrencysCourse);

export interface GetCurrencysCourseAction {
  type: typeof GetCurrencysCourseActionTypes.REQUEST;
  payload: CURRENCY_TYPE
  meta: ActionMetaPromise
}
export interface GetCurrencysCourseActionSuccessed {
  type: typeof GetCurrencysCourseActionTypes.SUCCESSED;
  payload: CurrencysCourseType
}
export interface GetCurrencysCourseActionFailedNetwork {
  type: typeof GetCurrencysCourseActionTypes.FAILED_NETWORK;
}
export interface GetCurrencysCourseActionFailedValidation {
  type: typeof GetCurrencysCourseActionTypes.FAILED_VALIDATION;
}

const getCurrencysCourse = {
  request: createActionCreator(GetCurrencysCourseActionTypes.REQUEST,
    resolve => (payload:GetCurrencysCourseAction['payload'],
      meta: GetCurrencysCourseAction['meta']) => resolve(payload, meta)),
  successed: createActionCreator(GetCurrencysCourseActionTypes.SUCCESSED,
    resolve => (payload:GetCurrencysCourseActionSuccessed['payload']) => resolve(payload)),
  failed: {
    network: createActionCreator(GetCurrencysCourseActionTypes.FAILED_NETWORK),
    validation: createActionCreator(GetCurrencysCourseActionTypes.FAILED_VALIDATION),
  },
};

/** GetCurrentValute */
const prefixGetCurrentValute = `${rootPrefix}/CurrentValute`;
const GetCurrentValuteActionTypes = generateAsyncActions(prefixGetCurrentValute);

export interface GetCurrentValuteAction {
  type: typeof GetCurrentValuteActionTypes.REQUEST;
  payload?: { loadingFlag?: boolean }
}
export interface GetCurrentValuteActionSuccessed {
  type: typeof GetCurrentValuteActionTypes.SUCCESSED;
  payload: COIN_TYPE
}
export interface GetCurrentValuteActionFailedNetwork {
  type: typeof GetCurrentValuteActionTypes.FAILED_NETWORK;
}
export interface GetCurrentValuteActionFailedValidation {
  type: typeof GetCurrentValuteActionTypes.FAILED_VALIDATION;
}

const getCurrentValute = {
  request: createActionCreator(GetCurrentValuteActionTypes.REQUEST,
    resolve => (payload: GetCurrentValuteAction['payload']) => resolve(payload)),
  successed: createActionCreator(GetCurrentValuteActionTypes.SUCCESSED,
    resolve => (payload:GetCurrentValuteActionSuccessed['payload']) => resolve(payload)),
  failed: {
    network: createActionCreator(GetCurrentValuteActionTypes.FAILED_NETWORK),
    validation: createActionCreator(GetCurrentValuteActionTypes.FAILED_VALIDATION),
  },
};

/** ChangeCoinInfo */

const prefixChangeCoin = `${rootPrefix}/ChangeCoin`;
const ChangeCoinActionTypes = generateAsyncActions(prefixChangeCoin);

export interface ChangeCoinAction {
  type: typeof ChangeCoinActionTypes.REQUEST;
  payload: COIN_TYPE
  meta: ActionMetaPromise
}
export interface ChangeCoinActionSuccessed {
  type: typeof ChangeCoinActionTypes.SUCCESSED;
  payload:COIN_TYPE
}
export interface ChangeCoinActionFailedNetwork {
  type: typeof ChangeCoinActionTypes.FAILED_NETWORK;
}
export interface ChangeCoinActionFailedValidation {
  type: typeof ChangeCoinActionTypes.FAILED_VALIDATION;
}

const postChangeCoin = {
  request: createActionCreator(ChangeCoinActionTypes.REQUEST,
    resolve => (payload:ChangeCoinAction['payload'], meta: ChangeCoinAction['meta']) => resolve(payload, meta)),
  successed: createActionCreator(ChangeCoinActionTypes.SUCCESSED,
    resolve => (payload:ChangeCoinActionSuccessed['payload']) => resolve(payload)),
  failed: {
    network: createActionCreator(ChangeCoinActionTypes.FAILED_NETWORK),
    validation: createActionCreator(ChangeCoinActionTypes.FAILED_VALIDATION),
  },
};

/** setCurrentAccount */
const prefixSaveFiatCurrency = `${rootPrefix}/saveFiatCurrency`;

export interface SetCurrentFiatCurrencyAction {
  type: typeof prefixSaveFiatCurrency;
  payload: CURRENCY_TYPE
}

const saveFiatCurrency = createActionCreator(prefixSaveFiatCurrency,
  resolve => (payload:SetCurrentFiatCurrencyAction['payload']) => resolve(payload));

export {
  getCurrencysInfo, postChangeCoin, getCurrentValute, getCurrencysCourse, saveFiatCurrency,
};
