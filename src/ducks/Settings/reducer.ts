import { createReducer } from 'deox';
import produce from 'immer';

import { SettingState, TITLE_SETTING_INFO } from 'entitiesState/settings';
import {
  changeLangApi,
  changeLangApp, changeSettings, changeStatus,
  changeTheme,
  getTrottlingData,
  getCodeEmail,
  getSettingNotification, getUnits,
  getWalletBalance,
  sendAddressPayment,
  setNewPassword, setSettingsFullInfo,
  verifyCodeEmail,
  verifyOldPassword, setSecureStoreData, setFirstVisitSecureCodeScreen,
} from 'ducks/Settings/actions';
import { currentLang, currentTheme } from 'ducks/Settings/utils';
import { COIN_TYPE } from 'entitiesState/currency';

const initialState: SettingState = {
  loading: false,
  loadingChangeStatus: false,
  lang: currentLang(),
  tokenPasswordChange: '',
  tokenAddressChange: '',
  theme: currentTheme(),
  trottlingData: {
    easterEgg: false,
  },
  secureStore: {
    visitSecureCodeScreen: false,
    isSecureCodeAuth: false,
    disableSecureCode: false,
    resetCode: false,
    typeEnter: '',
    typeLogin: [ '' ],
    currentTypeLogin: '',
  },
  settingsInfo: [
    {
      coin: COIN_TYPE.BTC,
      units: [ '' ],
      remindSettingList: [{
        status: false,
        business: TITLE_SETTING_INFO.LOW_HASH_REMIND,
        title: '',
        value: 0,
        unit: 'TH/S',
      }],
    },
  ],
  generalSettingsInfo: [{
    coin: COIN_TYPE.BTC,
    withdrawAddress: '',
    minimalPayment: '',
    minimalPaymentChoices: [{ value: '', label: '' }],
    minMinimalPayment: '',
    accountBalance: '',
  }],
};

const reducer = createReducer(initialState, handleAction => [
  handleAction([ changeLangApi.successed, changeLangApp ], (state, action) => produce(state, next => {
    next.lang = action.payload;
  })),
  handleAction([ changeTheme ], (state, action) => produce(state, next => {
    next.theme = action.payload;
  })),
  handleAction([ changeStatus.request ],
    state => produce(state, next => {
      next.loadingChangeStatus = true;
    })),
  handleAction([ verifyOldPassword.request,
    sendAddressPayment.request, getCodeEmail.request, changeSettings.request, getTrottlingData.request,
    getUnits.request,
    setNewPassword.request, getWalletBalance.request ],
  state => produce(state, next => {
    next.loading = true;
  })),

  handleAction([ getSettingNotification.request ],
    (state, action) => produce(state, next => {
      next.loading = action.payload && action.payload.loadingFlag ? !action.payload.loadingFlag : true;
    })),

  handleAction([ changeStatus.successed ],
    state => produce(state, next => {
      next.loadingChangeStatus = false;
    })),
  handleAction([ getTrottlingData.successed ],
    (state, action) => produce(state, next => {
      next.trottlingData = action.payload;
    })),

  handleAction([ verifyOldPassword.successed,
    getCodeEmail.successed, setNewPassword.successed, changeSettings.successed ],
  state => produce(state, next => {
    next.loading = false;
  })),

  handleAction([ getWalletBalance.successed ],
    (state, action) => produce(state, next => {
      next.loading = false;
      next.generalSettingsInfo = action.payload;
    })),

  handleAction([ setSettingsFullInfo.successed ],
    (state, action) => produce(state, next => {
      next.loading = false;
      next.settingsInfo = action.payload;
    })),

  handleAction([ verifyCodeEmail.successed ],
    (state, action) => produce(state, next => {
      next.loading = false;
      next.tokenAddressChange = action.payload.token;
    })),

  handleAction([ verifyOldPassword.successed ], (state, action) => produce(state, next => {
    next.loading = false;
    next.tokenPasswordChange = action.payload.token;
  })),

  handleAction([ changeStatus.failed.network, changeStatus.failed.validation ],
    state => produce(state, next => {
      next.loadingChangeStatus = false;
    })),

  handleAction([ setSecureStoreData ],
    (state, action) => produce(state, next => {
      next.secureStore = {
        ...state.secureStore,
        ...action.payload,
      };
    })),

  handleAction([ setFirstVisitSecureCodeScreen ],
    (state, action) => produce(state, next => {
      next.secureStore = {
        ...state.secureStore,
        visitSecureCodeScreen: action.payload,
      };
    })),

  handleAction([
    verifyOldPassword.failed.network,
    verifyOldPassword.failed.validation,
    sendAddressPayment.failed.network,
    sendAddressPayment.failed.validation,
    changeSettings.failed.validation,
    changeSettings.failed.network,
    getWalletBalance.failed.network,
    getWalletBalance.failed.validation,
    getCodeEmail.failed.network,
    getCodeEmail.failed.validation,
    getUnits.failed.validation,
    getUnits.failed.network,
    setNewPassword.failed.network,
    setNewPassword.failed.validation ], state => produce(state, next => {
    next.loading = false;
  })),
]);

export default reducer;
