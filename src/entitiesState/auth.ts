export type GeeTestTypes = {
  challenge: string
  gt: string
  isOn: boolean
  newCaptcha: boolean
  offline: boolean

}

export type CaptchaTypes = {
  seccode: string
  validate: string
  challenge: string
}

// AUTH STORE
export type AuthTypesState = {
  loading: boolean
  isAuthorized: boolean
  token: Nullable<string>
}
