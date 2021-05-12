import { eventChannel, END } from '@redux-saga/core';
import {
  call,
  getContext,
  put,
  takeLatest,
  select,
  take,
} from 'redux-saga/effects';

import { LocalAuthenticationServices, PushNotificationsInst, Types as ServiceTypes } from 'services';
import { COIN_TYPE } from 'entitiesState/currency';
import { ActionType } from 'deox';
import { ERROR_ACTIONS } from 'types/ActionTypes';
import { isFirstVisit } from 'ducks/App/selectors';
import { currentCoin } from '../Currency/selectors';

import { getToken } from '../Auth/selectors';
import { getGeneralChartInfo, getGeneralInfo } from '../General/actions';
import { syncNotification } from '../Notification/actions';

import * as Actions from './actions';
import { getAccountInfo, getSubAccountsInfo, getUserInfo } from '../Account/actions';
import { getReferalsList, getReferalsProfit } from '../Referal/actions';
import { getCurrencysInfo, getCurrentValute } from '../Currency/actions';
import { getSettingNotification, getWalletBalance, secureStoreInit } from '../Settings/actions';
import { getEarningSummaryInfo, getPaymentInfo } from '../Payment/actions';
import { getWorkers } from '../Workers/actions';

function* initTask() {
  const apiService: ServiceTypes['API'] = yield getContext('api');

  const token: string = yield select(getToken);
  const firstEnter: boolean = yield select(isFirstVisit);

  try {
    if (firstEnter) {
      yield call([ LocalAuthenticationServices, 'deleteCodeToSecureStore' ]);
    }
    if (token) {
      yield call([ apiService, 'setAccessToken' ], token);

      const statusNotification = yield call([ PushNotificationsInst, 'getPermissionNotifications' ]);

      if (statusNotification === 'granted') {
        yield put(syncNotification.request());
      }
    }
    yield put(secureStoreInit());
    yield put(Actions.appInit.successed());
  } catch (err) {
    yield put(Actions.appInit.failed());
  }
}

const countdown = (seconds: number, isAuth: boolean) => eventChannel(emitter => {
  const interval = setInterval(() => {
    seconds -= 1;
    if (seconds > 0 && isAuth) {
      emitter(seconds);
    } else {
      emitter(END);
    }
  }, 60000);
  return () => {
    clearInterval(interval);
  };
});

function* refreshAllStateTask(
  action: ActionType<typeof Actions.refresh60sec.request>,
) {
  const coin: COIN_TYPE = yield select(currentCoin);
  const {
    time, countPage, page, replace, sortConfig, isAuth,
  } = action.payload;
  const { resolve, reject } = action.meta;

  const refresh = yield call(countdown, Infinity, isAuth);
  try {
    while (true) {
      yield take(refresh);
      yield put(getCurrencysInfo.request({ loadingFlag: true }));
      yield put(getCurrentValute.request({ loadingFlag: true }));
      yield put(getWalletBalance.request());
      yield put(getSubAccountsInfo.request());
      yield put(getUserInfo.request());
      yield put(getAccountInfo.request());
      yield put(getGeneralInfo.request(coin));
      yield put(getReferalsList.request(coin, {
        resolve: () => {
        },
      }));
      yield put(getReferalsProfit.request({ coin, countPage, replace }, {
        resolve: () => {
        },
      }));
      yield put(getEarningSummaryInfo.request({ countPage, coin, replace }, {
        resolve: () => {
        },
        reject: () => {
        },
      }));
      yield put(getPaymentInfo.request({ countPage, coin, replace }, {
        resolve: () => {
        },
        reject: () => {
        },
      }));
      yield put(getWorkers.request({
        loadingFlag: true,
        coin,
        page,
        replace,
        ...sortConfig,
      }, {
        resolve: () => {
        },
      }));
      yield put(getSettingNotification.request({ loadingFlag: true }, {
        resolve: () => {
        },
      }));

      if (time) {
        yield put(getGeneralChartInfo.request({ time, loadingFlag: true }, {
          resolve: () => {
          },
        }));
      }

      if (resolve) {
        resolve();
      }
    }
  } catch (err) {
    if (reject) {
      reject(err);
    }
    if (err.type === ERROR_ACTIONS.VALIDATION) {
      yield put(Actions.refresh60sec.failed.validation());
    }
    if (err.type === ERROR_ACTIONS.NETWORK) {
      yield put(Actions.refresh60sec.failed.network());
    }
  }
}

export default function* () {
  yield takeLatest(Actions.appInit.request, initTask);
  yield takeLatest(Actions.refresh60sec.request, refreshAllStateTask);
}
