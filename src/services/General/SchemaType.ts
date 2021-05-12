import { JSONSchemaType } from 'ajv/lib/types/json-schema';
import { GeneralStateType } from 'entitiesState/general';

export const schemaGeneralInfoResponse: JSONSchemaType<GeneralStateType> = {
  type: 'object',
  properties: {
    accountInfo: {
      type: 'object',
      properties: {
        accountBalance: { type: 'string' },
        hashrate: {
          type: 'object',
          properties: {
            '10min': { type: 'number' },
            '1day': { type: 'number' },
            '1hour': { type: 'number' },
          },
          additionalProperties: false,
          required: [ '10min' ],
        },
        hashUnit: { type: 'string' },
        profit: {
          type: 'object',
          properties: {
            '24hour': { type: 'string' },
            type: { type: 'string' },
            total: { type: 'string' },
          },
          required: [ 'total' ],

        },
        paymentTotal: { type: 'string' },
        ppsPlusRate: { type: 'string' },
      },
    },
    stratum: {
      type: 'object',
      properties: {
        url: { type: 'string' },
        urls: {
          type: 'array',
          items: { type: 'string' },
        },
        backupPorts: {
          type: 'array',
          items: {
            type: 'number',
          },
        },
        quickSwitchUrl: { type: 'string' },
        backupQuickSwitchPorts: {
          type: 'array',
          items: {
            type: 'number',
          },
        },
      },
    },
    workers: {
      type: 'object',
      properties: {
        totalActive: { type: 'number' },
        totalUnactive: { type: 'number' },
      },
    },
  },
};

export const schemaGeneralChartInfoResponse: JSONSchemaType<GeneralStateType['accountInfo']['chart']> = {
  type: 'object',
  properties: {
    rejectRate: {
      type: 'array',
      items: { type: 'number' },
    },
    workers: {
      type: 'array',
      items: { type: 'number' },
    },
    hashrate: {
      type: 'array',
      items: { type: 'number' },
    },
    unit: {
      type: 'string',
    },
    start: {
      type: 'array',
      items: { type: 'number' },
    },
  },
};
