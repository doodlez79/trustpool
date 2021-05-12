import { CaptchaTypes, GeeTestTypes } from 'entitiesState/auth';

export type CaptchaProps = {
  config: GeeTestTypes & CaptchaConfigTypes
  onReady?:() => void
  onSuccess?:(captchaData: CaptchaTypes) => void
  onError?:() => void
}

export type RefTypesProps = {
  handler:() => Promise<CaptchaTypes> | null
  reset:() => true | null
}

export type CaptchaConfigTypes = {
  lang?: string, hideSuccess?: boolean, product?: string
}
