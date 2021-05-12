import { COIN_TYPE } from 'entitiesState/currency';

export type SetPaymentAddressFillPageProps= {
  coin: COIN_TYPE
  address: string
  setAddress: (value: string)=>void
  setErrorCodeAddress: (value: number)=>void
  setPaymnetAddress: ()=>void
  errorCode: number
}
