import { JSONSchemaType } from 'ajv';
import { WorkerItem, WorkersGroupState } from 'entitiesState/workers';
import { PageInfo } from 'types/pageInfo';
import { ChartType } from 'types/chart';

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
export const schemaGetWorkerInfoResponse: JSONSchemaType<ChartType> = {
  type: 'object',
  properties: {
    hashrate: { type: 'array', items: { type: 'number' } },
    rejectRate: { type: 'array', items: { type: 'number' } },
    time: { type: 'array', items: { type: 'number' } },
    unit: { type: 'string' },
  },
  additionalProperties: false,
};

export const schemaGetWorkersResponse: JSONSchemaType<WorkerItem[]> = {
  type: 'array',
  items: {
    type: 'object',
    properties: {
      coin: { type: 'string' },
      groupId: { type: 'number' },
      hashrate: {
        type: 'object',
        properties: {
          '10min': { type: 'number' },
          '1day': { type: 'number' },
          '1hour': { type: 'number' },
        },

      },
      id: { type: 'number' },
      lastActive: {
        type: 'object',
        format: 'custom-date-time',
        additionalProperties: false,
      },
      recentHashrate: { type: 'number' },
      rejectRate: { type: 'number' },
      status: { enum: [ 'active', 'unactive' ] },
      user: { type: 'string' },
    },
  },
  additionalProperties: false,
};

export const schemaGetWorkersGroupResponse: JSONSchemaType<WorkersGroupState[]> = {
  type: 'array',
  items: {
    type: 'object',
    properties: {
      total: { type: 'number' },
      groupId: { type: 'number' },
      groupName: { type: 'string' },
      active: { type: 'number' },
      unactive: { type: 'number' },
    },
  },
  additionalProperties: false,
};
