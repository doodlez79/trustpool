import {
  call,
  put,
  takeLatest,
  getContext, select, all,
} from 'redux-saga/effects';
import { ERROR_ACTIONS } from 'types/ActionTypes';

import { WorkersGroupState, WorkersStateType } from 'entitiesState/workers';
import { ActionType } from 'deox';
import { currentCoin } from 'ducks/Currency/selectors';
import { Types as ServiceTypes } from 'services';
import { COIN_TYPE } from 'entitiesState/currency';
import { getSortConfig } from 'ducks/Workers/selectors';
import { TIME_CHART_TYPES } from 'entitiesState/general';
import {
  getWorker, getWorkers,
  addWorkerGroup,
  deleteWorkerGroup, getWorkersGroups, moveItemsToNewGroup, renameWorkerGroup,
} from './actions';

function* getWorkersTask(action: ActionType<typeof getWorkers.request>) {
  const workersService: ServiceTypes['Workers'] = yield getContext('workers');
  const { resolve } = action.meta;
  const sortConfig: WorkersStateType['sortConfig'] = yield select(getSortConfig);
  try {
    const data: Pick<WorkersStateType, 'workers' | 'pageInfo'> = yield call([ workersService, 'getWorkers' ],
      {
        coin: action.payload.coin,
        page: action.payload.page,
        searchValue: sortConfig.searchValue,
        sortValue: sortConfig.sortValue,
        status: sortConfig.status,
        group: action.payload.group,
      });

    yield put(getWorkers.successed({ data, replace: action.payload.replace }));
    if (resolve) {
      resolve();
    }
  } catch (err) {
    if (err.type === ERROR_ACTIONS.VALIDATION) {
      yield put(getWorkers.failed.validation());
    }
    if (err.type === ERROR_ACTIONS.NETWORK) {
      yield put(getWorkers.failed.network());
    }
  }
}

function* getWorkerTask(action: ActionType<typeof getWorker.request>) {
  const { id } = action.payload;
  const workersService: ServiceTypes['Workers'] = yield getContext('workers');

  const coin:COIN_TYPE = yield select(currentCoin);
  try {
    const data:{
      [TIME_CHART_TYPES.HOUR]: WorkersStateType['chart'],
      [TIME_CHART_TYPES.MIN]: WorkersStateType['chart'],
      [TIME_CHART_TYPES.DAY]: WorkersStateType['chart'],
    } = yield all({
      [TIME_CHART_TYPES.DAY]: call([ workersService, 'getWorker' ], { id, time: TIME_CHART_TYPES.DAY, coin }),
      [TIME_CHART_TYPES.MIN]: call([ workersService, 'getWorker' ], { id, time: TIME_CHART_TYPES.MIN, coin }),
      [TIME_CHART_TYPES.HOUR]: call([ workersService, 'getWorker' ], { id, time: TIME_CHART_TYPES.HOUR, coin }),
    });
    yield put(getWorker.successed(data));
  } catch (err) {
    if (err.type === ERROR_ACTIONS.VALIDATION) {
      yield put(getWorker.failed.validation());
    }
    if (err.type === ERROR_ACTIONS.NETWORK) {
      yield put(getWorker.failed.network());
    }
  }
}

function* getWorkersGroupsTask() {
  const workersService: ServiceTypes['Workers'] = yield getContext('workers');

  const coin:COIN_TYPE = yield select(currentCoin);
  try {
    const data: WorkersGroupState[] = yield call([ workersService, 'getWorkersGroup' ], { coin });

    yield put(getWorkersGroups.successed(data));
  } catch (err) {
    if (err.type === ERROR_ACTIONS.VALIDATION) {
      yield put(getWorkersGroups.failed.validation());
    }
    if (err.type === ERROR_ACTIONS.NETWORK) {
      yield put(getWorkersGroups.failed.network());
    }
  }
}

