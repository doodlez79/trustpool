import { createReducer } from 'deox';
import produce from 'immer';

import { ACCOUNT_TYPE, AccountTypesState } from 'entitiesState/account';

import { Actions as CommonActions } from '../common';

import {
  clearSubList,
  getAccountInfo,
  getSubAccountsInfo,
  getUserInfo,
  postSubAccount,
  putChangeSubAccount,
  putChangeVisibleSubAccount,
  setCurrentAccount, setNotificationToken,
} from './actions';

const initialState : AccountTypesState = {
  accountInfo: {
    id: 1,
    account: '',
    countryCode: '',
    email: '',
    emailMasked: '',
    emailVerified: true,
    hasTotpAuth: true,
    mobile: '',
    mobileMasked: '',
    lang: '',
    hasPaymentPassword: true,
    isSigninVerify: true,
    isPaymentVerify: true,
    isTotpVerify: false,
    accountType: ACCOUNT_TYPE.main,
    role: '',
    accessKey: '',
    notificationToken: '',
  },
  loading: false,
  subAccounts: [{
    id: 1,
    BCH: '',
    BTC: '',
    DASH: '',
    accountType: ACCOUNT_TYPE.sub,
    account: '',
    visible: true,
    ETC: '',
    ETH: '',
    LTC: '',
    ZEC: '',
    XMR: '',
  }],
  currentAccount: {
    id: 1,
    account: '',
    accountType: ACCOUNT_TYPE.main,
  },
  info: {
    id: 1,
    accountType: ACCOUNT_TYPE.main,
    account: '',
    lang: '',
  },

};

const reducer = createReducer(initialState, handleAction => [
  handleAction([
    getAccountInfo.request,
    getSubAccountsInfo.request,
    putChangeSubAccount.request,
    postSubAccount.request,
    putChangeVisibleSubAccount.request,
    getUserInfo.request,
  ], state => produce(state, next => {
    next.loading = true;
  })),

  handleAction([ getAccountInfo.successed ], (state, action) => produce(state, next => {
    next.accountInfo = action.payload;
    next.loading = false;
  })),

  handleAction([ getSubAccountsInfo.successed ], (state, action) => produce(state, next => {
    next.subAccounts = action.payload;
    next.loading = false;
  })),

  handleAction([ putChangeSubAccount.successed ], (state, action) => produce(state, next => {
    next.currentAccount = action.payload;
    next.info = action.payload;
    next.loading = false;
  })),

  handleAction([ setCurrentAccount ], (state, action) => produce(state, next => {
    next.currentAccount = action.payload;
    next.loading = false;
  })),

  handleAction([ getUserInfo.successed ], (state, action) => produce(state, next => {
    next.info = action.payload;
    next.loading = false;
  })),

  handleAction([ setNotificationToken ], (state, action) => produce(state, next => {
    next.accountInfo.notificationToken = action.payload;
  })),

  handleAction([ putChangeVisibleSubAccount.successed ], state => produce(state, next => {
    next.loading = false;
  })),

  handleAction([ clearSubList ], state => produce(state, next => {
    next.subAccounts = initialState.subAccounts;
  })),

  handleAction([
    getAccountInfo.failed.validation,
    getAccountInfo.failed.network,
    getSubAccountsInfo.failed.network,
    getSubAccountsInfo.failed.validation,
    putChangeSubAccount.failed.network,
    putChangeSubAccount.failed.validation,
    postSubAccount.failed.validation,
    postSubAccount.failed.network,
    putChangeVisibleSubAccount.failed.network,
    putChangeVisibleSubAccount.failed.validation,
    getUserInfo.failed.network,
    getUserInfo.failed.validation,
  ], state => produce(state, next => {
    next.loading = false;
  })),

  handleAction([ CommonActions.reset ], state => ({
    ...state,
    ...initialState,
  })),
]);

export default reducer;
