import { createReducer } from 'deox';

import produce from 'immer';

import { GeneralStateType, TIME_CHART_TYPES } from 'entitiesState/general';

import { Actions as CommonActions } from '../common';

import {
  getFullInfo,
  getGeneralChartInfo,
  getGeneralInfo,
  setCurrentTimeForMainChart,
} from './actions';
import { reset } from '../common/actions';

const initialState : GeneralStateType = {
  stratum: {
    backupQuickSwitchPorts: [ 1 ],
    backupPorts: [ 1 ],
    quickSwitchUrl: '',
    url: '',
    urls: [ '' ],
    ports: [ 1 ],
  },
  loading: false,
  accountInfo: {
    hashUnit: '',
    hashrate: {
      [TIME_CHART_TYPES.HOUR]: 1,
      [TIME_CHART_TYPES.DAY]: 1,
      [TIME_CHART_TYPES.MIN]: 1,
    },
    ppsPlusRate: '',
    paymentTotal: '',
    accountBalance: '0',
    chart: {
      [TIME_CHART_TYPES.HOUR]: {
        hashrate: [ 0 ],
        workers: [ 1 ],
        rejectRate: [ 0 ],
        start: [ 0 ],
        unit: '',
      },
      [TIME_CHART_TYPES.DAY]: {
        hashrate: [ 0 ],
        workers: [ 1 ],
        rejectRate: [ 0 ],
        start: [ 0 ],
        unit: '',
      },
      [TIME_CHART_TYPES.MIN]: {
        hashrate: [ 0 ],
        workers: [ 1 ],
        rejectRate: [ 0 ],
        start: [ 0 ],
        unit: '',
      },

    },
    profit: {
      '24hour': '',
      total: '',
      type: '',
    },
    currentTime: TIME_CHART_TYPES.HOUR,

  },
  workers: {
    totalActive: 0,
    totalUnactive: 0,
  },
};

const reducer = createReducer(initialState, handleAction => [
  handleAction([
    getGeneralInfo.request,
    getFullInfo.request,
  ], state => produce(state, next => {
    next.loading = true;
  })),

  handleAction([
    getGeneralChartInfo.request,
  ], (state, action) => produce(state, next => {
    next.loading = action.payload.loadingFlag ? !action.payload.loadingFlag : true;
  })),

  handleAction([ getFullInfo.successed ], state => produce(state, next => {
    next.loading = false;
  })),

  handleAction([ getGeneralInfo.successed ], (state, action) => produce(state, next => {
    next.accountInfo = { ...state.accountInfo, ...action.payload.accountInfo };
    next.stratum = action.payload.stratum;
    next.workers = action.payload.workers;
    next.loading = false;
  })),

  handleAction([ getGeneralChartInfo.successed ], (state, action) => produce(state, next => {
    next.accountInfo.chart = action.payload;
    next.loading = false;
  })),
  handleAction([ setCurrentTimeForMainChart ], (state, action) => produce(state, next => {
    next.accountInfo.currentTime = action.payload;
    next.loading = false;
  })),

  handleAction([ reset ], () => initialState),

  handleAction([
    getGeneralInfo.failed.network,
    getGeneralInfo.failed.validation,
    getGeneralChartInfo.failed.network,
    getGeneralChartInfo.failed.validation,
    getFullInfo.failed.network,
    getFullInfo.failed.validation,
  ], state => produce(state, next => {
    next.loading = false;
  })),

  handleAction([ CommonActions.reset ], () => initialState),
]);

export default reducer;
