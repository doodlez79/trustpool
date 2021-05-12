import { TIME_CHART_TYPES } from 'entitiesState/general';

export type HashrateType = {
  [TIME_CHART_TYPES.MIN]: number,
  [TIME_CHART_TYPES.DAY]: number,
  [TIME_CHART_TYPES.HOUR]: number
}

export type HashrateValutaType = {
  ['1day'] : number,
  ['3days']: number,
  ['7days']: number,
  default: number,
  pool: number
}
