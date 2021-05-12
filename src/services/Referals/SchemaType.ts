import { JSONSchemaType } from 'ajv/lib/types/json-schema';
import { ReferalListType, ReferalsProfitType } from 'src/entitiesState/referal';
import { PageInfo } from 'src/types/pageInfo';

export const schemaGetReferalsListResponse: JSONSchemaType<ReferalListType[]> = {
  type: 'array',
  items: {
    type: 'object',
    properties: {
      account: { type: 'string' },
      hashrate1day: { type: 'number' },
      profitRate: { type: 'string' },
    },
  },
  additionalProperties: false,
};

export const schemaGetReferalsProfitResponse: JSONSchemaType<ReferalsProfitType[]> = {
  type: 'array',
  items: {
    type: 'object',
    properties: {
      time: {
        type: 'object',
        format: 'custom-date-time',
        additionalProperties: false,
      },
      coin: { type: 'string' },
      hashrate: { type: 'number' },
      profit: { type: 'string' },
    },
  },
  additionalProperties: false,
};

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
};
