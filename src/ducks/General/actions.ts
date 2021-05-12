import { generateAsyncActions } from 'helpers/Redux/Redux';
import { createActionCreator } from 'deox';

import { GeneralStateType, TIME_CHART_TYPES } from 'entitiesState/general';
import { ActionMetaPromise } from 'types/ActionTypes';

const rootPrefix = '@General';

/** GeneralInfo */

const prefixGeneral = `${rootPrefix}/General`;
const GetGeneralActionTypes = generateAsyncActions(prefixGeneral);

export interface GetGeneralAction {
  type: typeof GetGeneralActionTypes.REQUEST;
  payload: string
}
export interface GetGeneralActionSuccessed {
  type: typeof GetGeneralActionTypes.SUCCESSED;
  payload: GeneralStateType
}
export interface GetGeneralActionFailedNetwork {
  type: typeof GetGeneralActionTypes.FAILED_NETWORK;
}
export interface GetGeneralActionFailedValidation {
  type: typeof GetGeneralActionTypes.FAILED_VALIDATION;
}

const getGeneralInfo = {
  request: createActionCreator(GetGeneralActionTypes.REQUEST,
    resolve => (payload:GetGeneralAction['payload']) => resolve(payload)),
  successed: createActionCreator(GetGeneralActionTypes.SUCCESSED,
    resolve => (payload:GetGeneralActionSuccessed['payload']) => resolve(payload)),
  failed: {
    network: createActionCreator(GetGeneralActionTypes.FAILED_NETWORK),
    validation: createActionCreator(GetGeneralActionTypes.FAILED_VALIDATION),
  },
};
/** getFullInfo */
const prefixGetFullInfo = `${rootPrefix}/getFullInfo`;
const getFullInfoActionType = generateAsyncActions(prefixGetFullInfo);

export interface GetFullInfoAction {
  type: typeof getFullInfoActionType.REQUEST;
  meta: ActionMetaPromise
}
export interface GetFullInfoActionSuccessed {
  type: typeof getFullInfoActionType.SUCCESSED;
}
export interface GetFullInfoActionFailedNetwork {
  type: typeof getFullInfoActionType.FAILED_NETWORK;
}
export interface GetFullInfoActionFailedValidation {
  type: typeof getFullInfoActionType.FAILED_VALIDATION;
}

const getFullInfo = {
  request: createActionCreator(getFullInfoActionType.REQUEST,
    resolve => (meta: GetFullInfoAction['meta']) => resolve(null, meta)),
  successed: createActionCreator(getFullInfoActionType.SUCCESSED),
  failed: {
    network: createActionCreator(getFullInfoActionType.FAILED_NETWORK),
    validation: createActionCreator(getFullInfoActionType.FAILED_VALIDATION),
  },
};

/** GeneralChart */

const prefixGeneralChart = `${rootPrefix}/General_Chart`;
const GetGeneralChartActionTypes = generateAsyncActions(prefixGeneralChart);

export interface GetGeneralChartAction {
  type: typeof GetGeneralChartActionTypes.REQUEST;
  payload: { time: TIME_CHART_TYPES, loadingFlag?: boolean }
  meta?: ActionMetaPromise
}
export interface GetGeneralChartActionSuccessed {
  type: typeof GetGeneralChartActionTypes.SUCCESSED;
  payload: {
    [TIME_CHART_TYPES.MIN]:GeneralStateType['accountInfo']['chart'][TIME_CHART_TYPES.MIN],
    [TIME_CHART_TYPES.DAY]:GeneralStateType['accountInfo']['chart'][TIME_CHART_TYPES.DAY],
    [TIME_CHART_TYPES.HOUR]:GeneralStateType['accountInfo']['chart'][TIME_CHART_TYPES.HOUR],
  }
}
export interface GetGeneralChartActionFailedNetwork {
  type: typeof GetGeneralChartActionTypes.FAILED_NETWORK;
}
export interface GetGeneralChartActionFailedValidation {
  type: typeof GetGeneralChartActionTypes.FAILED_VALIDATION;
}

const getGeneralChartInfo = {
  request: createActionCreator(GetGeneralChartActionTypes.REQUEST,
    resolve => (payload:GetGeneralChartAction['payload'],
      meta:GetGeneralChartAction['meta']) => resolve(payload, meta)),
  successed: createActionCreator(GetGeneralChartActionTypes.SUCCESSED,
    resolve => (payload:GetGeneralChartActionSuccessed['payload']) => resolve(payload)),
  failed: {
    network: createActionCreator(GetGeneralChartActionTypes.FAILED_NETWORK),
    validation: createActionCreator(GetGeneralChartActionTypes.FAILED_VALIDATION),
  },
};

/** GeneralChart */

const setCurrentTimeForMainChartPrefix = `${rootPrefix}/Current_Chart_time`;

export interface ChangeCurrentChartTimeAction {
  type: typeof setCurrentTimeForMainChartPrefix;
  payload: TIME_CHART_TYPES
}

const setCurrentTimeForMainChart = createActionCreator(setCurrentTimeForMainChartPrefix,
  resolve => (payload:ChangeCurrentChartTimeAction['payload']) => resolve(payload));

export {
  getGeneralInfo, getGeneralChartInfo, getFullInfo, setCurrentTimeForMainChart,
};
