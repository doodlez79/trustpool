import { createActionCreator } from 'deox';

import { generateAsyncActions } from 'helpers/Redux/Redux';
import {
  AccountType, CurrentAccount, SubAccountsType, UserInfo,
} from 'entitiesState/account';
import { ActionMetaPromise } from 'types/ActionTypes';

const rootPrefix = '@Account';
/** AccountInfo */
const prefixAccount = `${rootPrefix}/Account`;
const GetAccountActionTypes = generateAsyncActions(prefixAccount);

export interface GetAccountAction {
  type: typeof GetAccountActionTypes.REQUEST;
}
export interface GetAccountActionSuccessed {
  type: typeof GetAccountActionTypes.SUCCESSED;
  payload: AccountType
}
export interface GetAccountActionFailedNetwork {
  type: typeof GetAccountActionTypes.FAILED_NETWORK;
}
export interface GetAccountActionFailedValidation {
  type: typeof GetAccountActionTypes.FAILED_VALIDATION;
}

const getAccountInfo = {
  request: createActionCreator(GetAccountActionTypes.REQUEST),
  successed: createActionCreator(GetAccountActionTypes.SUCCESSED,
    resolve => (payload:GetAccountActionSuccessed['payload']) => resolve(payload)),
  failed: {
    network: createActionCreator(GetAccountActionTypes.FAILED_NETWORK),
    validation: createActionCreator(GetAccountActionTypes.FAILED_VALIDATION),
  },
};

/** SubAccountsInfo */
const prefixSubAccounts = `${rootPrefix}/SubAccounts`;
const GetSubAccountsActionTypes = generateAsyncActions(prefixSubAccounts);

export interface GetSubAccountsAction {
  type: typeof GetSubAccountsActionTypes.REQUEST;
}
export interface GetSubAccountsActionSuccessed {
  type: typeof GetSubAccountsActionTypes.SUCCESSED;
  payload: SubAccountsType[]
}
export interface GetSubAccountsActionFailedNetwork {
  type: typeof GetSubAccountsActionTypes.FAILED_NETWORK;
}
export interface GetSubAccountsActionFailedValidation {
  type: typeof GetSubAccountsActionTypes.FAILED_VALIDATION;
}

const getSubAccountsInfo = {
  request: createActionCreator(GetSubAccountsActionTypes.REQUEST),
  successed: createActionCreator(GetSubAccountsActionTypes.SUCCESSED,
    resolve => (payload:GetSubAccountsActionSuccessed['payload']) => resolve(payload)),
  failed: {
    network: createActionCreator(GetSubAccountsActionTypes.FAILED_NETWORK),
    validation: createActionCreator(GetSubAccountsActionTypes.FAILED_VALIDATION),
  },
};

/** ChangeSubAccount */
const prefixChangeSubAccount = `${rootPrefix}/ChangeSubAccount`;
const ChangeSubActionTypes = generateAsyncActions(prefixChangeSubAccount);

export interface ChangeSubAccountAction {
  type: typeof ChangeSubActionTypes.REQUEST;
  payload: number
  meta?: ActionMetaPromise
}
export interface ChangeSubAccountActionSuccessed {
  type: typeof ChangeSubActionTypes.SUCCESSED;
  payload: CurrentAccount

}
export interface ChangeSubAccountActionFailedNetwork {
  type: typeof ChangeSubActionTypes.FAILED_NETWORK;
}
export interface ChangeSubAccountActionFailedValidation {
  type: typeof ChangeSubActionTypes.FAILED_VALIDATION;
}

const putChangeSubAccount = {
  request: createActionCreator(ChangeSubActionTypes.REQUEST,
    resolve => (payload:ChangeSubAccountAction['payload'],
      meta: ChangeSubAccountAction['meta']) => resolve(payload, meta)),
  successed: createActionCreator(ChangeSubActionTypes.SUCCESSED,
    resolve => (payload:ChangeSubAccountActionSuccessed['payload']) => resolve(payload)),
  failed: {
    network: createActionCreator(ChangeSubActionTypes.FAILED_NETWORK),
    validation: createActionCreator(ChangeSubActionTypes.FAILED_VALIDATION),
  },
};

/** CreateSubAccount */
const prefixCreateSubAccount = `${rootPrefix}/CreateSubAccount`;
const CreateSubActionTypes = generateAsyncActions(prefixCreateSubAccount);

