import { GeneralStateType, TIME_CHART_TYPES } from 'entitiesState/general';

export type ResponseTypeChartData = {
  [TIME_CHART_TYPES.MIN]:GeneralStateType['accountInfo']['chart'][TIME_CHART_TYPES.MIN],
  [TIME_CHART_TYPES.DAY]:GeneralStateType['accountInfo']['chart'][TIME_CHART_TYPES.DAY],
  [TIME_CHART_TYPES.HOUR]:GeneralStateType['accountInfo']['chart'][TIME_CHART_TYPES.HOUR],
}
