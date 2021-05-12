import { ActionType } from 'deox';
import {
  call,
  put,
  takeLatest,
  select,
  getContext,
} from 'redux-saga/effects';

import {
  AccountType, CurrentAccount, SubAccountsType, UserInfo,
} from 'entitiesState/account';
import { ERROR_ACTIONS } from 'types/ActionTypes';

import { Types as ServiceTypes } from 'services';
import {
  getAccountInfo,
  getSubAccountsInfo, postSubAccount,
  putChangeSubAccount, putChangeVisibleSubAccount, getUserInfo, setCurrentAccount,
} from './actions';
import { getUserInfo as getAccountInfoFromState } from './selectors';
import { noticeSetEmail, subAddNotification } from '../Notification/actions';

function* getAccountTask() {
  const AccountService: ServiceTypes['Account'] = yield getContext('account');

  try {
    const data: AccountType = yield call([ AccountService, 'getAccountInfo' ]);
    yield put(getAccountInfo.successed(data));
  } catch (err) {
    if (err.type === ERROR_ACTIONS.VALIDATION) {
      yield put(getAccountInfo.failed.validation());
    }
    if (err.type === ERROR_ACTIONS.NETWORK) {
      yield put(getAccountInfo.failed.network());
    }
  }
}

function* getSubAccountsTask() {
  const AccountService: ServiceTypes['Account'] = yield getContext('account');

  try {
    const data: SubAccountsType[] = yield call([ AccountService, 'getSubAccountsInfo' ]);

    yield put(getSubAccountsInfo.successed(data));
  } catch (err) {
    if (err.type === ERROR_ACTIONS.VALIDATION) {
      yield put(getSubAccountsInfo.failed.validation());
    }
    if (err.type === ERROR_ACTIONS.NETWORK) {
      yield put(getSubAccountsInfo.failed.network());
    }
  }
}

function* ChangeSubAccountTask(action: ActionType<typeof putChangeSubAccount.request>) {
  const AccountService: ServiceTypes['Account'] = yield getContext('account');
  const id = action.payload;

  const { resolve } = action.meta;

  const currentAccountInfo:UserInfo = yield select(getAccountInfoFromState);

  try {
    const UserInfo: UserInfo = yield call([ AccountService, 'getUserInfo' ]);

    if (UserInfo.id === currentAccountInfo.id) {
      const data: CurrentAccount = yield call([ AccountService, 'putChangeSubAccount' ], id);
      yield put(putChangeSubAccount.successed(data));
      if (resolve) {
        resolve();
      }
    } else {
      yield put(putChangeSubAccount.successed(UserInfo));
    }
    yield put(noticeSetEmail());
  } catch (err) {
    if (err.type === ERROR_ACTIONS.VALIDATION) {
      yield put(putChangeSubAccount.failed.validation());
    }
    if (err.type === ERROR_ACTIONS.NETWORK) {
      yield put(putChangeSubAccount.failed.network());
    }
  }
}

function* CreateSubAccountTask(action: ActionType<typeof postSubAccount.request>) {
  const AccountService: ServiceTypes['Account'] = yield getContext('account');
  const account = action.payload;
  const { resolve, reject } = action.meta;

  try {
    yield call([ AccountService, 'postSubAccount' ], account.account);
    yield put(subAddNotification.request(account.account));
    const data: SubAccountsType[] = yield call([ AccountService, 'getSubAccountsInfo' ]);
    yield put(getSubAccountsInfo.successed(data));
    if (resolve) {
      resolve();
    }
  } catch (err) {
    if (err.type === ERROR_ACTIONS.VALIDATION) {
      yield put(postSubAccount.failed.validation());
    }
    if (err.type === ERROR_ACTIONS.NETWORK) {
      yield put(postSubAccount.failed.network());
      if (reject) {
        reject(err.code);
      }
    }
  }
}

function* ChangeVisibleSubAccountTask(action: ActionType<typeof putChangeVisibleSubAccount.request>) {
  const AccountService: ServiceTypes['Account'] = yield getContext('account');
  const { id, visible } = action.payload;

  try {
    yield call([ AccountService, 'putChangeVisibleSubAccount' ], id, visible);
    const data: SubAccountsType[] = yield call([ AccountService, 'getSubAccountsInfo' ]);

    yield put(getSubAccountsInfo.successed(data));
  } catch (err) {
    if (err.type === ERROR_ACTIONS.VALIDATION) {
      yield put(postSubAccount.failed.validation());
    }
    if (err.type === ERROR_ACTIONS.NETWORK) {
      yield put(postSubAccount.failed.network());
    }
  }
}

function* GetUserInfoTask() {
  const AccountService: ServiceTypes['Account'] = yield getContext('account');

  try {
    const data: UserInfo = yield call([ AccountService, 'getUserInfo' ]);
    yield put(getUserInfo.successed(data));
    yield put(setCurrentAccount(data));
  } catch (err) {
    if (err.type === ERROR_ACTIONS.VALIDATION) {
      yield put(getUserInfo.failed.validation());
    }
    if (err.type === ERROR_ACTIONS.NETWORK) {
      yield put(getUserInfo.failed.network());
    }
  }
}

export default function* () {
  yield takeLatest(getAccountInfo.request, getAccountTask);
  yield takeLatest(getSubAccountsInfo.request, getSubAccountsTask);
  yield takeLatest(putChangeSubAccount.request, ChangeSubAccountTask);
  yield takeLatest(postSubAccount.request, CreateSubAccountTask);
  yield takeLatest(putChangeVisibleSubAccount.request, ChangeVisibleSubAccountTask);
  yield takeLatest(getUserInfo.request, GetUserInfoTask);
}
