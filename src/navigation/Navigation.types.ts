import { PaymentDataItemType } from 'entitiesState/payment';
import { WorkerItem } from 'entitiesState/workers';
import { COIN_TYPE } from 'entitiesState/currency';
import { NavigationContainerRef } from '@react-navigation/native';

export type MainStackParamList = {
  Auth: undefined
  Home: undefined
  Main: undefined
  BottomNav: undefined,
  Settings: undefined
  MiningScreen: {
    leftTitle?: string
  }
  Workers: undefined
  Languages: undefined
  LanguagesSettings: {
    leftTitle?: string
  }
  OnBoarding: undefined
  Theme: undefined
  ThemeSetting: {
    leftTitle?: string
  }
  Notification: undefined
  NotificationSetting: {
    leftTitle?: string
  }
  ChangePassword: {
    leftTitle?: string
  }
  Calculation: undefined
  SecureStoreSettings: undefined
  AccessSecureCode: undefined
  SecureCodeScreen: {
    changeCode?: boolean
    checkBiometryAfterSet?: boolean
    disableRequestBiometric?: boolean
    disableSkip?: boolean
    onlyCode?: boolean
    createCodeFlag?: boolean
    nextPath?: string
    removeSecureCode?: boolean
  }
  Support: {
    leftTitle?: string
  }
  DetailWorker: {
    data: Omit<WorkerItem, 'lastActive'> & {lastActive: string}
  }
  SubAccountsList: undefined
  Payment: undefined
  PaymentDetails:{
    // eslint-disable-next-line max-len
    item : Omit<PaymentDataItemType, 'endTime' & 'startTime'> & {endTime: string, startTime: string}
  }
  Referals: {
    leftTitle?: string
  }
  ReferralList: undefined
  SetPaymentAdress:{
    coin: COIN_TYPE
  }
  StratumUrls: undefined
}
export interface NavigationAppProps {
  isAuth: boolean
  isSecureCodeScreen: boolean
  isFirstVisit: boolean
  refProps: React.RefObject<NavigationContainerRef>
}
export type NavigationConfigType = {
  id: number,
  name: string,
  component: React.ReactNode,
  header: boolean,
}
