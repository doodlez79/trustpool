import { JSONSchemaType } from 'ajv';
import { GeeTestTypes } from 'entitiesState/auth';
import { UserTypesToState } from 'entitiesState/user';

export const schemaGeeTestResponse: JSONSchemaType<GeeTestTypes> = {
  type: 'object',
  properties: {
    challenge: { type: 'string' },
    gt: { type: 'string' },
    isOn: { type: 'boolean' },
    newCaptcha: { type: 'boolean' },
    offline: { type: 'boolean' },
  },
  required: [ 'challenge' ],
  additionalProperties: false,
};

export const schemaSingInResponse: JSONSchemaType<UserTypesToState & {token: string}> = {
  type: 'object',
  properties: {
    account: { type: 'string' },
    accountType: { type: 'string' },
    countryCode: { type: 'string' },
    email: { type: 'string' },
    emailMasked: { type: 'string' },
    hasPaymentPassword: { type: 'boolean' },
    emailVerified: { type: 'boolean' },
    id: { type: 'number' },
    hasTotpAuth: { type: 'boolean' },
    isSigninVerify: { type: 'boolean' },
    isPaymentVerify: { type: 'boolean' },
    isTotpVerify: { type: 'boolean' },
    lang: { type: 'string' },
    mobile: { type: 'string' },
    mobileMasked: { type: 'string' },
    token: { type: 'string' },
  },
  required: [ 'token' ],
  additionalProperties: false,
};
