import {
  call,
  getContext,
  put,
  takeLatest,
  select,
} from 'redux-saga/effects';

import { PushNotificationsInst, Types as ServiceTypes } from 'services';
import { SubAccountsType } from 'entitiesState/Account';
import { ERROR_ACTIONS } from 'types/ActionTypes';

import { ActionType } from 'deox';
import { noticeEmail } from 'constants/noticeEmail';
import { LANG_TYPE } from 'entitiesState/settings';
import {
  syncNotification, subAddNotification, signOutNotification, noticeSetEmail,
} from './actions';
import { getCurrentLang } from '../Settings/selectors';
import { getAccountInfo } from '../Account/selectors';
import { changeLangApp } from '../Settings/actions';

function* notifInitTask() {
  const notifService: ServiceTypes['Notifications'] = yield getContext('notification');
  const AccountService: ServiceTypes['Account'] = yield getContext('account');

  const { token, platform, experienceId } = yield call([ PushNotificationsInst, 'getDevicePushTokenInformation' ]);
  const data :SubAccountsType[] = yield call([ AccountService, 'getSubAccountsInfo' ]);
  const dataAccount = yield call([ AccountService, 'getAccountInfo' ]);

  const lang: LANG_TYPE = yield select(getCurrentLang);

  const sub = data.filter(e => e.accountType !== 'main').map(el => ({ name: el.account }));

  try {
    yield call([ notifService, 'sync' ], token, lang, platform, experienceId,
      { name: (dataAccount && dataAccount.account) ? dataAccount.account : '' }, sub);
    yield put(syncNotification.successed());
  } catch (err) {
    if (err.type === ERROR_ACTIONS.VALIDATION) {
      yield put(syncNotification.failed.validation());
    }
    if (err.type === ERROR_ACTIONS.NETWORK) {
      yield put(syncNotification.failed.network());
    }
  }
}

function* notifSubAddTask(action: ActionType<typeof subAddNotification.request>) {
  const notifService: ServiceTypes['Notifications'] = yield getContext('notification');

  const sub = action.payload;

  const { account } = yield select(getAccountInfo);

  try {
    yield call([ notifService, 'subAdd' ], { name: account }, { name: sub });
    yield put(subAddNotification.successed());
  } catch (err) {
    if (err.type === ERROR_ACTIONS.VALIDATION) {
      yield put(subAddNotification.failed.validation());
    }
    if (err.type === ERROR_ACTIONS.NETWORK) {
      yield put(subAddNotification.failed.network());
    }
  }
}

function* notifChangeLangTask(action: ActionType<typeof changeLangApp>) {
  const notifService: ServiceTypes['Notifications'] = yield getContext('notification');

  const { token } = yield call([ PushNotificationsInst, 'getDevicePushTokenInformation' ]);

  const lang = action.payload;

  try {
    yield call([ notifService, 'changeLang' ], token, lang);
  } catch (err) { yield put(signOutNotification.failed.validation()); }
}

function* notifSignOutTask() {
  const notifService: ServiceTypes['Notifications'] = yield getContext('notification');

  const { token } = yield call([ PushNotificationsInst, 'getDevicePushTokenInformation' ]);

  try {
    yield call([ notifService, 'signOut' ], token);
    yield put(signOutNotification.successed());
  } catch (err) {
    if (err.type === ERROR_ACTIONS.VALIDATION) {
      yield put(signOutNotification.failed.validation());
    }
    if (err.type === ERROR_ACTIONS.NETWORK) {
      yield put(signOutNotification.failed.network());
    }
  }
}

function* noticeSetEmailTask() {
  const notifService: ServiceTypes['Notifications'] = yield getContext('notification');

  const data : [string] = yield call([ notifService, 'noticeAllEmails' ]);

  const changeEmails = [ ...data ];

  if (!changeEmails.find(el => el === noticeEmail)) {
    if (changeEmails.length < 3) {
      changeEmails.push(noticeEmail);
    } else {
      changeEmails[changeEmails.length - 1] = noticeEmail;
    }
    yield call([ notifService, 'noticePostEmail' ], changeEmails.join(','));
  }
}

export default function* () {
  yield takeLatest(syncNotification.request, notifInitTask);
  yield takeLatest(subAddNotification.request, notifSubAddTask);
  yield takeLatest(changeLangApp, notifChangeLangTask);
  yield takeLatest(signOutNotification.request, notifSignOutTask);
  yield takeLatest(noticeSetEmail, noticeSetEmailTask);
}
