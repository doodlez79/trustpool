import { createActionCreator } from 'deox';
import { generateAsyncActions } from 'helpers/Redux/Redux';
import { AuthTypesState } from 'entitiesState/auth';
import { SignInTypeToRequest } from 'services/Auth/types';
import { ActionMetaPromise } from 'types/ActionTypes';

const rootPrefix = '@Auth';
/** SignIn */
const prefixSignIn = `${rootPrefix}/SingIn`;
const SignInActionTypes = generateAsyncActions(prefixSignIn);

export interface SignInAction {
  type: typeof SignInActionTypes.REQUEST;
  payload: SignInTypeToRequest
  meta: {
    resolve?: () => void;
    reject?: (errCode: number) => void;
  }
}
export interface SignInActionSuccessed {
  type: typeof SignInActionTypes.SUCCESSED;
  payload: AuthTypesState['token']
}
export interface SignInActionFailedNetwork {
  type: typeof SignInActionTypes.FAILED_NETWORK;
}
export interface SignInActionFailedValidation {
  type: typeof SignInActionTypes.FAILED_VALIDATION;
}

const signIn = {
  request: createActionCreator(SignInActionTypes.REQUEST,
    resolve => (payload:SignInAction['payload'], meta: SignInAction['meta']) => resolve(payload, meta)),
  successed: createActionCreator(SignInActionTypes.SUCCESSED,
    resolve => (payload:SignInActionSuccessed['payload']) => resolve(payload)),
  failed: {
    network: createActionCreator(SignInActionTypes.FAILED_NETWORK),
    validation: createActionCreator(SignInActionTypes.FAILED_VALIDATION),
  },
};

/** SingOut */
const prefixSingOut = `${rootPrefix}/SingOut`;
const SingOutActionTypes = generateAsyncActions(prefixSingOut);

export interface SingOutAction {
  type: typeof SingOutActionTypes.REQUEST;
  meta: ActionMetaPromise
}
export interface SingOutActionSuccessed {
  type: typeof SingOutActionTypes.SUCCESSED;
}
export interface SingOutActionFailedNetwork {
  type: typeof SingOutActionTypes.FAILED_NETWORK;
}
export interface SingOutActionFailedValidation {
  type: typeof SingOutActionTypes.FAILED_VALIDATION;
}

const signOut = {
  request: createActionCreator(SingOutActionTypes.REQUEST,
    resolve => (meta: SingOutAction['meta']) => resolve(null, meta)),
  successed: createActionCreator(SingOutActionTypes.SUCCESSED),
  failed: {
    network: createActionCreator(SingOutActionTypes.FAILED_NETWORK),
    validation: createActionCreator(SingOutActionTypes.FAILED_VALIDATION),
  },
};

export { signIn, signOut };
