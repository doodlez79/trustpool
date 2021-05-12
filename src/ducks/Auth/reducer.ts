import { createReducer } from 'deox';
import produce from 'immer';

import { AuthTypesState } from 'entitiesState/auth';
import { signIn, signOut } from './actions';

const initialState: AuthTypesState = {
  isAuthorized: false,
  loading: false,
  token: null,
};

const reducer = createReducer(initialState, handleAction => [
  handleAction([
    signIn.request,
    signOut.request,
  ], state => produce(state, next => {
    next.loading = true;
  })),

  handleAction([ signIn.successed ], (state, action) => produce(state, next => {
    next.loading = false;
    next.isAuthorized = true;
    next.token = action.payload;
  })),

  handleAction([ signOut.successed ], state => produce(state, next => {
    next.isAuthorized = false;
    next.token = null;
  })),

  handleAction([
    signIn.failed.validation,
    signIn.failed.network,
    signOut.failed.network,
    signOut.failed.validation,
  ], state => produce(state, next => {
    next.loading = false;
  })),
]);

export default reducer;
