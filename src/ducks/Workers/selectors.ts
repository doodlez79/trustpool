import { StoreTypes } from 'types/store';
import { createSelector } from 'reselect';
import { STATUS_WORKER_TYPE } from 'entitiesState/workers';
import { COIN_TYPE } from 'entitiesState/currency';
import { TIME_CHART_TYPES } from 'entitiesState/general';

const initialWorker = [{
  coin: COIN_TYPE.BTC,
  groupId: 0,
  hashrate: {
    [TIME_CHART_TYPES.DAY]: 0,
    [TIME_CHART_TYPES.HOUR]: 0,
    [TIME_CHART_TYPES.MIN]: 0,
  },
  id: 0,
  lastActive: new Date(),
  name: '',
  recentHashrate: 0,
  rejectRate: 0,
  status: STATUS_WORKER_TYPE.ACTIVE,
  user: '',
}];

const getWorkersState = (state: StoreTypes) => state.workers;

export const isLoading = createSelector(getWorkersState, state => state.loading);
export const getWorkersGroup = createSelector(getWorkersState, state => state.group);
export const getWorkerChart = createSelector(getWorkersState, state => state.chart.data);
export const getSortConfig = createSelector(getWorkersState, state => {
  if (state.sortConfig) {
    return state.sortConfig;
  }
  return {
    searchValue: '',
    sortValue: {
      orderBy: '',
      sortBy: '',
    },
    status: '',
  };
});

export const getAllWorkers = createSelector(getWorkersState, state => {
  if (Array.isArray(state.workers)) {
    return state.workers;
  }
  return initialWorker;
});
export const getPageInfoWorkers = createSelector(getWorkersState, state => state.pageInfo);
export const getActiveWorkers = createSelector(getWorkersState,
  state => {
    if (Array.isArray(state.workers)) {
      return state.workers.filter(el => el.status === STATUS_WORKER_TYPE.ACTIVE);
    }
    return initialWorker;
  });
export const getUnActiveWorkers = createSelector(getWorkersState,
  state => {
    if (Array.isArray(state.workers)) {
      return state.workers.filter(el => el.status === STATUS_WORKER_TYPE.UNACTIVE);
    }
    return initialWorker;
  });
