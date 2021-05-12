import { TIME_CHART_TYPES } from 'entitiesState/general';

export type ChartType = {
  hashrate: number[]
  rejectRate: number[]
  workers: number[]
  time: number[]
  unit: string
}

export type GET_CHARTS_REQUEST_TYPE = {id: number, time?: TIME_CHART_TYPES, coin?: string}
