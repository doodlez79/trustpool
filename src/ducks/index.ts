import { combineReducers, StateFromReducersMapObject } from 'redux';

import { all, fork } from 'redux-saga/effects';

import persistReducer from 'redux-persist/es/persistReducer';

import AsyncStorage from '@react-native-async-storage/async-storage';

import { createMigrating } from 'helpers/CreateMigrating';
import Constants from 'expo-constants';
import { Actions as CommonActions } from './common';

import appReducer, {
  actions as appActions,
  saga as appSaga,
  selectors as appSelectors,
} from './App';

import workersReducer, {
  actions as workersActions,
  saga as workersSaga,
  selectors as workersSelectors,
} from './Workers';

import settingReducer, {
  actions as settingActions,
  saga as settingsSaga,
  selectors as settingSelectors,
} from './Settings';

import authReducer, {
  actions as authActions,
  saga as authSaga,
  selectors as authSelectors,
} from './Auth';

import accountReducer, {
  actions as accountActions,
  selectors as accountSelectors,
  saga as accountInfoSaga,
} from './Account';

import paymentReducer, {
  actions as paymentActions,
  selectors as paymentSelectors,
  saga as paymentInfoSaga,
} from './Payment';

import {
  actions as notificationActions,
  saga as notificationInfoSaga,
} from './Notification';

import currencyReducer, {
  actions as currencyActions,
  selectors as currencySelectors,
  saga as currencyInfoSaga,
} from './Currency';

import referalsReducer, {
  actions as referalsActions,
  selectors as referalsSelectors,
  saga as referalsInfoSaga,
} from './Referal';

import generalReducer, {
  actions as generalActions,
  saga as generalSaga,
  selectors as generalSelectors,
} from './General';

const workersPersistConfig = {
  key: 'workers',
  version: Constants.manifest.extra.version.buildNumber,
  storage: AsyncStorage,
  blacklist: [ 'sortConfig' ],
  migrate: createMigrating(workersReducer),
};

const appPersistConfig = {
  key: 'app',
  version: Constants.manifest.extra.version.buildNumber,
  storage: AsyncStorage,
  whitelist: [ 'firstEnter' ],
  migrate: createMigrating(appReducer),
};

const authPersistConfig = {
  key: 'auth',
  version: Constants.manifest.extra.version.buildNumber,
  storage: AsyncStorage,
  migrate: createMigrating(authReducer),
};

const reducersMap = {
  app: persistReducer(appPersistConfig, appReducer),
  auth: persistReducer(authPersistConfig, authReducer),
  account: accountReducer,
  setting: settingReducer,
  workers: persistReducer(workersPersistConfig, workersReducer),
  payment: paymentReducer,
  referals: referalsReducer,
  general: generalReducer,
  currency: currencyReducer,
};

const reducer = combineReducers(reducersMap);

const actions = {
  Common: CommonActions,
  Auth: authActions,
  App: appActions,
  Account: accountActions,
  Setting: settingActions,
  Workers: workersActions,
  Payment: paymentActions,
  Referals: referalsActions,
  General: generalActions,
  Currency: currencyActions,
  Notification: notificationActions,
};

const selectors = {
  Auth: authSelectors,
  App: appSelectors,
  Account: accountSelectors,
  Setting: settingSelectors,
  Workers: workersSelectors,
  Payment: paymentSelectors,
  Referals: referalsSelectors,
  General: generalSelectors,
  Currency: currencySelectors,
};

function* saga() {
  yield all([
    fork(appSaga),
    fork(authSaga),
    fork(workersSaga),
    fork(accountInfoSaga),
    fork(settingsSaga),
    fork(paymentInfoSaga),
    fork(referalsInfoSaga),
    fork(generalSaga),
    fork(currencyInfoSaga),
    fork(notificationInfoSaga),
  ]);
}

export type State = StateFromReducersMapObject<typeof reducersMap>;

export {
  reducer as default,
  saga,
  selectors as Selectors,
  actions as Actions,
};
