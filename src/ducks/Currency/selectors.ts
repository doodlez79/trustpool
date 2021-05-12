import { createSelector } from 'reselect';

import { StoreTypes } from 'types/store';

const getCurrencyInfoStore = (state: StoreTypes) => state.currency;

export const isLoading = createSelector(getCurrencyInfoStore, state => state.loading);
export const allValutsInfo = createSelector(getCurrencyInfoStore, state => state.allValuts);
export const allCoins = createSelector(getCurrencyInfoStore, state => state.allCoins);
export const currentCoin = createSelector(getCurrencyInfoStore, state => state.currentCoin);
export const currentCourse = createSelector(getCurrencyInfoStore, state => state.course);
export const currentFiatCurrency = createSelector(getCurrencyInfoStore, state => state.fiatCurrency);
export const getInfoByCoin = createSelector(getCurrencyInfoStore, state => {
  if (state.allValuts.find(el => el.coin === state.currentCoin)) {
    return state.allValuts.find(el => el.coin === state.currentCoin);
  }
  return {
    nextPeriodDiff: 0, currDiff: 0, coinPrice: '0', pricingCurrency: '',
  };
});
