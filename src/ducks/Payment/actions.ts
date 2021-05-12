import { createActionCreator } from 'deox';

import { generateAsyncActions } from 'helpers/Redux/Redux';
import {
  EarningsSummaryDataType, PaymentDataType,
} from 'entitiesState/payment';
import { COIN_TYPE } from 'entitiesState/currency';

const rootPrefix = '@Payment';

/** PaymentInfo */

const prefixPayment = `${rootPrefix}/Payment`;
const GetPaymentActionTypes = generateAsyncActions(prefixPayment);

export interface GetPaymentAction {
  type: typeof GetPaymentActionTypes.REQUEST;
  payload: {
    coin: COIN_TYPE,
    countPage: number
    replace: boolean
  }
  meta: {
    resolve: ()=>void
    reject: ()=>void
  }
}
export interface GetPaymentActionSuccessed {
  type: typeof GetPaymentActionTypes.SUCCESSED;
  payload: {
    data: Pick<PaymentDataType, 'data' | 'pageInfo'>,
    replace: boolean
  }
}
export interface GetPaymentActionFailedNetwork {
  type: typeof GetPaymentActionTypes.FAILED_NETWORK;
}
export interface GetPaymentActionFailedValidation {
  type: typeof GetPaymentActionTypes.FAILED_VALIDATION;
}

const getPaymentInfo = {
  request: createActionCreator(GetPaymentActionTypes.REQUEST,
    resolve => (payload :GetPaymentAction['payload'], meta: GetPaymentAction['meta']) => resolve(payload, meta)),
  successed: createActionCreator(GetPaymentActionTypes.SUCCESSED,
    resolve => (payload:GetPaymentActionSuccessed['payload']) => resolve(payload)),
  failed: {
    network: createActionCreator(GetPaymentActionTypes.FAILED_NETWORK),
    validation: createActionCreator(GetPaymentActionTypes.FAILED_VALIDATION),
  },
};

/** EarningSummaryInfo */

const prefixEarningSummary = `${rootPrefix}/Earning_Summary`;
const GetEarningSummaryActionTypes = generateAsyncActions(prefixEarningSummary);

export interface GetEarningSummaryAction {
  type: typeof GetEarningSummaryActionTypes.REQUEST;
  payload:{
    countPage: number,
    coin: COIN_TYPE,
    replace: boolean
  }
  meta: {
    resolve: ()=>void
    reject: ()=>void
  }
}
export interface GetEarningSummaryActionSuccessed {
  type: typeof GetEarningSummaryActionTypes.SUCCESSED;
  payload: {
    data: Pick<EarningsSummaryDataType, 'data' | 'pageInfo' >,
    replace: boolean
  }
}
export interface GetEarningSummaryActionFailedNetwork {
  type: typeof GetEarningSummaryActionTypes.FAILED_NETWORK;
}
export interface GetEarningSummaryActionFailedValidation {
  type: typeof GetEarningSummaryActionTypes.FAILED_VALIDATION;
}

const getEarningSummaryInfo = {
  request: createActionCreator(GetEarningSummaryActionTypes.REQUEST,
    resolve => (payload: GetEarningSummaryAction['payload'],
      meta: GetEarningSummaryAction['meta']) => resolve(payload, meta)),
  successed: createActionCreator(GetEarningSummaryActionTypes.SUCCESSED,
    resolve => (payload:GetEarningSummaryActionSuccessed['payload']) => resolve(payload)),
  failed: {
    network: createActionCreator(GetEarningSummaryActionTypes.FAILED_NETWORK),
    validation: createActionCreator(GetEarningSummaryActionTypes.FAILED_VALIDATION),
  },
};

// clearSubList
const clearEarningDetails = createActionCreator(`${rootPrefix}/clearEarningDetails`);

export {
  getPaymentInfo, getEarningSummaryInfo, clearEarningDetails,
};
