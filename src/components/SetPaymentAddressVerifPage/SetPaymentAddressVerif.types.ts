import { AccountType } from 'entitiesState/Account';

export type SetPaymentAddressVerifProps ={
  account: AccountType,
  errorCode: number,
  resendCode: ()=>void,
  counter: number
  verificateCode: (values: { verifCode: string, gaCode: string })=>void
  resetTimer: ()=>void
  setErrorCode: (value: 0)=> void
}
