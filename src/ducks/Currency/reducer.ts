import { createReducer } from 'deox';

import produce from 'immer';

import { COIN_TYPE, CurrencyTypeToState, CURRENCY_TYPE } from 'entitiesState/currency';
import { Actions as CommonActions } from '../common';

import {
  getCurrencysInfo, getCurrentValute, postChangeCoin, getCurrencysCourse, saveFiatCurrency,
} from './actions';
import { reset } from '../common/actions';

const initialState : CurrencyTypeToState = {
  allValuts: [{
    minPaymentAmount: '',
    miningAlgorithm: '',
    paymentEndTime: '',
    rewardCoins: [{
      reward: '',
      giftCoin: '',
    }],
    blockReward: '',
    blockTime: 1,
    coin: COIN_TYPE.BTC,
    coinPrice: '0',
    currConnections: 1,
    currDiff: 1,
    currPeriodRestRime: 1,
    pricingCurrency: '',
    pricingCurrencySymbol: '',
    unitOutputCurrency: '',
    hashUnit: '',
    hashrate: {
      '1day': 1,
      '3days': 1,
      '7days': 1,
      default: 1,
      pool: 1,
    },
    nextPeriodDiff: 1,
    nextPeriodDiffFloat: '',
    prePeriodDiffFloat: '',
    paymentStartTime: '',
    prePeriodDiff: '',
    prePeriodRestTime: new Date(),
    unitOutput: '',
  }],
  loading: false,
  allCoins: [ COIN_TYPE.BTC ],
  currentCoin: COIN_TYPE.BTC,
  course: 1,
  fiatCurrency: CURRENCY_TYPE.USD,
};

const reducer = createReducer(initialState, handleAction => [
  handleAction([
    getCurrencysInfo.request,
    getCurrencysCourse.request,
  ], state => produce(state, next => {
    next.loading = true;
  })),

  handleAction([
    getCurrentValute.request,
  ], (state, action) => produce(state, next => {
    next.loading = action.payload && action.payload.loadingFlag ? !action.payload.loadingFlag : true;
  })),

  handleAction([ getCurrencysInfo.successed ], (state, action) => produce(state, next => {
    next.allValuts = action.payload.allValuts;
    next.allCoins = action.payload.allCoins;
    next.loading = false;
  })),

  handleAction([ postChangeCoin.successed ], (state, action) => produce(state, next => {
    next.currentCoin = action.payload;
    next.loading = false;
  })),

  handleAction([ getCurrencysCourse.successed ], (state, action) => produce(state, next => {
    next.course = action.payload.data.value;
    next.loading = false;
  })),

  handleAction([ saveFiatCurrency ], (state, action) => produce(state, next => {
    next.fiatCurrency = action.payload;
    next.loading = false;
  })),

  handleAction([ reset ], () => initialState),

  handleAction([
    getCurrencysInfo.failed.network,
    getCurrencysInfo.failed.validation,
    postChangeCoin.failed.validation,
    postChangeCoin.failed.validation,
  ], state => produce(state, next => {
    next.loading = false;
  })),

  handleAction([ CommonActions.reset ], () => initialState),
]);

export default reducer;
