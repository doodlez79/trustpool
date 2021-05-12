import { createReducer } from 'deox';
import produce from 'immer';
import { PaymentStateType } from 'entitiesState/payment';

import {
  clearEarningDetails, getEarningSummaryInfo, getPaymentInfo,
} from './actions';
import { reset } from '../common/actions';

const initialState : PaymentStateType = {
  loading: false,
  payment: {
    data: [],
    pageInfo: {
      total: 1,
      totalPage: 1,
      count: 1,
      currPage: 1,
      hasNext: false,
    },
  },
  paymentTotal: '',
  earnings: {
    summary: {
      pageInfo: {
        total: 1,
        totalPage: 1,
        count: 1,
        currPage: 1,
        hasNext: false,
      },
      data: [],
    },
  },
};

const reducer = createReducer(initialState, handleAction => [
  handleAction([ getPaymentInfo.request, getEarningSummaryInfo.request,
  ],
  state => produce(state, next => {
    next.loading = true;
  })),
  handleAction([ getPaymentInfo.successed ], (state, action) => produce(state, next => {
    next.payment.data = action.payload.replace ? action.payload.data.data
      : state.payment.data.concat(action.payload.data.data);
    next.payment.pageInfo = action.payload.data.pageInfo;
    next.loading = false;
  })),

  handleAction([ getEarningSummaryInfo.successed ], (state, action) => produce(state, next => {
    next.earnings.summary.data = action.payload.replace ? action.payload.data.data
      : state.earnings.summary.data.concat(action.payload.data.data);
    next.earnings.summary.pageInfo = action.payload.data.pageInfo;
    next.loading = false;
  })),

  handleAction([ clearEarningDetails ], state => produce(state, next => {
    next.earnings.detail.data = initialState.earnings.detail.data;
  })),

  handleAction([ reset ], () => initialState),

  handleAction([
    getPaymentInfo.failed.network,
    getPaymentInfo.failed.validation,
    getEarningSummaryInfo.failed.validation,
    getEarningSummaryInfo.failed.network ],
  state => produce(state, next => {
    next.loading = false;
  })),
]);

export default reducer;
