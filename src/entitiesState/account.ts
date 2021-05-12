export interface AccountType {
  id: number,
  account: string,
  countryCode: string,
  email: string,
  emailMasked: string,
  emailVerified: boolean,
  hasTotpAuth: boolean,
  mobile: string,
  mobileMasked: string,
  lang: string,
  hasPaymentPassword: boolean,
  isSigninVerify: boolean,
  isPaymentVerify: boolean,
  isTotpVerify: boolean,
  accountType: ACCOUNT_TYPE,
  role: string,
  accessKey: string,
  token: string,
  notificationToken: string
}

export enum ACCOUNT_TYPE{
  main = 'main',
  sub = 'sub',
  delegate = 'delegate'
}

export interface SubAccountsType {
  BCH: string,
  BTC: string,
  DASH: string,
  ETC: string,
  ETH: string,
  LTC: string,
  XMR: string,
  ZEC: string,
  account: string,
  id: number,
  accountType: ACCOUNT_TYPE,
  visible: boolean
}

export interface CurrentAccount{
  accountType: ACCOUNT_TYPE,
  account: string,
  id: number,
  token?: string,
  visible?: boolean
}

export interface UserInfo {
  id: number,
  account: string,
  accountType: ACCOUNT_TYPE,
  lang: string
}

export interface AccountTypesState {
  loading: boolean
  accountInfo: AccountType
  subAccounts: SubAccountsType[]
  currentAccount: CurrentAccount
  info: UserInfo
}
