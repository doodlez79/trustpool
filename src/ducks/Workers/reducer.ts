import { createReducer } from 'deox';
import produce from 'immer';
import { WorkersStateType } from 'entitiesState/workers';

import { TIME_CHART_TYPES } from 'entitiesState/general';
import {
  cleanChartData, deleteWorkerGroup, getWorker, getWorkers, getWorkersGroups, setSortConfig,
} from './actions';
import { reset } from '../common/actions';

const initialState: WorkersStateType = {
  loading: false,
  totalActive: 0,
  totalUnactive: 0,
  workers: [],

  sortConfig: {
    searchValue: '',
    sortValue: {
      orderBy: '',
      sortBy: '',
    },
    status: '',
  },

  pageInfo: {
    count: 1,
    currPage: 0,
    hasNext: false,
    total: 0,
    totalPage: 0,
  },
  chart: {
    workerId: 0,
    data: {
      [TIME_CHART_TYPES.HOUR]: {
        workers: [],
        hashrate: [ 0, 1 ],
        rejectRate: [ 0, 1 ],
        time: [ 1, 1 ],
        unit: '',
      },
      [TIME_CHART_TYPES.MIN]: {
        workers: [],
        hashrate: [ 0, 1 ],
        rejectRate: [ 0, 1 ],
        time: [ 1, 1 ],
        unit: '',
      },
      [TIME_CHART_TYPES.DAY]: {
        workers: [],
        hashrate: [ 0, 1 ],
        rejectRate: [ 0, 1 ],
        time: [ 1, 1 ],
        unit: '',
      },

    },
  },
  group: [],
};

const reducer = createReducer(initialState, handleAction => [
  handleAction([ getWorker.request, getWorkersGroups.request,
    deleteWorkerGroup.request ], state => produce(state, next => {
    next.loading = true;
  })),

  handleAction([ getWorkers.request ], (state, action) => produce(state, next => {
    next.loading = action.payload.loadingFlag ? !action.payload.loadingFlag : true;
  })),

  handleAction([ getWorkers.successed ], (state, action) => produce(state, next => {
    next.loading = false;
    next.workers = action.payload.replace
      ? action.payload.data.workers
      : [ ...state.workers, ...action.payload.data.workers ];
    next.pageInfo = action.payload.data.pageInfo;
  })),
  handleAction([ getWorker.successed ], (state, action) => produce(state, next => {
    next.loading = false;
    next.chart.data = action.payload;
  })),
  handleAction([ getWorkersGroups.successed ], (state, action) => produce(state, next => {
    next.loading = false;
    next.group = action.payload;
  })),

  handleAction([ deleteWorkerGroup.successed ], (state, action) => produce(state, next => {
    next.loading = false;
    next.group = state.group.find(el => el.groupId === action.payload.groupId)
      ? state.group.filter(el => el.groupId !== action.payload.groupId)
      : state.group;
  })),

  handleAction([ cleanChartData ], state => produce(state, next => {
    next.loading = false;
    next.chart = initialState.chart;
  })),

  handleAction([ setSortConfig ], (state, action) => produce(state, next => {
    next.sortConfig = {
      searchValue: action.payload.searchValue ? action.payload.searchValue : '',
      sortValue: action.payload.sortValue ? action.payload.sortValue : state.sortConfig.sortValue,
      status: action.payload.status ? action.payload.status : '',
    };
  })),

  handleAction([ reset ], state => ({
    ...state,
    ...initialState,
  })),

  handleAction([
    getWorkers.failed.network,
    getWorkers.failed.validation,
    getWorker.failed.network,
    getWorkersGroups.failed.network,
    getWorkersGroups.failed.validation,
    deleteWorkerGroup.failed.network,
    deleteWorkerGroup.failed.validation,
    getWorker.failed.validation ], state => produce(state, next => {
    next.loading = false;
  })),

]);

export default reducer;
