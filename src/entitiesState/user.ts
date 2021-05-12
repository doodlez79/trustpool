import { ACCOUNT_TYPE } from './Account';

export type UserTypesToState = {
  account: string
  accountType: ACCOUNT_TYPE
  countryCode: string
  email: string
  emailMasked: string
  emailVerified: boolean
  hasPaymentPassword: boolean
  hasTotpAuth: boolean
  id: number
  isPaymentVerify: boolean
  isSigninVerify: boolean
  isTotpVerify: boolean
  lang: string
  mobile: string
  mobileMasked: string
}

export type UserTypesState = {
  loading: boolean
  dataInfo: UserTypesToState | null
}