export interface CreateSubAccountAction {
  type: typeof CreateSubActionTypes.REQUEST;
  payload: {
    account: string
  }
  meta: {
    resolve: ActionMetaPromise['resolve'],
    reject: (code: number) => void
  }

}
export interface CreateSubAccountActionSuccessed {
  type: typeof CreateSubActionTypes.SUCCESSED;
  payload: {
    account: string,
    id: number,
  }
}
export interface CreateSubAccountActionFailedNetwork {
  type: typeof CreateSubActionTypes.FAILED_NETWORK;
}
export interface CreateSubAccountActionFailedValidation {
  type: typeof CreateSubActionTypes.FAILED_VALIDATION;
}

const postSubAccount = {
  request: createActionCreator(CreateSubActionTypes.REQUEST,
    resolve => (payload:CreateSubAccountAction['payload'],
      meta: CreateSubAccountAction['meta']) => resolve(payload, meta)),
  successed: createActionCreator(CreateSubActionTypes.SUCCESSED,
    resolve => (payload:CreateSubAccountActionSuccessed['payload']) => resolve(payload)),
  failed: {
    network: createActionCreator(CreateSubActionTypes.FAILED_NETWORK),
    validation: createActionCreator(CreateSubActionTypes.FAILED_VALIDATION),
  },
};

/** ChangeVisibleSubAccount */
const prefixChangeVisibleSubAccount = `${rootPrefix}/ChangeVisibleSubAccount`;
const ChangeVisibleSubActionTypes = generateAsyncActions(prefixChangeVisibleSubAccount);

export interface ChangeVisibleSubAccountAction {
  type: typeof ChangeVisibleSubActionTypes.REQUEST;
  payload: {
    id: number,
    visible: boolean
  }
}
export interface ChangeVisibleSubAccountActionSuccessed {
  type: typeof ChangeVisibleSubActionTypes.SUCCESSED;
}
export interface ChangeVisibleSubAccountActionFailedNetwork {
  type: typeof ChangeVisibleSubActionTypes.FAILED_NETWORK;
}
export interface ChangeVisibleSubAccountActionFailedValidation {
  type: typeof ChangeVisibleSubActionTypes.FAILED_VALIDATION;
}

const putChangeVisibleSubAccount = {
  request: createActionCreator(ChangeVisibleSubActionTypes.REQUEST,
    resolve => (payload:ChangeVisibleSubAccountAction['payload']) => resolve(payload)),
  successed: createActionCreator(ChangeVisibleSubActionTypes.SUCCESSED),
  failed: {
    network: createActionCreator(ChangeVisibleSubActionTypes.FAILED_NETWORK),
    validation: createActionCreator(ChangeVisibleSubActionTypes.FAILED_VALIDATION),
  },
};

/** GetUserInfo */
const prefixGetUserInfo = `${rootPrefix}/Info`;
const GetUserInfoTypes = generateAsyncActions(prefixGetUserInfo);

export interface GetUserInfoAction {
  type: typeof GetUserInfoTypes.REQUEST;
}
export interface GetUserInfoActionActionSuccessed {
  type: typeof GetUserInfoTypes.SUCCESSED;
  payload: UserInfo
}
export interface GetUserInfoActionActionFailedNetwork {
  type: typeof GetUserInfoTypes.FAILED_NETWORK;
}
export interface GetUserInfoActionActionFailedValidation {
  type: typeof GetUserInfoTypes.FAILED_VALIDATION;
}

const getUserInfo = {
  request: createActionCreator(GetUserInfoTypes.REQUEST),
  successed: createActionCreator(GetUserInfoTypes.SUCCESSED,
    resolve => (payload:GetUserInfoActionActionSuccessed['payload']) => resolve(payload)),
  failed: {
    network: createActionCreator(GetUserInfoTypes.FAILED_NETWORK),
    validation: createActionCreator(GetUserInfoTypes.FAILED_VALIDATION),
  },
};

/** setCurrentAccount */
const prefixSetCurrentAccount = `${rootPrefix}/SetCurrentAccount`;

export interface SetCurrentAccountAction {
  type: typeof prefixSetCurrentAccount;
  payload: CurrentAccount
}

const setCurrentAccount = createActionCreator(prefixSetCurrentAccount,
  resolve => (payload:SetCurrentAccountAction['payload']) => resolve(payload));

/** setNotificationToken */
const prefixSetNotificationToken = `${rootPrefix}/SetNotificationToken`;

export interface SetNotificationTokenAction {
  type: typeof prefixSetNotificationToken;
  payload: string
}

const setNotificationToken = createActionCreator(prefixSetCurrentAccount,
  resolve => (payload:SetNotificationTokenAction['payload']) => resolve(payload));

// clearSubList
const clearSubList = createActionCreator(`${rootPrefix}/clearSubList`);

export {
  getAccountInfo, getSubAccountsInfo, setNotificationToken, getUserInfo,
  putChangeSubAccount, setCurrentAccount, postSubAccount, putChangeVisibleSubAccount, clearSubList,
};
