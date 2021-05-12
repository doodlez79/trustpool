import { StoreTypes } from 'types/store';
import { createSelector } from 'reselect';

const getApp = (state: StoreTypes) => state.app;

export const isInitialized = createSelector(getApp, app => app.isInitialized);
export const isConnection = createSelector(getApp, app => app.connection);
export const isFirstVisit = createSelector(getApp, app => app.firstEnter);
