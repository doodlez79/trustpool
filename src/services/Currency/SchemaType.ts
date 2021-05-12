import { JSONSchemaType } from 'ajv/lib/types/json-schema';

import { COIN_TYPE, CurrencyType } from 'entitiesState/currency';

export const schemaCurrencyInfoResponse: JSONSchemaType<CurrencyType[]> = {
  type: 'array',
  items: {
    type: 'object',
    properties: {
      prePeriodDiffFloat: { type: 'string' },
      prePeriodDiff: { type: 'string' },
      paymentStartTime: { type: 'string' },
      paymentEndTime: { type: 'string' },
      blockReward: { type: 'string' },
      blockTime: { type: 'number' },
      unitOutput: { type: 'string' },
      miningAlgorithm: { type: 'string' },
      prePeriodRestTime: {
        type: 'object',
        format: 'custom-date-time',
        additionalProperties: false,
      },
      pricingCurrency: { type: 'string' },
      pricingCurrencySymbol: { type: 'string' },
      coinPrice: { type: 'string' },
      currConnections: { type: 'number' },
      currPeriodRestRime: { type: 'number' },
      currDiff: { type: 'number' },
      coin: { type: 'string' },
      rewardCoins: {
        type: 'array',
        items: {
          type: 'object',
          properties: {
            giftCoin: { type: 'string' },
            reward: { type: 'string' },
          },
        },
      },
      minPaymentAmount: { type: 'string' },
      unitOutputCurrency: { type: 'string' },
      nextPeriodDiff: { type: 'number' },
      nextPeriodDiffFloat: { type: 'string' },
      hashrate: {
        type: 'object',
        properties: {
          '1day': { type: 'number' },
          '3days': { type: 'number' },
          '7days': { type: 'number' },
          default: { type: 'number' },
          pool: { type: 'number' },
        },
        additionalProperties: false,
        required: [ '1day' ],
      },
      hashUnit: { type: 'string' },

    },
  },
};

export type TestCoinValid = {
  coin : COIN_TYPE
}

export const schemaGetCurrentValute: JSONSchemaType<TestCoinValid> = {
  type: 'object',
  properties: {
    coin: { type: 'string' },
  },

  required: [ 'coin' ],

  additionalProperties: false,
};
