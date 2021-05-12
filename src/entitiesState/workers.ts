import { PageInfo } from 'types/pageInfo';
import { HashrateType } from 'types/hashrate';
import { ChartType } from 'types/chart';
import { TIME_CHART_TYPES } from 'entitiesState/general';

// Информация по форкерам
// Request URL: https://trustpool.ru/res/saas/pool/{coin}/worker/group/-1
// Request Method: GET

// график хешрейта
// Request URL: https://trustpool.ru/res/saas/pool/{coin}/worker/{id}/hashrate/{}/chart
// Request Method: GET

export type WorkersStateType = {
  loading: boolean
  totalActive: number // from /res/saas/pool/BTC/home
  totalUnactive: number // from /res/saas/pool/BTC/home
  workers: WorkerItem[]
  sortConfig: {
    searchValue: string
    sortValue :{
      sortBy: string,
      orderBy: string
    }
    status: string
  }
  pageInfo: PageInfo
  chart: {
    workerId: number
    data: {
      [TIME_CHART_TYPES.DAY]:ChartType,
      [TIME_CHART_TYPES.MIN]:ChartType,
      [TIME_CHART_TYPES.HOUR]:ChartType,
    }
  }
  group: WorkersGroupState[]
}

export type WorkerItem = {
  coin: string // EMUN?
  groupId: number
  hashrate: HashrateType
  id: number
  lastActive: Date
  name: string
  recentHashrate: number
  rejectRate: number
  status: STATUS_WORKER_TYPE
  user: string
}

export type WorkersGroupState = {
  active:number,
  groupId: number,
  groupName: string,
  total: number,
  unactive: number,
}

export enum STATUS_WORKER_TYPE {
  ACTIVE = 'active',
  UNACTIVE ='unactive'
}
