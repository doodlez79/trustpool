import { createActionCreator } from 'deox';

import {
  LANG_TYPE, SettingsInfo, THEME_TYPE,
  TITLE_SETTING_INFO, TITLE_SETTING_INFO_NORMAL, WalletBalanceType,
} from 'entitiesState/settings';
import { generateAsyncActions } from 'helpers/Redux/Redux';
import { ActionMetaPromise } from 'types/ActionTypes';
import { COIN_TYPE } from 'entitiesState/currency';

const rootPrefix = '@settings';
/** changeLangApp */

export interface ChangeLangAppActionSuccessed {
  type: typeof ChangeLangApiTypesAction.SUCCESSED;
  payload: LANG_TYPE
}
const changeLangApp = createActionCreator(`${rootPrefix}/changeLangApp`,
  resolve => (payload: ChangeLangAppActionSuccessed['payload']) => resolve(payload));

/** changeLangAPi */
const prefixChangeLangApi = `${rootPrefix}/changeLangApi`;
const ChangeLangApiTypesAction = generateAsyncActions(prefixChangeLangApi);

export interface ChangeLangActionAction {
  type: typeof ChangeLangApiTypesAction.REQUEST;
  payload: LANG_TYPE
  meta: ActionMetaPromise
}
export interface ChangeLangActionSuccessed {
  type: typeof ChangeLangApiTypesAction.SUCCESSED;
  payload: LANG_TYPE
}
export interface ChangeLangActionFailedNetwork {
  type: typeof ChangeLangApiTypesAction.FAILED_NETWORK;
}
export interface ChangeLangActionFailedValidation {
  type: typeof ChangeLangApiTypesAction.FAILED_VALIDATION;
}

const changeLangApi = {
  request: createActionCreator(ChangeLangApiTypesAction.REQUEST,
    resolve => (payload:ChangeLangActionAction['payload'],
      meta: ChangeLangActionAction['meta']) => resolve(payload, meta)),
  successed: createActionCreator(ChangeLangApiTypesAction.SUCCESSED,
    resolve => (payload: ChangeLangActionSuccessed['payload']) => resolve(payload)),
  failed: {
    network: createActionCreator(ChangeLangApiTypesAction.FAILED_NETWORK),
    validation: createActionCreator(ChangeLangApiTypesAction.FAILED_VALIDATION),
  },
};

/** changeTheme */
const prefixChangeTheme = `${rootPrefix}/changeTheme`;

export interface ChangeThemeAction {
  type: typeof prefixChangeTheme;
  payload: THEME_TYPE
}

const changeTheme = createActionCreator(prefixChangeTheme,
  resolve => (payload: ChangeThemeAction['payload']) => resolve(payload));

/** changePassword */

/** verifyOldPassword */
const prefixVerifyOldPassword = `${rootPrefix}/verifyOldPassword`;
const verifyOldPasswordActionTypes = generateAsyncActions(prefixVerifyOldPassword);

export interface VerifyOldPasswordAction {
  type: typeof verifyOldPasswordActionTypes.REQUEST;
  payload: {password: string, verifyCode?: string, verifyType: string }
  meta: ActionMetaPromise<number>
}
export interface VerifyOldPasswordActionSuccessed {
  type: typeof verifyOldPasswordActionTypes.SUCCESSED;
  payload: {token: string}
}
export interface VerifyOldPasswordActionFailedNetwork {
  type: typeof verifyOldPasswordActionTypes.FAILED_NETWORK;
}
export interface VerifyOldPasswordActionFailedValidation {
  type: typeof verifyOldPasswordActionTypes.FAILED_VALIDATION;
}

const verifyOldPassword = {
  request: createActionCreator(verifyOldPasswordActionTypes.REQUEST,
    resolve => (payload:VerifyOldPasswordAction['payload'],
      meta: VerifyOldPasswordAction['meta']) => resolve(payload, meta)),
  successed: createActionCreator(verifyOldPasswordActionTypes.SUCCESSED,
    resolve => (payload:VerifyOldPasswordActionSuccessed['payload']) => resolve(payload)),
  failed: {
    network: createActionCreator(verifyOldPasswordActionTypes.FAILED_NETWORK),
    validation: createActionCreator(verifyOldPasswordActionTypes.FAILED_VALIDATION),
  },
};

/** setNewPassword */
const prefixSetNewPassword = `${rootPrefix}/setNewPassword`;
const setNewPasswordActionTypes = generateAsyncActions(prefixSetNewPassword);

