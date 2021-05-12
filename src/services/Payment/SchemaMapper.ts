import { fromUnixTime } from 'date-fns';

export const mapperSchemaPaymentDataItem = {
  address: 'address',
  address_url: 'adressUrl',
  amount: 'amount',
  coin: 'coin',
  status: 'status',
  time: {
    key: 'time',
    transform: (value: number) => (value ? fromUnixTime(value) : null),
  },
  tx_url: 'txUrl',
  txid: 'txId',
};

export const mapperSchemaPageInfo = {
  count: 'count',
  curr_page: 'currPage',
  has_next: 'hasNext',
  total: 'total',
  total_page: 'totalPage',
};

export const mapperSchemaEarningSummaryDataItem = {
  coin: 'coin',
  date: 'date',
  hashrate: {
    key: 'hashrate',
    transform: (value: string) => (value ? parseInt(value, 10) : null),
  },
  id: 'id',
  pplns_profit: 'pplnsProfit',
  pps_plus_rate: 'ppsPlusRate',
  pps_profit: 'ppsProfit',
  solo_profit: 'soloProfit',
  total_profit: 'totalProfit',
  unit_output: 'unitOutput',

};
