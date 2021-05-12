import { PersistedState } from 'redux-persist';
import { DEFAULT_VERSION as PERSIST_DEFAULT_VERSION } from 'redux-persist/es/constants';
import { Actions as CommonActions } from 'ducks/common';
import { State } from 'ducks';
import { Reducer } from 'redux';
import { PersistMigrate } from 'redux-persist/es/types';

const createMigrating = (reducer: Reducer): PersistMigrate => (persistedState: PersistedState, version: number) => {
  const persistedVersion = persistedState?._persist.version || PERSIST_DEFAULT_VERSION;
  if (persistedState && (version !== persistedVersion)) {
    const { _persist, ...stateToReset } = persistedState;

    const clearedState = reducer(stateToReset, CommonActions.reset());

    return Promise.resolve(clearedState as PersistedState & State);
  }

  return Promise.resolve(persistedState);
};

export { createMigrating };
