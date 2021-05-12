import { createSelector } from 'reselect';
import { StoreTypes } from 'types/store';

const getPaymentInfoStore = (state: StoreTypes) => state.payment;

export const isLoading = createSelector(getPaymentInfoStore, state => state.loading);
export const getPaymentData = createSelector(getPaymentInfoStore, state => state.payment.data);
export const getEarningSummaryInfo = createSelector(getPaymentInfoStore, state => state.earnings.summary.data);

export const getEarningSummaryMeta = createSelector(getPaymentInfoStore, state => state.earnings.summary.pageInfo);
export const getPaymentMeta = createSelector(getPaymentInfoStore, state => state.payment.pageInfo);
