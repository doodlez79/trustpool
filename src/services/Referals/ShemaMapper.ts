import { fromUnixTime } from 'date-fns';

export const mapperSchemaReferalsList = {
  account: 'account',
  hashrate_1day: {
    key: 'hashrate1day',
    transform: (value: string) => (value ? parseFloat(value) : null),
  },
  profit_rate: 'profitRate',
};

export const mapperSchemaPageInfo = {
  count: 'count',
  curr_page: 'currPage',
  has_next: 'hasNext',
  total: 'total',
  total_page: 'totalPage',
};

export const mapperSchemaReferalsProfit = {
  coin: 'coin',
  time: {
    key: 'time',
    transform: (value: number) => (value ? fromUnixTime(value) : null),
  },
  hashrate: {
    key: 'hashrate',
    transform: (value: string) => (value ? parseFloat(value) : null),
  },
  profit: 'profit',

};
