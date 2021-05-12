import {
  call,
  put,
  takeLatest,
  getContext,
} from 'redux-saga/effects';

import { ERROR_ACTIONS } from 'types/ActionTypes';

import { COIN_TYPE, CurrencyTypeToState } from 'entitiesState/currency';
import { ActionType } from 'deox';
import { Types as ServiceTypes } from 'services';
import { CurrencysCourseType } from 'src/entitiesState/currency';
import {
  getCurrencysInfo, getCurrentValute, postChangeCoin, getCurrencysCourse,
} from './actions';

function* getCurrencysInfoTask() {
  const CurrencyService:ServiceTypes['Currency'] = yield getContext('currency');
  try {
    // eslint-disable-next-line max-len
    const data: Pick<CurrencyTypeToState, 'allCoins' | 'allValuts'> = yield call([ CurrencyService, 'getCurrencysInfo' ]);

    yield put(getCurrencysInfo.successed(data));
  } catch (err) {
    if (err.type === ERROR_ACTIONS.VALIDATION) {
      yield put(getCurrencysInfo.failed.validation());
    }
    if (err.type === ERROR_ACTIONS.NETWORK) {
      yield put(getCurrencysInfo.failed.network());
    }
  }
}

function* GetCurrentValuteTask() {
  const CurrencyService:ServiceTypes['Currency'] = yield getContext('currency');

  try {
    const data: COIN_TYPE = yield call([ CurrencyService, 'getCurrentValute' ]);
    yield put(getCurrentValute.successed(data));
  } catch (err) {
    if (err.type === ERROR_ACTIONS.VALIDATION) {
      yield put(getCurrentValute.failed.validation());
    }
    if (err.type === ERROR_ACTIONS.NETWORK) {
      yield put(getCurrentValute.failed.network());
    }
  }
}

function* GetCurrencysCourseTask(action: ActionType<typeof getCurrencysCourse.request>) {
  const CurrencyService: ServiceTypes['Course'] = yield getContext('course');
  const currency = action.payload;
  const { resolve } = action.meta;
  try {
    const data: CurrencysCourseType = yield call([ CurrencyService, 'getCurrencysCourse' ], currency);
    yield put(getCurrencysCourse.successed(data));
    if (resolve) {
      resolve();
    }
  } catch (err) {
    if (err.type === ERROR_ACTIONS.VALIDATION) {
      yield put(getCurrencysCourse.failed.validation());
    }
    if (err.type === ERROR_ACTIONS.NETWORK) {
      yield put(getCurrencysCourse.failed.network());
    }
  }
}

function* PostCoinTask(action: ActionType<typeof postChangeCoin.request>) {
  const CurrencyService:ServiceTypes['Currency'] = yield getContext('currency');
  const coin = action.payload;
  const { resolve } = action.meta;
  try {
    yield call([ CurrencyService, 'postChangeValute' ], coin);
    yield put(postChangeCoin.successed(coin));
    if (resolve) {
      resolve();
    }
  } catch (err) {
    if (err.type === ERROR_ACTIONS.VALIDATION) {
      yield put(postChangeCoin.failed.validation());
    }
    if (err.type === ERROR_ACTIONS.NETWORK) {
      yield put(postChangeCoin.failed.network());
    }
  }
}

export default function* () {
  yield takeLatest(getCurrencysInfo.request, getCurrencysInfoTask);
  yield takeLatest(getCurrentValute.request, GetCurrentValuteTask);
  yield takeLatest(getCurrencysCourse.request, GetCurrencysCourseTask);
  yield takeLatest(postChangeCoin.request, PostCoinTask);
}
