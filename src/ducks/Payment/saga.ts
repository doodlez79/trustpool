import {
  call, getContext, put, takeLatest,
} from 'redux-saga/effects';
import { EarningsSummaryDataType, PaymentDataType } from 'entitiesState/payment';
import { ERROR_ACTIONS } from 'types/ActionTypes';
import { ActionType } from 'deox';

import { Types as ServiceTypes } from 'services';
import { getPaymentInfo, getEarningSummaryInfo } from './actions';

function* getPaymentTask(action: ActionType<typeof getPaymentInfo.request>) {
  const PaymentService:ServiceTypes['Payment'] = yield getContext('payment');
  const { replace } = action.payload;
  const { resolve } = action.meta;

  try {
    // eslint-disable-next-line max-len
    const data: Pick<PaymentDataType, 'data' | 'pageInfo'> = yield call([ PaymentService, 'getPaymentInfo' ], action.payload);
    yield put(getPaymentInfo.successed({ data, replace }));
    if (resolve) {
      resolve();
    }
  } catch (err) {
    if (err.type === ERROR_ACTIONS.VALIDATION) {
      yield put(getPaymentInfo.failed.validation());
    }
    if (err.type === ERROR_ACTIONS.NETWORK) {
      yield put(getPaymentInfo.failed.network());
    }
  }
}

function* getEarningSummaryTask(action: ActionType<typeof getEarningSummaryInfo.request>) {
  const PaymentService:ServiceTypes['Payment'] = yield getContext('payment');

  const { replace } = action.payload;
  const { resolve } = action.meta;

  try {
    // eslint-disable-next-line max-len
    const data: Pick<EarningsSummaryDataType, 'pageInfo' | 'data'> = yield call([ PaymentService, 'getEarningSummaryInfo' ], action.payload);
    yield put(getEarningSummaryInfo.successed({ data, replace }));
    if (resolve) {
      resolve();
    }
  } catch (err) {
    if (err.type === ERROR_ACTIONS.VALIDATION) {
      yield put(getEarningSummaryInfo.failed.validation());
    }
    if (err.type === ERROR_ACTIONS.NETWORK) {
      yield put(getEarningSummaryInfo.failed.network());
    }
  }
}

export default function* () {
  yield takeLatest(getPaymentInfo.request, getPaymentTask);
  yield takeLatest(getEarningSummaryInfo.request, getEarningSummaryTask);
}
