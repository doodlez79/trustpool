import { fromUnixTime, getUnixTime } from 'date-fns';
import { periodByTime } from 'services/General/SchemaMapper';
import { TIME_CHART_TYPES } from 'entitiesState/general';

export const mapperSchemaWorkerItem = {
  coin: 'coin',
  group_id: 'groupId',
  hashrate_10min: {
    key: 'hashrate.10min',
    transform: (value: string) => (value ? parseInt(value, 10) : null),
  },
  hashrate_1hour: {
    key: 'hashrate.1day',
    transform: (value: string) => (value ? parseInt(value, 10) : null),
  },
  hashrate_1day: {
    key: 'hashrate.1hour',
    transform: (value: string) => (value ? parseInt(value, 10) : null),
  },
  id: 'id',
  last_active: {
    key: 'lastActive',
    transform: (value: number) => (value ? fromUnixTime(value) : null),

  },
  name: 'name',
  recent_hashrate: {
    key: 'recentHashrate',
    transform: (value: string) => (value ? parseInt(value, 10) : null),
  },

  reject_rate: {
    key: 'rejectRate',
    transform: (value: string) => (value ? parseFloat(value) : null),
  },
  status: 'status',
  user: 'user',
};

export const mapperSchemaWorkerInfo = (currentTime: TIME_CHART_TYPES, length: number) => ({
  hashrate: 'hashrate',
  start: {
    key: 'time',
    // eslint-disable-next-line max-len
    transform: (time: number) => Array(length).fill(0).map((value, index) => getUnixTime(periodByTime[currentTime](time, index))),
  },
  reject_rate: 'rejectRate',
  unit: 'unit',
});

export const mapperSchemaPageInfo = {
  count: 'count',
  curr_page: 'currPage',
  has_next: 'hasNext',
  total: 'total',
  total_page: 'totalPage',
};

export const mapperSchemaWorkersGroup = {
  total: 'total',
  unactive: 'unactive',
  group_name: 'groupName',
  group_id: 'groupId',
  active: 'active',
};
