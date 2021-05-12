import { createSelector } from 'reselect';

import { StoreTypes } from 'types/store';

const getAccountInfoStore = (state: StoreTypes) => state.account;

export const isLoading = createSelector(getAccountInfoStore, state => state.loading);
export const getAccountInfo = createSelector(getAccountInfoStore, state => state.accountInfo);
export const getSubAccounts = createSelector(getAccountInfoStore, state => state.subAccounts);
export const getCurrentAccount = createSelector(getAccountInfoStore, state => state.currentAccount);
export const getUserInfo = createSelector(getAccountInfoStore, state => state.info);
export const idCurrentUser = createSelector(getAccountInfoStore, state => state.currentAccount!.id);
export const getVisibleAccounts = createSelector(getAccountInfoStore,
  state => state.subAccounts.filter(el => el.visible));
export const getIdForChangeSubFromNotif = (acc:string) => createSelector(getAccountInfoStore, state => {
  const currentAcc = state.subAccounts.find(el => el.account === acc);
  if (currentAcc) {
    return currentAcc.id;
  }
  return 0;
});
