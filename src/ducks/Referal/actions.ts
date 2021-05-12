import { createActionCreator } from 'deox';
import { generateAsyncActions } from 'helpers/Redux/Redux';
import { ReferalListType, ReferalsProfitDataType } from 'entitiesState/referal';
import { COIN_TYPE } from 'entitiesState/currency';

const rootPrefix = '@Referal';
/** getReferalsList */
const prefixGetReferalsList = `${rootPrefix}/getReferalList`;
const getReferalsListAction = generateAsyncActions(prefixGetReferalsList);

export interface GetReferalsListAction {
  type: typeof getReferalsListAction.REQUEST;
  payload: COIN_TYPE,
  meta: {
    resolve: () => void
  }
}
export interface GetReferalsListActionSuccessed {
  type: typeof getReferalsListAction.SUCCESSED;
  payload: ReferalListType[]
}
export interface GetReferalsListActionFailedNetwork {
  type: typeof getReferalsListAction.FAILED_NETWORK;
}
export interface GetReferalsListActionFailedValidation {
  type: typeof getReferalsListAction.FAILED_VALIDATION;
}
const getReferalsList = {
  request: createActionCreator(getReferalsListAction.REQUEST,
    resolve => (payload: GetReferalsListAction['payload'],
      meta:GetReferalsListAction['meta']) => resolve(payload, meta)),
  successed: createActionCreator(getReferalsListAction.SUCCESSED,
    resolve => (payload: GetReferalsListActionSuccessed['payload']) => resolve(payload)),
  failed: {
    network: createActionCreator(getReferalsListAction.FAILED_NETWORK),
    validation: createActionCreator(getReferalsListAction.FAILED_VALIDATION),
  },
};

/** getReferalsProfit */

const prefixGetReferalsProfit = `${rootPrefix}/getReferalProfit`;
const getReferalsProfitAction = generateAsyncActions(prefixGetReferalsProfit);

export interface GetReferalsProfitAction {
  type: typeof getReferalsProfitAction.REQUEST;
  payload: {
    coin: COIN_TYPE
    countPage: number
    replace: boolean
  },
  meta: {
    resolve: () => void
  }
}
export interface GetReferalsProfitActionSuccessed {
  type: typeof getReferalsProfitAction.SUCCESSED;
  payload: {
    data: Pick<ReferalsProfitDataType, 'data' | 'pageInfo'>
    replace: boolean
  },
}
export interface GetReferalsProfitActionFailedNetwork {
  type: typeof getReferalsProfitAction.FAILED_NETWORK;
}
export interface GetReferalsProfitActionFailedValidation {
  type: typeof getReferalsProfitAction.FAILED_VALIDATION;
}
const getReferalsProfit = {
  request: createActionCreator(getReferalsProfitAction.REQUEST,
    resolve => (payload: GetReferalsProfitAction['payload'],
      meta: GetReferalsProfitAction['meta']) => resolve(payload, meta)),
  successed: createActionCreator(getReferalsProfitAction.SUCCESSED,
    resolve => (payload: GetReferalsProfitActionSuccessed['payload']) => resolve(payload)),
  failed: {
    network: createActionCreator(getReferalsProfitAction.FAILED_NETWORK),
    validation: createActionCreator(getReferalsProfitAction.FAILED_VALIDATION),
  },
};

export { getReferalsList, getReferalsProfit };

// meta: GetReferalsProfitAction['meta']
