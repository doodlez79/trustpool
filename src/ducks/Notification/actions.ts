import { generateAsyncActions } from 'helpers/Redux/Redux';
import { createActionCreator } from 'deox';

const rootPrefix = '@Notifications';

/** NotifInit */
const prefixNotifSync = `${rootPrefix}/SYNC`;
const notifSyncActionTypes = generateAsyncActions(prefixNotifSync);

export interface NotifSyncAction {
  type: typeof notifSyncActionTypes.REQUEST;

}

export interface NotifSyncSuccessedAction {
  type: typeof notifSyncActionTypes.SUCCESSED;
}

export interface NotifSyncFailedActionValidation {
  type: typeof notifSyncActionTypes.FAILED_VALIDATION;
}

export interface NotifSyncFailedActionNetwork {
  type: typeof notifSyncActionTypes.FAILED_NETWORK;
}

const syncNotification = {
  request: createActionCreator(
    notifSyncActionTypes.REQUEST,
  ),

  successed: createActionCreator(
    notifSyncActionTypes.SUCCESSED,
  ),
  failed: {
    network: createActionCreator(notifSyncActionTypes.FAILED_NETWORK),
    validation: createActionCreator(notifSyncActionTypes.FAILED_VALIDATION),
  },
};

/** NotifSubAdd */
const prefixNotifSubAdd = `${rootPrefix}/Sub-add`;
const notifSubAddActionTypes = generateAsyncActions(prefixNotifSubAdd);

export interface NotifSubAddAction {
  type: typeof notifSubAddActionTypes.REQUEST;
  payload: string
}
export interface NotifSubAddSuccessedAction {
  type: typeof notifSubAddActionTypes.SUCCESSED;
}
export interface NotifSubAddFailedActionValidation {
  type: typeof notifSubAddActionTypes.FAILED_VALIDATION;
}
export interface NotifSubAddFailedActionNetwork {
  type: typeof notifSubAddActionTypes.FAILED_NETWORK;
}

const subAddNotification = {
  request: createActionCreator(
    notifSubAddActionTypes.REQUEST,
    resolve => (payload:NotifSubAddAction['payload']) => resolve(payload),
  ),
  successed: createActionCreator(
    notifSubAddActionTypes.SUCCESSED,
  ),
  failed: {
    network: createActionCreator(notifSubAddActionTypes.FAILED_NETWORK),
    validation: createActionCreator(notifSubAddActionTypes.FAILED_VALIDATION),
  },
};

/** NotifSignOut */
const prefixNotifSignOut = `${rootPrefix}/Sign-out`;
const notifSignOutActionTypes = generateAsyncActions(prefixNotifSignOut);

export interface NotifSignOutAction {
  type: typeof notifSignOutActionTypes.REQUEST;
}
export interface NotifSignOutSuccessedAction {
  type: typeof notifSignOutActionTypes.SUCCESSED;
}
export interface NotifSignOutFailedActionValidation {
  type: typeof notifSignOutActionTypes.FAILED_VALIDATION;
}
export interface NotifSignOutFailedActionNetwork {
  type: typeof notifSignOutActionTypes.FAILED_NETWORK;
}

const signOutNotification = {
  request: createActionCreator(
    notifSignOutActionTypes.REQUEST,
  ),
  successed: createActionCreator(
    notifSignOutActionTypes.SUCCESSED,
  ),
  failed: {
    network: createActionCreator(notifSignOutActionTypes.FAILED_NETWORK),
    validation: createActionCreator(notifSignOutActionTypes.FAILED_VALIDATION),
  },
};
const noticeSetEmail = createActionCreator(`${rootPrefix}/noticeSetEmail`);

export {
  syncNotification, subAddNotification, signOutNotification, noticeSetEmail,
};
