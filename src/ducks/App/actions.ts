import { createActionCreator } from 'deox';

import { generateAsyncActions } from 'helpers/Redux/Redux';
import { COIN_TYPE } from 'src/entitiesState/currency';
import { TIME_CHART_TYPES } from 'src/entitiesState/general';
import { ActionMetaPromise } from 'src/types/ActionTypes';
import { WorkersStateType } from 'entitiesState/workers';

const rootPrefix = '@app';
/** appInit */
const prefixGetCode = `${rootPrefix}/init`;
const appActionTypes = generateAsyncActions(prefixGetCode);

export interface AppInitAction {
  type: typeof appActionTypes.REQUEST;
}
const appInit = {
  request: createActionCreator(appActionTypes.REQUEST),
  successed: createActionCreator(appActionTypes.SUCCESSED),
  failed: createActionCreator(appActionTypes.FAILED),
};

/** appNetworkConnection */
const prefixNetwork = `${rootPrefix}/network`;

const appNetwork = createActionCreator(prefixNetwork,
  resolve => (payload: boolean) => resolve(payload));

/** firstEnter */
const prefixFirstEnter = `${rootPrefix}/firstEnter`;

const firstEnter = createActionCreator(prefixFirstEnter);

/** inactive */

const prefixRefreshAll = `${rootPrefix}/refreshAll`;

const refreshActionTypes = generateAsyncActions(prefixRefreshAll);

export interface RefreshAction {
  type: typeof refreshActionTypes.REQUEST;
  payload: {
    time?: TIME_CHART_TYPES
    curCoin: COIN_TYPE
    countPage: number
    page: number
    replace: boolean
    isAuth: boolean
    sortConfig: WorkersStateType['sortConfig']
    // route: string
  }
  meta: ActionMetaPromise
}
export interface RefreshActionSuccessed {
  type: typeof refreshActionTypes.SUCCESSED;
}
export interface RefreshActionFailedNetwork {
  type: typeof refreshActionTypes.FAILED_NETWORK;
}
export interface RefreshActionFailedValidation {
  type: typeof refreshActionTypes.FAILED_VALIDATION;
}

const refresh60sec = {
  request: createActionCreator(refreshActionTypes.REQUEST,
    resolve => (payload: RefreshAction['payload'], meta: RefreshAction['meta']) => resolve(payload, meta)),
  successed: createActionCreator(refreshActionTypes.SUCCESSED),
  failed: {
    network: createActionCreator(refreshActionTypes.FAILED_NETWORK),
    validation: createActionCreator(refreshActionTypes.FAILED_VALIDATION),
  },
};

export {
  appInit, appNetwork, firstEnter, refresh60sec,
};
