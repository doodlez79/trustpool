import { createSelector } from 'reselect';

import { StoreTypes } from 'types/store';

const getGeneralInfoStore = (state: StoreTypes) => state.general;

export const isLoading = createSelector(getGeneralInfoStore, state => state.loading);
export const getGeneralStratumInfo = createSelector(getGeneralInfoStore, state => state.stratum);
export const getGeneralAccountInfo = createSelector(getGeneralInfoStore, state => state.accountInfo);
export const getGeneralWorkersInfo = createSelector(getGeneralInfoStore, state => state.workers);
export const getGeneralChartInfo = createSelector(getGeneralInfoStore, state => state.accountInfo.chart);
export const getCurrentChartTime = createSelector(getGeneralInfoStore, state => state.accountInfo.currentTime);
