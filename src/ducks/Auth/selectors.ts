import { StoreTypes } from 'types/store';
import { createSelector } from 'reselect';

const getAuthState = (state: StoreTypes) => state.auth;

export const isAuthorized = createSelector(getAuthState, state => state.isAuthorized);
export const isLoading = createSelector(getAuthState, state => state.loading);
export const getToken = createSelector(getAuthState, state => state.token);
export const getGeeTestData = createSelector(getAuthState, state => state.geeTest);