export interface SetNewPasswordAction {
  type: typeof setNewPasswordActionTypes.REQUEST;
  payload: { password: string }
  meta: ActionMetaPromise<number>
}
export interface SetNewPasswordActionSuccessed {
  type: typeof setNewPasswordActionTypes.SUCCESSED;
}
export interface SetNewPasswordActionFailedNetwork {
  type: typeof setNewPasswordActionTypes.FAILED_NETWORK;
}
export interface SetNewPasswordActionFailedValidation {
  type: typeof setNewPasswordActionTypes.FAILED_VALIDATION;
}

const setNewPassword = {
  request: createActionCreator(setNewPasswordActionTypes.REQUEST,
    resolve => (payload:SetNewPasswordAction['payload'],
      meta: SetNewPasswordAction['meta']) => resolve(payload, meta)),
  successed: createActionCreator(setNewPasswordActionTypes.SUCCESSED),
  failed: {
    network: createActionCreator(setNewPasswordActionTypes.FAILED_NETWORK),
    validation: createActionCreator(setNewPasswordActionTypes.FAILED_VALIDATION),
  },
};
/* * getCodeForChangeAddressPayment */

const prefixGetCodeEmail = `${rootPrefix}/getCodeEmail`;
const getCodeEmailActionTypes = generateAsyncActions(prefixGetCodeEmail);

export interface GetCodeEmailAction {
  type: typeof getCodeEmailActionTypes.REQUEST;
}
export interface GetCodeEmailActionSuccessed {
  type: typeof getCodeEmailActionTypes.SUCCESSED;
}
export interface GetCodeEmailActionFailedNetwork {
  type: typeof getCodeEmailActionTypes.FAILED_NETWORK;
}
export interface GetCodeEmailActionFailedValidation {
  type: typeof getCodeEmailActionTypes.FAILED_VALIDATION;
}

const getCodeEmail = {
  request: createActionCreator(getCodeEmailActionTypes.REQUEST),
  successed: createActionCreator(getCodeEmailActionTypes.SUCCESSED),
  failed: {
    network: createActionCreator(getCodeEmailActionTypes.FAILED_NETWORK),
    validation: createActionCreator(getCodeEmailActionTypes.FAILED_VALIDATION),
  },
};

/** verifyCode */
const prefixVerifyCode = `${rootPrefix}/verifyCodeEmail`;
const verifyCodeActionTypes = generateAsyncActions(prefixVerifyCode);

export interface VerifyCodeEmailAction {
  type: typeof verifyCodeActionTypes.REQUEST;
  payload: {code: string, coin:string, gaCode: string, verifyType?: string}
  meta: {
    resolve: ()=>void
    reject: (errCode: number) =>void
  }
}
export interface VerifyCodeEmailActionSuccessed {
  type: typeof verifyCodeActionTypes.SUCCESSED;
  payload: {token: string}
}
export interface VerifyCodeEmailActionFailedNetwork {
  type: typeof verifyCodeActionTypes.FAILED_NETWORK;
}
export interface VerifyCodeEmailActionFailedValidation {
  type: typeof verifyCodeActionTypes.FAILED_VALIDATION;
}

const verifyCodeEmail = {
  request: createActionCreator(verifyCodeActionTypes.REQUEST,
    resolve => (payload: VerifyCodeEmailAction['payload'],
      meta: VerifyCodeEmailAction['meta']) => resolve(payload, meta)),
  successed: createActionCreator(verifyCodeActionTypes.SUCCESSED,
    resolve => (payload: VerifyCodeEmailActionSuccessed['payload']) => resolve(payload)),
  failed: {
    network: createActionCreator(verifyCodeActionTypes.FAILED_NETWORK),
    validation: createActionCreator(verifyCodeActionTypes.FAILED_VALIDATION),
  },
};

/** sendAddressPayment */
const prefixSendAddressPayment = `${rootPrefix}/sendAddressPayment`;
const sendAddressPaymentActionTypes = generateAsyncActions(prefixSendAddressPayment);

export interface SendAddressPaymentAction {
  type: typeof sendAddressPaymentActionTypes.REQUEST;
  payload: {address: string, coin: string}
  meta: {
    resolve: ()=>void
    reject: (errCode: number)=>void
  }
}
export interface SendAddressPaymentActionSuccessed {
  type: typeof sendAddressPaymentActionTypes.SUCCESSED;
}
export interface SendAddressPaymentActionFailedNetwork {
  type: typeof sendAddressPaymentActionTypes.FAILED_NETWORK;
}
export interface SendAddressPaymentActionFailedValidation {
  type: typeof sendAddressPaymentActionTypes.FAILED_VALIDATION;
}

