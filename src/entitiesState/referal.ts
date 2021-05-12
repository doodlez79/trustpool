import { PageInfo } from 'types/pageInfo';

export interface ReferalsProfitType {
  coin: string
  hashrate: number
  profit: string
  time: Date
}
export interface ReferalListType {
  account: string
  hashrate1day: number
  profitRate: string
}

export interface ReferalsProfitDataType {
  pageInfo: PageInfo
  data: ReferalsProfitType[],
}

export interface ReferalsTypesState {
  loading: boolean
  profit: ReferalsProfitDataType
  list: ReferalListType[]
}
