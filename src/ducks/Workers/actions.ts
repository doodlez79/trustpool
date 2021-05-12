import { createActionCreator } from 'deox';
import { generateAsyncActions } from 'helpers/Redux/Redux';
import { WorkersGroupState, WorkersStateType } from 'entitiesState/workers';
import { GET_CHARTS_REQUEST_TYPE } from 'types/chart';
import { COIN_TYPE } from 'entitiesState/currency';
import { TIME_CHART_TYPES } from 'entitiesState/general';
import { ActionMetaPromise } from 'types/ActionTypes';

const rootPrefix = '@Workers';
/** getWorkers */
const prefixGetWorkers = `${rootPrefix}/getWorkers`;
const getWorkersAction = generateAsyncActions(prefixGetWorkers);

export interface GetWorkersAction {
  type: typeof getWorkersAction.REQUEST;
  payload: {
    loadingFlag?: boolean,
    group: number,
    coin:COIN_TYPE,
    page: number,
    replace: boolean
    searchValue?: string
    sortValue? :{
      sortBy: string,
      orderBy: string
    }
    status?: string
  }
  meta: {
    resolve: () => void
  }
}
export interface GetWorkersActionSuccessed {
  type: typeof getWorkersAction.SUCCESSED;
  payload: { data: Pick<WorkersStateType, 'workers' | 'pageInfo'>, replace: boolean}
}
export interface GetWorkersActionFailedNetwork {
  type: typeof getWorkersAction.FAILED_NETWORK;
}
export interface GetWorkersActionFailedValidation {
  type: typeof getWorkersAction.FAILED_VALIDATION;
}
const getWorkers = {
  request: createActionCreator(getWorkersAction.REQUEST,
    resolve => (payload: GetWorkersAction['payload'], meta: GetWorkersAction['meta']) => resolve(payload, meta)),
  successed: createActionCreator(getWorkersAction.SUCCESSED,
    resolve => (payload: GetWorkersActionSuccessed['payload']) => resolve(payload)),
  failed: {
    network: createActionCreator(getWorkersAction.FAILED_NETWORK),
    validation: createActionCreator(getWorkersAction.FAILED_VALIDATION),
  },
};
/** getWorker */
const prefixGetWorker = `${rootPrefix}/getWorker`;
const getWorkerAction = generateAsyncActions(prefixGetWorker);

export interface GetWorkerAction {
  type: typeof getWorkerAction.REQUEST;
  payload: GET_CHARTS_REQUEST_TYPE
}
export interface GetWorkerActionSuccessed {
  type: typeof getWorkerAction.SUCCESSED;
  payload: {
    [TIME_CHART_TYPES.HOUR]: WorkersStateType['chart'],
    [TIME_CHART_TYPES.MIN]: WorkersStateType['chart'],
    [TIME_CHART_TYPES.DAY]: WorkersStateType['chart'],
  }
}
export interface GetWorkerActionFailedNetwork {
  type: typeof getWorkerAction.FAILED_NETWORK;
}
export interface GetWorkerActionFailedValidation {
  type: typeof getWorkerAction.FAILED_VALIDATION;
}
const getWorker = {
  request: createActionCreator(getWorkerAction.REQUEST,
    resolve => (payload: GetWorkerAction['payload']) => resolve(payload)),
  successed: createActionCreator(getWorkerAction.SUCCESSED,
    resolve => (payload: GetWorkerActionSuccessed['payload']) => resolve(payload)),
  failed: {
    network: createActionCreator(getWorkerAction.FAILED_NETWORK),
    validation: createActionCreator(getWorkerAction.FAILED_VALIDATION),
  },
};

/** getWorkerGroup */
const prefixGetWorkersGroups = `${rootPrefix}/getWorkersGroups`;
const getWorkersGroupsAction = generateAsyncActions(prefixGetWorkersGroups);

export interface GetWorkersGroupsAction {
  type: typeof getWorkersGroupsAction.REQUEST;
}
export interface GetWorkersGroupsActionSuccessed {
  type: typeof getWorkersGroupsAction.SUCCESSED;
  payload: WorkersGroupState[]
}
export interface GetWorkersGroupsActionFailedNetwork {
  type: typeof getWorkersGroupsAction.FAILED_NETWORK;
}
export interface GetWorkersGroupsActionFailedValidation {
  type: typeof getWorkersGroupsAction.FAILED_VALIDATION;
}
const getWorkersGroups = {
  request: createActionCreator(getWorkersGroupsAction.REQUEST),
  successed: createActionCreator(getWorkersGroupsAction.SUCCESSED,
    resolve => (payload: GetWorkersGroupsActionSuccessed['payload']) => resolve(payload)),
  failed: {
    network: createActionCreator(getWorkersGroupsAction.FAILED_NETWORK),
    validation: createActionCreator(getWorkersGroupsAction.FAILED_VALIDATION),
  },
};

/** deleteWorkerGroup */
const prefixDeleteWorkerGroup = `${rootPrefix}/deleteWorkerGroup`;
const deleteWorkerGroupAction = generateAsyncActions(prefixDeleteWorkerGroup);