const sendAddressPayment = {
  request: createActionCreator(sendAddressPaymentActionTypes.REQUEST,
    resolve => (payload: SendAddressPaymentAction['payload'],
      meta: SendAddressPaymentAction['meta']) => resolve(payload, meta)),
  successed: createActionCreator(sendAddressPaymentActionTypes.SUCCESSED),
  failed: {
    network: createActionCreator(sendAddressPaymentActionTypes.FAILED_NETWORK),
    validation: createActionCreator(sendAddressPaymentActionTypes.FAILED_VALIDATION),
  },
};

/** getWalletBalance */
const prefixGetWalletBalance = `${rootPrefix}/getWalletBalance`;
const getWalletBalanceActionTypes = generateAsyncActions(prefixGetWalletBalance);

export interface GetWalletBalanceAction {
  type: typeof getWalletBalanceActionTypes.REQUEST;
}
export interface GetWalletBalanceActionSuccessed {
  type: typeof getWalletBalanceActionTypes.SUCCESSED;
  payload: WalletBalanceType[]
}
export interface GetWalletBalanceActionFailedNetwork {
  type: typeof getWalletBalanceActionTypes.FAILED_NETWORK;
}
export interface GetWalletBalanceActionFailedValidation {
  type: typeof getWalletBalanceActionTypes.FAILED_VALIDATION;
}

const getWalletBalance = {
  request: createActionCreator(getWalletBalanceActionTypes.REQUEST),
  successed: createActionCreator(getWalletBalanceActionTypes.SUCCESSED,
    resolve => (payload: GetWalletBalanceActionSuccessed['payload']) => resolve(payload)),
  failed: {
    network: createActionCreator(getWalletBalanceActionTypes.FAILED_NETWORK),
    validation: createActionCreator(getWalletBalanceActionTypes.FAILED_VALIDATION),
  },
};

/** changeMinPayment */
const prefixChangeMinPayment = `${rootPrefix}/changeMinPayment`;
const changeMinPaymentActionTypes = generateAsyncActions(prefixChangeMinPayment);

export interface ChangeMinPaymentAction {
  type: typeof changeMinPaymentActionTypes.REQUEST;
  payload: {
    coin: string,
    id: string
  }
  meta: ActionMetaPromise
}
export interface ChangeMinPaymentActionSuccessed {
  type: typeof changeMinPaymentActionTypes.SUCCESSED;
}
export interface ChangeMinPaymentActionFailedNetwork {
  type: typeof changeMinPaymentActionTypes.FAILED_NETWORK;
}
export interface ChangeMinPaymentActionFailedValidation {
  type: typeof changeMinPaymentActionTypes.FAILED_VALIDATION;
}

const changeMinPayment = {
  request: createActionCreator(changeMinPaymentActionTypes.REQUEST,
    resolve => (payload: ChangeMinPaymentAction['payload'],
      meta: ChangeLangActionAction['meta']) => resolve(payload, meta)),
  successed: createActionCreator(changeMinPaymentActionTypes.SUCCESSED),
  failed: {
    network: createActionCreator(changeMinPaymentActionTypes.FAILED_NETWORK),
    validation: createActionCreator(changeMinPaymentActionTypes.FAILED_VALIDATION),
  },
};

/** changeSettingNotification */
const prefixChangeSettingNotification = `${rootPrefix}/changeSettingNotification`;
const changeSettingNotificationActionTypes = generateAsyncActions(prefixChangeSettingNotification);

export interface ChangeSettingNotificationAction {
  type: typeof changeSettingNotificationActionTypes.REQUEST;
  payload: {
    coin: string,
    id: string
  }
  meta: ActionMetaPromise
}
export interface ChangeSettingNotificationActionSuccessed {
  type: typeof changeSettingNotificationActionTypes.SUCCESSED;
}
export interface ChangeSettingNotificationActionFailedNetwork {
  type: typeof changeSettingNotificationActionTypes.FAILED_NETWORK;
}
export interface ChangeSettingNotificationActionFailedValidation {
  type: typeof changeSettingNotificationActionTypes.FAILED_VALIDATION;
}

const changeSettingNotification = {
  request: createActionCreator(changeSettingNotificationActionTypes.REQUEST,
    resolve => (payload: ChangeMinPaymentAction['payload'],
      meta: ChangeLangActionAction['meta']) => resolve(payload, meta)),
  successed: createActionCreator(changeSettingNotificationActionTypes.SUCCESSED),
  failed: {
    network: createActionCreator(changeSettingNotificationActionTypes.FAILED_NETWORK),
    validation: createActionCreator(changeSettingNotificationActionTypes.FAILED_VALIDATION),
  },
};

