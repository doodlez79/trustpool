import { HashrateValutaType } from 'types/hashrate';

export interface CurrencyType{
  blockReward: string
  blockTime: number
  coin: string
  coinPrice: string
  currConnections: number
  currDiff: number
  currPeriodRestRime: number
  hashUnit: string
  minPaymentAmount: string
  miningAlgorithm: string
  hashrate : HashrateValutaType
  nextPeriodDiff: number
  nextPeriodDiffFloat: string
  paymentEndTime: string
  paymentStartTime: string
  prePeriodDiff: string
  prePeriodDiffFloat: string
  prePeriodRestTime: Date
  pricingCurrency: string
  pricingCurrencySymbol: string
  rewardCoins: RewardCoinType[]
  unitOutput: string
  unitOutputCurrency: string
}

export type RewardCoinType = {
  giftCoin : string,
  reward: string
}

export type AllCoinsType = {
  coin: string
}

export interface CurrencyTypeToState{
  allValuts: CurrencyType[]
  loading: boolean
  allCoins : COIN_TYPE[]
  currentCoin : COIN_TYPE
  course: number
  fiatCurrency: string
}

export enum COIN_TYPE {
  BTC= 'BTC',
  BCH= 'BCH',
  BSV= 'BSV',
  LTC= 'LTC',
  ZEC = 'ZEC',
  DASH = 'DASH',
  RVN = 'RVN',
  DOGE= 'DOGE'
}

export type CurrencysCourseType = {
  data: {
    updatedAt: string
    value: number
  }
}

export enum CURRENCY_TYPE {
  RUB = 'RUB',
  USD = 'USD',
  EUR = 'EUR',
  CNY = 'CNY'
}
