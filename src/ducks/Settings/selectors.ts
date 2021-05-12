import { StoreTypes } from 'types/store';
import { createSelector } from 'reselect';
import { COIN_TYPE } from 'entitiesState/currency';

const getSettings = (state: StoreTypes) => state.setting;

export const isLoading = createSelector(getSettings, setting => setting.loading);
export const isLoadingChangeStatus = createSelector(getSettings, setting => setting.loadingChangeStatus);
export const getCurrentLang = createSelector(getSettings, setting => setting.lang);
export const getTokenChangePassword = createSelector(getSettings, setting => setting.tokenPasswordChange);
export const getTokenAddressChange = createSelector(getSettings, setting => setting.tokenAddressChange);
export const getWalletBalanceInfo = createSelector(getSettings, setting => setting.generalSettingsInfo);
export const getTrottlingData = createSelector(getSettings, setting => setting.trottlingData);

export const getTypeEnter = createSelector(getSettings, setting => setting.secureStore.typeEnter);
export const isSecureCode = createSelector(getSettings, setting => {
  if (setting.secureStore) {
    return setting.secureStore.isSecureCodeAuth;
  }
  return false;
});
export const isFirstVisitCodeScreen = createSelector(getSettings, setting => setting.secureStore.visitSecureCodeScreen);
export const getTypeLogin = createSelector(getSettings, setting => setting.secureStore.typeLogin);
export const getCurrentTypeLogin = createSelector(getSettings, setting => setting.secureStore.currentTypeLogin);
export const getResetCodeStatus = createSelector(getSettings, setting => setting.secureStore.resetCode);

export const getTheme = createSelector(getSettings, setting => setting.theme);
export const getWalletInfo = createSelector(getSettings, setting => setting.generalSettingsInfo);

export const getCoinListFromSettings = createSelector(getSettings, setting => {
  if (setting.settingsInfo) {
    return setting.settingsInfo.map(item => item.coin);
  }
  return [];
});
export const getInfoByCurrentCoin = (coin: COIN_TYPE) => createSelector(getSettings, setting => {
  const objectByCoin = setting.settingsInfo.find(item => item.coin === coin);
  if (objectByCoin) {
    return objectByCoin;
  }
  return null;
});