/** getSettingNotification */
const prefixGetSettingNotification = `${rootPrefix}/getSettingNotification`;
const getSettingNotificationActionTypes = generateAsyncActions(prefixGetSettingNotification);

export interface GetSettingNotificationActionTypesAction {
  type: typeof getSettingNotificationActionTypes.REQUEST;
  payload?: {
    loadingFlag?: boolean
  }
  meta: ActionMetaPromise
}
export interface GetSettingNotificationActionTypesActionSuccessed {
  type: typeof getSettingNotificationActionTypes.SUCCESSED;
  payload: SettingsInfo[]

}
export interface GetSettingNotificationActionTypesActionFailedNetwork {
  type: typeof getSettingNotificationActionTypes.FAILED_NETWORK;
}
export interface GetSettingNotificationActionTypesActionFailedValidation {
  type: typeof getSettingNotificationActionTypes.FAILED_VALIDATION;
}

const getSettingNotification = {
  request: createActionCreator(getSettingNotificationActionTypes.REQUEST,
    resolve => (payload:GetSettingNotificationActionTypesAction['payload'],
      meta: GetSettingNotificationActionTypesAction['meta']) => resolve(payload, meta)),
  successed: createActionCreator(getSettingNotificationActionTypes.SUCCESSED,
    resolve => (payload: GetSettingNotificationActionTypesActionSuccessed['payload']) => resolve(payload)),
  failed: {
    network: createActionCreator(getSettingNotificationActionTypes.FAILED_NETWORK),
    validation: createActionCreator(getSettingNotificationActionTypes.FAILED_VALIDATION),
  },
};

/** getUnits */
const prefixGetUnits = `${rootPrefix}/getUnits`;
const getUnitsActionTypes = generateAsyncActions(prefixGetUnits);

export interface GetUnitsTypesAction {
  type: typeof getUnitsActionTypes.REQUEST;
}
export interface GetUnitsTypesActionSuccessed {
  type: typeof getUnitsActionTypes.SUCCESSED;
  // payload: UnitsType
}
export interface GetUnitsTypesActionFailedNetwork {
  type: typeof getUnitsActionTypes.FAILED_NETWORK;
}
export interface GetUnitsTypesActionFailedValidation {
  type: typeof getUnitsActionTypes.FAILED_VALIDATION;
}

const getUnits = {
  request: createActionCreator(getUnitsActionTypes.REQUEST),
  successed: createActionCreator(getUnitsActionTypes.SUCCESSED),
  failed: {
    network: createActionCreator(getUnitsActionTypes.FAILED_NETWORK),
    validation: createActionCreator(getUnitsActionTypes.FAILED_VALIDATION),
  },
};

/** setSettingsFullInfo */
const prefixSetSettingsFullInfo = `${rootPrefix}/setSettingsFullInfo`;
const setSettingsFullInfoTypes = generateAsyncActions(prefixSetSettingsFullInfo);

export interface SetSettingsFullInfoActionSuccessed {
  type: typeof setSettingsFullInfoTypes.SUCCESSED;
  payload: SettingsInfo[]
}
const setSettingsFullInfo = {
  successed: createActionCreator(setSettingsFullInfoTypes.SUCCESSED,
    resolve => (payload: SetSettingsFullInfoActionSuccessed['payload']) => resolve(payload)),
};

/** changeStatus */
const prefixChangeStatus = `${rootPrefix}/changeStatus`;
const changeStatusAction = generateAsyncActions(prefixChangeStatus);

export interface ChangeStatusAction{
  type: typeof changeStatusAction.SUCCESSED;
  payload: {business: TITLE_SETTING_INFO, coin: COIN_TYPE, isOn: number }
  meta: ActionMetaPromise
}
export interface ChangeStatusActionSuccessed {
  type: typeof changeStatusAction.SUCCESSED;
}

export interface ChangeStatusActionFailedNetwork {
  type: typeof changeStatusAction.FAILED_NETWORK;
}
export interface ChangeStatusActionFailedValidation {
  type: typeof changeStatusAction.FAILED_VALIDATION;
}

const changeStatus = {
  request: createActionCreator(changeStatusAction.REQUEST,
    resolve => (payload: ChangeStatusAction['payload'], meta:ChangeStatusAction['meta']) => resolve(payload, meta)),
  successed: createActionCreator(changeStatusAction.SUCCESSED),
  failed: {
    network: createActionCreator(changeStatusAction.FAILED_NETWORK),
    validation: createActionCreator(changeStatusAction.FAILED_VALIDATION),
  },
};

