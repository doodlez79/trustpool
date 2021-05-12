import { StoreTypes } from 'types/store';
import { createSelector } from 'reselect';

const getReferalsState = (state: StoreTypes) => state.referals;

export const isLoading = createSelector(getReferalsState, state => state.loading);
export const getReferalsList = createSelector(getReferalsState, state => state.list);
export const getReferalsProfit = createSelector(getReferalsState, state => state.profit.data);

export const getProfitListMeta = createSelector(getReferalsState, state => state.profit.pageInfo);
