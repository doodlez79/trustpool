import {
  fork,
  call,
  put,
  take,
  takeLatest,
  cancelled,
  getContext,
} from 'redux-saga/effects';

import { eventChannel } from 'redux-saga';

import { ActionType } from 'deox';

import { AccountType } from 'entitiesState/Account';

import { Types as ServiceTypes } from 'services';

import { ERROR_ACTIONS } from 'types/ActionTypes';

import { actions as AccountActions } from '../Account';

import {
  signIn,
  signOut,
} from './actions';
import { reset } from '../common/actions';
import { signOutNotification, syncNotification, noticeSetEmail } from '../Notification/actions';

function createAPIServiceAuthErrorEventChannel(apiService: ServiceTypes['API']) {
  return eventChannel(emitter => {
    const unsubscribe = apiService.addErrorHandler((response: {
      code: number,
      message: string,
      type: ERROR_ACTIONS
    }) => {
      emitter(response.code === 4060 || response.code === 401);
    });

    return () => {
      if (typeof unsubscribe === 'function') {
        unsubscribe();
      }
    };
  });
}

function* apiServiceAuthErrorTask() {
  const apiService: ServiceTypes['API'] = yield getContext('api');

  const apiServiceAuthErrorEventChannel: any = yield call(
    createAPIServiceAuthErrorEventChannel,
    apiService,
  );

  try {
    while (true) {
      const isNonAuth: boolean = yield take(apiServiceAuthErrorEventChannel);

      if (isNonAuth) {
        yield call([ apiService, 'setAccessToken' ], null);
        yield put(signOut.successed());
      }
    }
  } finally {
    const isEventChannelCancelled: boolean = yield cancelled();

    if (isEventChannelCancelled) {
      apiServiceAuthErrorEventChannel.close();
    }
  }
}

function* signInTask(action: ActionType<typeof signIn.request>) {
  const authService: ServiceTypes['Auth'] = yield getContext('auth');

  const dataRequest = action.payload;

  const { resolve, reject } = action.meta;

  try {
    // eslint-disable-next-line max-len
    const { token, ...userInfo }: AccountType & {token: string} = yield call([ authService, 'signIn' ], dataRequest);
    const { id, account, accountType } = userInfo;

    yield put(signIn.successed(token));
    yield put(AccountActions.getAccountInfo.successed(userInfo));
    yield put(AccountActions.setCurrentAccount({ id, account, accountType }));

    if (resolve) {
      resolve();
      yield put(syncNotification.request());
      yield put(noticeSetEmail());
    }
  } catch (err) {
    // eslint-disable-next-line default-case
    switch (err.type) {
      case ERROR_ACTIONS.VALIDATION: {
        yield put(signIn.failed.validation());

        break;
      }
      case ERROR_ACTIONS.NETWORK: {
        yield put(signIn.failed.network());

        if (reject) {
          reject(err.code);
        }

        break;
      }
    }
  }
}

function* signOutTask(action: ActionType<typeof signOut.request>) {
  const authService: ServiceTypes['Auth'] = yield getContext('auth');

  const { resolve, reject } = action.meta;

  try {
    yield call([ authService, 'signOut' ]);

    yield put(signOut.successed());
    yield put(reset());
    yield put(signOutNotification.request());

    if (resolve) {
      resolve();
    }
  } catch (err) {
    if (err.type === ERROR_ACTIONS.VALIDATION) {
      yield put(signOut.failed.validation());
    }
    if (err.type === ERROR_ACTIONS.NETWORK) {
      yield put(signOut.failed.network());
    }
    if (reject) {
      reject();
    }
  }
}

export default function* () {
  yield fork(apiServiceAuthErrorTask);

  yield takeLatest(signIn.request, signInTask);
  yield takeLatest(signOut.request, signOutTask);
}
