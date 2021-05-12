import {
  call,
  put,
  takeLatest,
  getContext,
} from 'redux-saga/effects';
import { ERROR_ACTIONS } from 'types/ActionTypes';

import { ReferalListType, ReferalsProfitDataType } from 'entitiesState/referal';
import { Types as ServiceTypes } from 'services';
import { ActionType } from 'deox';
import { getReferalsList, getReferalsProfit } from './actions';

function* getReferalsListTask(action: ActionType<typeof getReferalsList.request>) {
  const referalsService:ServiceTypes['Referals'] = yield getContext('referals');
  const coin = action.payload;
  const { resolve } = action.meta;
  try {
    const data: ReferalListType[] = yield call([ referalsService, 'getReferalsList' ], coin);

    yield put(getReferalsList.successed(data));
    if (resolve) {
      resolve();
    }
  } catch (err) {
    if (err.type === ERROR_ACTIONS.VALIDATION) {
      yield put(getReferalsList.failed.validation());
    }
    if (err.type === ERROR_ACTIONS.NETWORK) {
      yield put(getReferalsList.failed.network());
    }
  }
}

function* getReferalsProfitTask(action: ActionType<typeof getReferalsProfit.request>) {
  const referalsService: ServiceTypes['Referals'] = yield getContext('referals');
  const { coin, countPage, replace } = action.payload;
  const { resolve } = action.meta;
  try {
    // eslint-disable-next-line max-len
    const data: Pick<ReferalsProfitDataType, 'data' | 'pageInfo'> = yield call([ referalsService, 'getReferalsProfit' ], coin, countPage);

    yield put(getReferalsProfit.successed({ data, replace }));
    if (resolve) {
      resolve();
    }
  } catch (err) {
    if (err.type === ERROR_ACTIONS.VALIDATION) {
      yield put(getReferalsProfit.failed.validation());
    }
    if (err.type === ERROR_ACTIONS.NETWORK) {
      yield put(getReferalsProfit.failed.network());
    }
  }
}

export default function* () {
  yield takeLatest(getReferalsList.request, getReferalsListTask);
  yield takeLatest(getReferalsProfit.request, getReferalsProfitTask);
}