function* deleteWorkerGroupTask(action: ActionType<typeof deleteWorkerGroup.request>) {
  const workersService: ServiceTypes['Workers'] = yield getContext('workers');
  const { groupId } = action.payload;
  const coin:COIN_TYPE = yield select(currentCoin);
  try {
    yield call([ workersService, 'deleteWorkerGroup' ], { coin, groupId });

    yield put(deleteWorkerGroup.successed({ groupId }));
  } catch (err) {
    if (err.type === ERROR_ACTIONS.VALIDATION) {
      yield put(deleteWorkerGroup.failed.validation());
    }
    if (err.type === ERROR_ACTIONS.NETWORK) {
      yield put(deleteWorkerGroup.failed.network());
    }
  }
}

function* addWorkerGroupTask(action: ActionType<typeof addWorkerGroup.request>) {
  const workersService: ServiceTypes['Workers'] = yield getContext('workers');
  const { name } = action.payload;
  const { resolve, reject } = action.meta;
  const coin:COIN_TYPE = yield select(currentCoin);
  try {
    yield call([ workersService, 'addWorkerGroup' ], { coin, name });

    yield put(addWorkerGroup.successed());
    if (resolve) {
      resolve();
      yield put(getWorkersGroups.request());
    }
  } catch (err) {
    if (err.type === ERROR_ACTIONS.VALIDATION) {
      yield put(addWorkerGroup.failed.validation());
    }
    if (err.type === ERROR_ACTIONS.NETWORK) {
      yield put(addWorkerGroup.failed.network());
      if (reject) {
        reject(err.code);
      }
    }
  }
}

function* renameWorkerGroupTask(action: ActionType<typeof renameWorkerGroup.request>) {
  const workersService: ServiceTypes['Workers'] = yield getContext('workers');
  const { name, id } = action.payload;
  const { resolve, reject } = action.meta;
  const coin:COIN_TYPE = yield select(currentCoin);
  try {
    yield call([ workersService, 'renameWorkerGroup' ], { coin, name, id });

    yield put(renameWorkerGroup.successed());
    if (resolve) {
      resolve();
      yield put(getWorkersGroups.request());
    }
  } catch (err) {
    if (err.type === ERROR_ACTIONS.VALIDATION) {
      yield put(renameWorkerGroup.failed.validation());
    }
    if (err.type === ERROR_ACTIONS.NETWORK) {
      yield put(renameWorkerGroup.failed.network());
      if (reject) {
        reject(err.code);
      }
    }
  }
}

function* moveItemToNewGroupTask(action: ActionType<typeof moveItemsToNewGroup.request>) {
  const workersService: ServiceTypes['Workers'] = yield getContext('workers');
  const { group, elements } = action.payload;
  const { resolve, reject } = action.meta;

  try {
    yield call([ workersService, 'moveItemToNewGroup' ], { group, elements });

    yield put(renameWorkerGroup.successed());
    if (resolve) {
      resolve();
      yield put(getWorkersGroups.request());
    }
  } catch (err) {
    if (err.type === ERROR_ACTIONS.VALIDATION) {
      yield put(moveItemsToNewGroup.failed.validation());
    }
    if (err.type === ERROR_ACTIONS.NETWORK) {
      yield put(moveItemsToNewGroup.failed.network());
      if (reject) {
        reject(err.code);
      }
    }
  }
}

export default function* () {
  yield takeLatest(getWorkers.request, getWorkersTask);
  yield takeLatest(getWorker.request, getWorkerTask);
  yield takeLatest(getWorkersGroups.request, getWorkersGroupsTask);
  yield takeLatest(deleteWorkerGroup.request, deleteWorkerGroupTask);
  yield takeLatest(addWorkerGroup.request, addWorkerGroupTask);
  yield takeLatest(renameWorkerGroup.request, renameWorkerGroupTask);
  yield takeLatest(moveItemsToNewGroup.request, moveItemToNewGroupTask);
}