export interface DeleteWorkerGroupAction {
  type: typeof deleteWorkerGroupAction.REQUEST;
  payload: {
    groupId: number
  }
}
export interface DeleteWorkerGroupActionSuccessed {
  type: typeof deleteWorkerGroupAction.SUCCESSED;
  payload: {
    groupId: number
  }
}
export interface DeleteWorkerGroupActionFailedNetwork {
  type: typeof deleteWorkerGroupAction.FAILED_NETWORK;
}
export interface DeleteWorkerGroupActionFailedValidation {
  type: typeof deleteWorkerGroupAction.FAILED_VALIDATION;
}
const deleteWorkerGroup = {
  request: createActionCreator(deleteWorkerGroupAction.REQUEST,
    resolve => (payload: DeleteWorkerGroupAction['payload']) => resolve(payload)),
  successed: createActionCreator(deleteWorkerGroupAction.SUCCESSED,
    resolve => (payload: DeleteWorkerGroupActionSuccessed['payload']) => resolve(payload)),
  failed: {
    network: createActionCreator(deleteWorkerGroupAction.FAILED_NETWORK),
    validation: createActionCreator(deleteWorkerGroupAction.FAILED_VALIDATION),
  },
};

/** addWorkerGroup */
const prefixAddWorkerGroup = `${rootPrefix}/addWorkerGroup`;
const addWorkerGroupAction = generateAsyncActions(prefixAddWorkerGroup);

export interface AddWorkerGroupAction {
  type: typeof addWorkerGroupAction.REQUEST;
  payload: {
    name: string
  }
  meta: {
    resolve: ActionMetaPromise['resolve'],
    reject: (code: number) => void
  }
}
export interface AddWorkerGroupActionSuccessed {
  type: typeof addWorkerGroupAction.SUCCESSED;
}
export interface AddWorkerGroupActionFailedNetwork {
  type: typeof addWorkerGroupAction.FAILED_NETWORK;
}
export interface AddWorkerGroupActionFailedValidation {
  type: typeof addWorkerGroupAction.FAILED_VALIDATION;
}
const addWorkerGroup = {
  request: createActionCreator(addWorkerGroupAction.REQUEST,
    resolve => (payload: AddWorkerGroupAction['payload'],
      meta: AddWorkerGroupAction['meta']) => resolve(payload, meta)),
  successed: createActionCreator(addWorkerGroupAction.SUCCESSED),
  failed: {
    network: createActionCreator(addWorkerGroupAction.FAILED_NETWORK),
    validation: createActionCreator(addWorkerGroupAction.FAILED_VALIDATION),
  },
};

/** renameWorkerGroup */
const prefixRenameWorkerGroup = `${rootPrefix}/renameWorkerGroup`;
const renameWorkerGroupAction = generateAsyncActions(prefixRenameWorkerGroup);

export interface RenameWorkerGroupAction {
  type: typeof renameWorkerGroupAction.REQUEST;
  payload: {
    name: string
    id: number
  }
  meta: {
    resolve: ActionMetaPromise['resolve'],
    reject: (code: number) => void
  }
}
export interface RenameWorkerGroupActionSuccessed {
  type: typeof renameWorkerGroupAction.SUCCESSED;
}
export interface RenameWorkerGroupActionFailedNetwork {
  type: typeof renameWorkerGroupAction.FAILED_NETWORK;
}
export interface RenameWorkerGroupActionFailedValidation {
  type: typeof renameWorkerGroupAction.FAILED_VALIDATION;
}
const renameWorkerGroup = {
  request: createActionCreator(renameWorkerGroupAction.REQUEST,
    resolve => (payload: RenameWorkerGroupAction['payload'],
      meta: RenameWorkerGroupAction['meta']) => resolve(payload, meta)),
  successed: createActionCreator(renameWorkerGroupAction.SUCCESSED),
  failed: {
    network: createActionCreator(renameWorkerGroupAction.FAILED_NETWORK),
    validation: createActionCreator(renameWorkerGroupAction.FAILED_VALIDATION),
  },
};

/** moveItemToNewGroup */
const prefixMoveItemToNewGroup = `${rootPrefix}/moveItemToNewGroup`;
const moveItemToNewGroupAction = generateAsyncActions(prefixMoveItemToNewGroup);

export interface MoveItemToNewGroupAction {
  type: typeof moveItemToNewGroupAction.REQUEST;
  payload: {
    group: number
    elements: number[]
  }
  meta: {
    resolve: ActionMetaPromise['resolve'],
    reject: (code: number) => void
  }
}
export interface MoveItemToNewGroupActionSuccessed {
  type: typeof moveItemToNewGroupAction.SUCCESSED;
}
export interface MoveItemToNewGroupActionFailedNetwork {
  type: typeof moveItemToNewGroupAction.FAILED_NETWORK;
}
export interface MoveItemToNewGroupActionFailedValidation {
  type: typeof moveItemToNewGroupAction.FAILED_VALIDATION;
}
const moveItemsToNewGroup = {
  request: createActionCreator(moveItemToNewGroupAction.REQUEST,
    resolve => (payload: MoveItemToNewGroupAction['payload'],
      meta: MoveItemToNewGroupAction['meta']) => resolve(payload, meta)),
  successed: createActionCreator(moveItemToNewGroupAction.SUCCESSED),
  failed: {
    network: createActionCreator(moveItemToNewGroupAction.FAILED_NETWORK),
    validation: createActionCreator(moveItemToNewGroupAction.FAILED_VALIDATION),
  },
};

// setSortConfig
const prefixSetSortConfig = `${rootPrefix}/setSortConfig`;

export interface SetSortConfigAction {
  type: typeof prefixSetSortConfig;
  payload: WorkersStateType['sortConfig']
}
const setSortConfig = createActionCreator(prefixSetSortConfig,
  resolve => (payload: SetSortConfigAction['payload']) => resolve(payload));
// cleanChartData
const prefixCleanChartData = `${rootPrefix}/cleanChartData`;
const cleanChartData = createActionCreator(prefixCleanChartData);

export {
  getWorkers, getWorker, cleanChartData, setSortConfig,
  getWorkersGroups, deleteWorkerGroup, addWorkerGroup,
  renameWorkerGroup, moveItemsToNewGroup,
};
