import { JSONSchemaType } from 'ajv';
import {
  LANG_TYPE, SendAddressRequestType, SettingsInfo, VerifyCodeEmailRequestType, WalletBalanceType,
} from 'entitiesState/settings';

export const schemaLang: JSONSchemaType<{ lang: LANG_TYPE }> = {
  type: 'object',
  properties: {
    lang: { enum: [ 'ru_RU', 'en_US' ] },
  },
  required: [ 'lang' ],
  additionalProperties: false,
};

export const schemaVerifyPassword: JSONSchemaType<{ token: string }> = {
  type: 'object',
  properties: {
    token: { type: 'string' },
  },
  required: [ 'token' ],
  additionalProperties: false,
};

export const schemaVerifyCodeEmail: JSONSchemaType<VerifyCodeEmailRequestType> = {
  type: 'object',
  properties: {
    email_captcha: { type: 'string' },
    coin: { type: 'string' },
    verify_code: { type: 'string' },
    verify_type: { type: 'string' },
  },
  required: [ 'email_captcha', 'coin', 'verify_code' ],
  additionalProperties: false,
};

export const schemaSendAddressRequest: JSONSchemaType<SendAddressRequestType> = {
  type: 'object',
  properties: {
    token: { type: 'string' },
    coin: { type: 'string' },
    withdraw_address: { type: 'string' },
  },
  required: [ 'token', 'coin', 'withdraw_address' ],
  additionalProperties: false,
};

export const schemaWalletBalance: JSONSchemaType<WalletBalanceType[]> = {
  type: 'array',
  items: {
    type: 'object',
    properties: {
      coin: { type: 'string' },
      minMinimalPayment: { type: 'string' },
      minimalPayment: { type: 'string' },
      withdrawAddress: { type: 'string' },
      minimalPaymentChoices: {
        type: 'array',
        items: {
          type: 'object',
          properties: {
            label: { type: 'string' },
            value: { type: 'string' },
          },
        },
      },
    },
    required: [ 'minimalPayment', 'coin', 'minMinimalPayment' ],

  },
  additionalProperties: false,
};

export const schemaSettingValidation: JSONSchemaType<SettingsInfo[]> = {
  type: 'array',
  items: {
    type: 'object',
    properties: {
      coin: { type: 'string' },
      remindSettingList: {
        type: 'array',
        items: {
          type: 'object',
          properties: {
            value: { type: 'number' },
            title: { type: 'string' },
            unit: { type: 'string' },
            business: { type: 'string' },
            status: { type: 'boolean' },
          },
        },

      },
    },
  },
  additionalProperties: false,
};
