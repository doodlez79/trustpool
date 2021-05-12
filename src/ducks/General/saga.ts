import { ActionType } from 'deox';
import {
  call,
  put,
  takeLatest,
  getContext, select, all,
} from 'redux-saga/effects';

import { ERROR_ACTIONS } from 'types/ActionTypes';
import { GeneralStateType, TIME_CHART_TYPES } from 'entitiesState/general';

import { COIN_TYPE } from 'entitiesState/currency';
import { Types as ServiceTypes } from 'services';
import { getEarningSummaryInfo, getPaymentInfo } from 'ducks/Payment/actions';
import { getWorkers } from 'ducks/Workers/actions';
import { getSortConfig } from 'ducks/Workers/selectors';
import { WorkersStateType } from 'entitiesState/workers';
import { getCurrentChartTime } from 'ducks/General/selectors';
import { ResponseTypeChartData } from 'ducks/General/types';

import { getAccountInfo, getSubAccountsInfo, getUserInfo } from '../Account/actions';
import {
  getFullInfo, getGeneralChartInfo, getGeneralInfo, setCurrentTimeForMainChart,
} from './actions';
import { currentCoin } from '../Currency/selectors';

function* getGeneralInfoTask(action: ActionType<typeof getGeneralInfo.request>) {
  const GeneralService: ServiceTypes['General'] = yield getContext('general');

  const coin = action.payload;

  try {
    const data: GeneralStateType = yield call([ GeneralService, 'getGeneralInfo' ], coin);
    yield put(getGeneralInfo.successed(data));
  } catch (err) {
    if (err.type === ERROR_ACTIONS.VALIDATION) {
      yield put(getGeneralInfo.failed.validation());
    }
    if (err.type === ERROR_ACTIONS.NETWORK) {
      yield put(getGeneralInfo.failed.network());
    }
  }
}

function* getGeneralChartInfoTask(action: ActionType<typeof getGeneralChartInfo.request>) {
  const GeneralService: ServiceTypes['General'] = yield getContext('general');

  const timeData = action.payload.time;
  const coin:COIN_TYPE = yield select(currentCoin);

  try {
    const data:ResponseTypeChartData = yield all({
      [TIME_CHART_TYPES.DAY]: call([ GeneralService, 'getGeneralChartInfo' ],
        TIME_CHART_TYPES.DAY, coin),
      [TIME_CHART_TYPES.MIN]: call([ GeneralService, 'getGeneralChartInfo' ],
        TIME_CHART_TYPES.MIN, coin),
      [TIME_CHART_TYPES.HOUR]: call([ GeneralService, 'getGeneralChartInfo' ],
        TIME_CHART_TYPES.HOUR, coin),
    });
    yield put(getGeneralChartInfo.successed(data));
    yield put(setCurrentTimeForMainChart(timeData));
    if (action.meta && action.meta.resolve) {
      action.meta.resolve();
    }
  } catch (err) {
    if (err.type === ERROR_ACTIONS.VALIDATION) {
      yield put(getGeneralChartInfo.failed.validation());
    }
    if (err.type === ERROR_ACTIONS.NETWORK) {
      yield put(getGeneralChartInfo.failed.network());
    }
  }
}

function* getFullInformationHomeScreen(action: ActionType<typeof getFullInfo.request>) {
  const coin:COIN_TYPE = yield select(currentCoin);

  const time:TIME_CHART_TYPES = yield select(getCurrentChartTime);
  const { resolve, reject } = action.meta;
  const sortConfig: WorkersStateType['sortConfig'] = yield select(getSortConfig);

  try {
    yield put(getSubAccountsInfo.request());
    yield put(getWorkers.request({
      coin,
      page: 1,
      replace: true,
      ...sortConfig,
    }, { resolve: () => {} }));
    yield put(getGeneralInfo.request(coin));
    yield put(getEarningSummaryInfo.request({ coin, countPage: 1, replace: true },
      { resolve: () => {}, reject: () => {} }));
    yield put(getPaymentInfo.request({ coin, countPage: 1, replace: true },
      { resolve: () => {}, reject: () => {} }));
    yield put(getUserInfo.request());
    yield put(getAccountInfo.request());

    if (time) {
      yield put(getGeneralChartInfo.request({ time }, { resolve: () => {} }));
    }

    if (resolve) {
      resolve();
    }
  } catch (err) {
    if (reject) {
      reject(err);
    }
    if (err.type === ERROR_ACTIONS.VALIDATION) {
      yield put(getFullInfo.failed.validation());
    }
    if (err.type === ERROR_ACTIONS.NETWORK) {
      yield put(getFullInfo.failed.network());
    }
  }
}

export default function* () {
  yield takeLatest(getGeneralInfo.request, getGeneralInfoTask);
  yield takeLatest(getGeneralChartInfo.request, getGeneralChartInfoTask);

  yield takeLatest(getFullInfo.request, getFullInformationHomeScreen);
}
