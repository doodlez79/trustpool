import { COIN_TYPE } from 'entitiesState/currency';

export type SettingState = {
  loading: boolean
  loadingChangeStatus: boolean
  theme: THEME_TYPE
  lang: LANG_TYPE
  secureStore: {
    isSecureCodeAuth: boolean
    visitSecureCodeScreen: boolean
    disableSecureCode: boolean
    resetCode: boolean
    typeEnter: string
    typeLogin: string[]
    currentTypeLogin: string
  }
  trottlingData: {
    easterEgg: boolean
  }
  tokenPasswordChange: string
  tokenAddressChange: string
  generalSettingsInfo: WalletBalanceType[]
  settingsInfo: SettingsInfo[]
}

export type SettingsInfo = {
  coin: COIN_TYPE,
  units: string[],
  remindSettingList: RemindSettingListType[]
}

export type UnitsTypeResponse = {
  [n in COIN_TYPE] : string[]
}

export type RemindSettingListType = {
  business: TITLE_SETTING_INFO,
  title: string,
  status: boolean
  unit: string
  value: number
}
export enum THEME_TYPE {
  DARK = 'DARK',
  LIGHT = 'LIGHT',
  AUTO = 'AUTO'
}

export enum LANG_TYPE {
  RU = 'ru_RU',
  EN = 'en_US',
}

export enum TITLE_SETTING_INFO {
  LOW_HASH_REMIND = 'low_hash_remind',
  HASHRATE_FLOAT = 'hashrate_float',
  LOW_WORKERNUM_REMIND = 'low_workernum_remind',
}

export enum TITLE_SETTING_INFO_NORMAL {
  THRESHOLDS = 'Thresholds',
  FLUCTUATION = 'Fluctuation',
  ACTIVE_WORKERS= 'Active workers',
}
export type VerifyCodeEmailRequestType = {
  coin: string,
  ['email_captcha']: string,
  ['verify_code']: string
  ['verify_type']: string
}

export type SendAddressRequestType = {
  coin: string,
  token: string,
  ['withdraw_address']: string
}

export type WalletBalanceType = {
  minMinimalPayment: string,
  coin: string,
  minimalPayment: string,
  minimalPaymentChoices?: {value: string, label: string}[]
  withdrawAddress?: string
  accountBalance: string

}
