import { PageInfo } from 'types/pageInfo';

// PAYMENT STORE
export type PaymentStateType = {
  loading: boolean
  payment: PaymentDataType
  paymentTotal: string // from /res/saas/pool/BTC/home
  earnings: {
    summary: EarningsSummaryDataType
  }
}

// график
// Request URL: https://trustpool.ru/res/saas/profit/{coin}/chart
// Request Method: GET

// payment
// Request URL: https://trustpool.ru/res/saas/profit/BTC/payment?page=1&limit=50
// Request Method: GET

export type PaymentDataType = {
  pageInfo: PageInfo
  data: PaymentDataItemType[]
}

export interface PaymentDataItemType {
  address:string
  adressUrl: string
  amount: string
  coin: string
  status: PAYMENT_STATUS_TYPE
  time: Date | string
  txUrl: string
  txId: string
}

export enum PAYMENT_STATUS_TYPE{
  completed = 'completed',
  uncompleted = 'uncompleted'
}

// earnings
// Краткое содержание
// Request URL: https://trustpool.ru/res/saas/profit/BTC/summary?page=1&limit=50
//   Request Method: GET

export type EarningsSummaryDataType = {
  pageInfo: PageInfo
  data: EarningsSummaryDataItemType[]

}

export type EarningsSummaryDataItemType = {
  coin: string
  date: string
  hashrate: number
  id: number
  pplnsProfit: string
  ppsPlusRate: string
  ppsProfit: string
  soloProfit: string
  totalProfit: string
  unitOutput: string
}
