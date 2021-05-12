import { createReducer } from 'deox';
import produce from 'immer';
import { ReferalsTypesState } from 'entitiesState/referal';
import { getReferalsList, getReferalsProfit } from './actions';
import { reset } from '../common/actions';

const initialState: ReferalsTypesState = {
  loading: false,
  list: [],
  profit: {
    pageInfo: {
      count: 1,
      currPage: 0,
      hasNext: false,
      total: 0,
      totalPage: 0,
    },
    data: [],
  },

};

const reducer = createReducer(initialState, handleAction => [
  handleAction([ getReferalsProfit.request, getReferalsList.request ], state => produce(state, next => {
    next.loading = true;
  })),

  handleAction([ getReferalsProfit.successed ], (state, action) => produce(state, next => {
    next.loading = false;
    next.profit.data = action.payload.replace ? action.payload.data.data
      : [ ...state.profit.data, ...action.payload.data.data ];
    next.profit.pageInfo = action.payload.data.pageInfo;
  })),
  handleAction([ getReferalsList.successed ], (state, action) => produce(state, next => {
    next.loading = false;
    next.list = action.payload;
  })),

  handleAction([ reset ], () => initialState),

  handleAction([
    getReferalsList.failed.network,
    getReferalsList.failed.validation,
    getReferalsProfit.failed.network,
    getReferalsProfit.failed.validation ], state => produce(state, next => {
    next.loading = false;
  })),

]);

export default reducer;
