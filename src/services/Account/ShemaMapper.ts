export const mapperSchemaGetAccountToState = {
  id: 'id',
  account: 'account',
  country_code: 'countryCode',
  email: 'email',
  email_masked: 'emailMasked',
  email_verified: 'emailVerified',
  has_totp_auth: 'hasTotpAuth',
  mobile: 'mobile',
  mobile_masked: 'mobileMasked',
  lang: 'lang',
  token: 'token',
  has_payment_password: 'hasPaymentPassword',
  is_signin_verify: 'isSigninVerify',
  is_payment_verify: 'isPaymentVerify',
  is_totp_verify: 'isTotpVerify',
  account_type: 'accountType',
  role: 'role',
  access_key: 'accessKey',
};

export const mapperSchemaGetSubAccountsToState = {
  id: 'id',
  account: 'account',
  account_type: 'accountType',
  BCH: 'BCH',
  BTC: 'BTC',
  DASH: 'DASH',
  ETC: 'ETC',
  ETH: 'ETH',
  LTC: 'LTC',
  XMR: 'XMR',
  ZEC: 'ZEC',
  visible: 'visible',
};

export const mapperSchemaGetUserInfo = {
  id: 'id',
  account: 'account',
  account_type: 'accountType',
  lang: 'lang',
};

export const mapperSchemaPutChangeSubAccont = {
  id: 'id',
  account: 'account',
  account_type: 'accountType',
  visible: 'visible',
  token: 'token',
};
