import { HashrateType } from 'types/hashrate';
import { ChartType } from 'types/chart';

export enum TIME_CHART_TYPES {
  HOUR = 'hour',
  MIN = 'min',
  DAY = 'day'
}

export type GeneralStateType = {
  stratum: StratumInfoType
  accountInfo : AccountGeneralInfo
  workers: {
    totalActive: number
    totalUnactive: number
  }
  loading: boolean
}

export type StratumInfoType = {
  url: string
  urls: string[]
  ports: number[]
  quickSwitchUrl: string
  backupPorts: number[]
  backupQuickSwitchPorts: number[]
}
// from /res/saas/pool/BTC/home
// chart from /res/saas/pool/BTC/user/hashrate/{}/chart
export type AccountGeneralInfo = {

  accountBalance: string
  hashUnit: string
  hashrate: HashrateType
  paymentTotal: string
  ppsPlusRate: string
  profit: {
    ['24hour']: string
    total: string
    type: string
  }
  chart: {
    [TIME_CHART_TYPES.MIN]:Omit<ChartType, 'time'> & {start: number[]},
    [TIME_CHART_TYPES.DAY]:Omit<ChartType, 'time'> & {start: number[]},
    [TIME_CHART_TYPES.HOUR]:Omit<ChartType, 'time'> & {start: number[]}
  }
  currentTime: TIME_CHART_TYPES

}