/** changeSetting */
const prefixChangeSetting = `${rootPrefix}/changeSetting`;
const changeSettingAction = generateAsyncActions(prefixChangeSetting);

export interface ChangeSettingAction{
  type: typeof changeSettingAction.SUCCESSED;
  payload: {[x in TITLE_SETTING_INFO_NORMAL]: {value: number, unit: string}} & {coin: COIN_TYPE}
  meta: ActionMetaPromise
}
export interface ChangeSettingActionSuccessed {
  type: typeof changeSettingAction.SUCCESSED;
}

export interface ChangeSettingActionFailedNetwork {
  type: typeof changeSettingAction.FAILED_NETWORK;
}
export interface ChangeSettingActionFailedValidation {
  type: typeof changeSettingAction.FAILED_VALIDATION;
}

const changeSettings = {
  request: createActionCreator(changeSettingAction.REQUEST,
    resolve => (payload: ChangeSettingAction['payload'], meta:ChangeSettingAction['meta']) => resolve(payload, meta)),
  successed: createActionCreator(changeSettingAction.SUCCESSED),
  failed: {
    network: createActionCreator(changeSettingAction.FAILED_NETWORK),
    validation: createActionCreator(changeSettingAction.FAILED_VALIDATION),
  },
};

/** getTrottlingData */
const prefixGetTrottlingData = `${rootPrefix}/getTrottlingData`;
const getTrottlingDataAction = generateAsyncActions(prefixGetTrottlingData);

export interface GetTrottlingDataAction{
  type: typeof getTrottlingDataAction.SUCCESSED;
}
export interface GetTrottlingDataActionSuccessed {
  type: typeof getTrottlingDataAction.SUCCESSED;
  payload: {
    easterEgg: boolean
  }
}

export interface GetTrottlingDataActionFailedNetwork {
  type: typeof getTrottlingDataAction.FAILED_NETWORK;
}
export interface GetTrottlingDataActionFailedValidation {
  type: typeof getTrottlingDataAction.FAILED_VALIDATION;
}

const getTrottlingData = {
  request: createActionCreator(getTrottlingDataAction.REQUEST),
  successed: createActionCreator(getTrottlingDataAction.SUCCESSED,
    resolve => (payload:GetTrottlingDataActionSuccessed['payload']) => resolve(payload)),
  failed: {
    network: createActionCreator(getTrottlingDataAction.FAILED_NETWORK),
    validation: createActionCreator(getTrottlingDataAction.FAILED_VALIDATION),
  },
};

/** secureStoreInit */
const prefixSecureStoreInit = `${rootPrefix}/secureStoreInit`;

const secureStoreInit = createActionCreator(prefixSecureStoreInit);

/** setSecureStoreData */
const prefixSetSecureStoreData = `${rootPrefix}/setSecureStoreData`;
export interface SetSecureStoreDataAction{
  type: typeof prefixSetSecureStoreData;
  payload: {
    typeLogin: string[]
    resetCode?: boolean
    isSecureCodeAuth: boolean,
    currentTypeLogin: string
    visitSecureCodeScreen?: boolean
  }
}

const setSecureStoreData = createActionCreator(prefixSetSecureStoreData,
  resolve => (payload: SetSecureStoreDataAction['payload']) => resolve(payload));

/** setFirstVisitSecureCodeScreen */
const prefixSetFirstVisit = `${rootPrefix}/prefixSetFirstVisitSecureCode`;
export interface SetFirstVisitSecureCodeAction{
  type: typeof prefixSetSecureStoreData;
  payload: boolean
}

const setFirstVisitSecureCodeScreen = createActionCreator(prefixSetFirstVisit,
  resolve => (payload: SetFirstVisitSecureCodeAction['payload']) => resolve(payload));

/** setSecureStoreDataError */
const prefixsetSecureStoreDataError = `${rootPrefix}/setSecureStoreDataError`;
export interface setSecureStoreDataErrorAction{
  type: typeof prefixsetSecureStoreDataError;
  payload: any
}

const setSecureStoreDataError = createActionCreator(prefixsetSecureStoreDataError,
  resolve => (payload: setSecureStoreDataErrorAction['payload']) => resolve(payload));

export {
  changeLangApp, changeSettings, getTrottlingData, secureStoreInit, setSecureStoreData, setFirstVisitSecureCodeScreen,
  changeLangApi, verifyOldPassword, setNewPassword, changeTheme, changeStatus, setSecureStoreDataError,
  getCodeEmail, verifyCodeEmail, sendAddressPayment, getWalletBalance, setSettingsFullInfo,
  changeMinPayment, changeSettingNotification, getSettingNotification, getUnits,
};
