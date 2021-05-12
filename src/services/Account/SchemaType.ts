import { JSONSchemaType } from 'ajv';
import {
  ACCOUNT_TYPE, AccountType, SubAccountsType, UserInfo, CurrentAccount,
} from 'entitiesState/account';

export const schemaAccountResponse: JSONSchemaType<Omit<AccountType, 'notificationToken'>> = {
  type: 'object',
  properties: {
    id: { type: 'number' },
    account: { type: 'string' },
    countryCode: { type: 'string' },
    email: { type: 'string' },
    emailMasked: { type: 'string' },
    emailVerified: { type: 'boolean' },
    hasTotpAuth: { type: 'boolean' },
    mobile: { type: 'string' },
    mobileMasked: { type: 'string' },
    lang: { type: 'string' },
    hasPaymentPassword: { type: 'boolean' },
    isSigninVerify: { type: 'boolean' },
    isTotpVerify: { type: 'boolean' },
    isPaymentVerify: { type: 'boolean' },
    accountType: { type: 'string', enum: [ ACCOUNT_TYPE.main, ACCOUNT_TYPE.sub, ACCOUNT_TYPE.delegate ] },
    role: { type: 'string' },
    accessKey: { type: 'string' },
    token: { type: 'string' },
  },
  required: [ 'id' ],
  additionalProperties: true,
};

export const schemaSubAccountsResponse: JSONSchemaType<SubAccountsType[]> = {
  type: 'array',
  items: {
    type: 'object',
    properties: {
      id: { type: 'number' },
      account: { type: 'string' },
      accountType: { type: 'string', enum: [ ACCOUNT_TYPE.main, ACCOUNT_TYPE.sub, ACCOUNT_TYPE.delegate ] },
      BTC: { type: 'string' },
      BCH: { type: 'string' },
      ETH: { type: 'string' },
      ETC: { type: 'string' },
      ZEC: { type: 'string' },
      LTC: { type: 'string' },
      XMR: { type: 'string' },
      DASH: { type: 'string' },
      visible: { type: 'boolean' },
    },
    required: [ 'id' ],
  },
};

export const schemaUserInfoResponse: JSONSchemaType<UserInfo> = {
  type: 'object',
  properties: {
    id: { type: 'number' },
    account: { type: 'string' },
    accountType: { type: 'string', enum: [ ACCOUNT_TYPE.main, ACCOUNT_TYPE.sub, ACCOUNT_TYPE.delegate ] },
    lang: { type: 'string' },
  },
  required: [ 'id' ],
  additionalProperties: false,
};

export const schemaChangeSubAccountResponse: JSONSchemaType<CurrentAccount> = {
  type: 'object',
  properties: {
    id: { type: 'number' },
    account: { type: 'string' },
    accountType: { type: 'string', enum: [ ACCOUNT_TYPE.main, ACCOUNT_TYPE.sub, ACCOUNT_TYPE.delegate ] },
    visible: { type: 'boolean', nullable: true },
    token: { type: 'string', nullable: true },
  },
  required: [ 'id' ],

  additionalProperties: false,
};
