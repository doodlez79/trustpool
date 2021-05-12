import { JSONSchemaType } from 'ajv/lib/types/json-schema';
import {
  EarningsSummaryDataItemType, PaymentDataItemType,
} from 'src/entitiesState/payment';
import { PageInfo } from 'types/pageInfo';

export const schemaPageInfoResponse: JSONSchemaType<PageInfo> = {
  type: 'object',
  properties: {
    count: { type: 'number' },
    currPage: { type: 'number' },
    hasNext: { type: 'boolean' },
    total: { type: 'number' },
    totalPage: { type: 'number' },
  },
  additionalProperties: false,
  required: [ 'count' ],
};

export const schemaGetPaymentInfoResponse: JSONSchemaType<PaymentDataItemType[]> = {
  type: 'array',
  items: {
    type: 'object',
    properties: {
      address: { type: 'string' },
      addressUrl: { type: 'string' },
      amount: { type: 'string' },
      coin: { type: 'string' },
      status: { type: 'string' },
      time: {
        type: 'object',
        format: 'custom-date-time',
        additionalProperties: false,
      },
      txUrl: { type: 'string' },
      txId: { type: 'string' },
    },
  },
  additionalProperties: false,
};

export const schemaGetEarningSummaryInfoResponse: JSONSchemaType<EarningsSummaryDataItemType[]> = {
  type: 'array',
  items: {
    type: 'object',
    properties: {
      coin: { type: 'string' },
      hashrate: { type: 'number' },
      id: { type: 'number' },
      totalProfit: { type: 'string' },
      pplnsProfit: { type: 'string' },
      ppsPlusRate: { type: 'string' },
      ppsProfit: { type: 'string' },
      soloProfit: { type: 'string' },
      date: { type: 'string' },
      unitOutput: { type: 'string' },

    },
  },
  additionalProperties: false,
};
