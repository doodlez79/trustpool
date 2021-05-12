import Constants from 'expo-constants';

import { applyMiddleware, createStore } from 'redux';
import createSagaMiddleware from 'redux-saga';

import {
  persistReducer,
  persistStore,

  PersistConfig,

} from 'redux-persist';

import createTransform from 'redux-persist/es/createTransform';

import { composeWithDevTools } from 'redux-devtools-extension';

import AsyncStorage from '@react-native-async-storage/async-storage';

import rootReducer, { saga, Actions, State } from 'ducks';

import * as Services from 'services';

import { setDateMap } from 'helpers/SetDate';
import { createMigrating } from 'helpers/CreateMigrating';

const setDate = createTransform(
  state => ({ ...setDateMap(state) }),
);

export const configureStore = (initialState: any) => {
  const sagaMiddleware = createSagaMiddleware({
    context: {
      api: Services.APIService,
      auth: Services.AuthService,
      account: Services.AccountServicesInst,
      workers: Services.WorkersServicesInst,
      settings: Services.SettingsServicesInst,
      payment: Services.PaymentServicesInst,
      referals: Services.ReferalsServicesInst,
      general: Services.GeneralServicesInst,
      currency: Services.CurrencyServicesInst,
      notification: Services.NotificationsServicesInst,
      course: Services.CurrencysCoursesServicesInst,
    },
  });

  const persistConfig: PersistConfig<State> = {
    key: 'root',
    version: Constants.manifest.extra.version.buildNumber,
    storage: AsyncStorage,
    whitelist: [ 'user', 'setting', 'account', 'payment', 'referals', 'general', 'currency', 'course' ],
    transforms: [ setDate ],
    migrate: createMigrating(rootReducer),
  };

  const middlewares = composeWithDevTools(applyMiddleware(sagaMiddleware));
  const persistReducerStore = persistReducer(persistConfig, rootReducer);
  const store = createStore(persistReducerStore, initialState, middlewares);
  const persistor = persistStore(store, null, () => {
    store.dispatch(Actions.App.appInit.request());
  });

  sagaMiddleware.run(saga);

  return {
    persistor,
    store,
  };
};
