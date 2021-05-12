import { fromUnixTime } from 'date-fns';

export const mapperSchemaGetCurrencysInfo = {
  network_hashrate_1days: {
    key: 'hashrate.1day',
    transform: (value: string) => (value ? parseInt(value, 10) : null),
  },
  network_hashrate_3days: {
    key: 'hashrate.3days',
    transform: (value: string) => (value ? parseInt(value, 10) : null),
  },
  network_hashrate_7days: {
    key: 'hashrate.7days',
    transform: (value: string) => (value ? parseInt(value, 10) : null),
  },
  network_hashrate: {
    key: 'hashrate.default',
    transform: (value: string) => (value ? parseInt(value, 10) : null),
  },
  next_period_diff: {
    key: 'nextPeriodDiff',
    transform: (value: string) => (value ? parseInt(value, 10) : null),
  },
  curr_diff: {
    key: 'currDiff',
    transform: (value: string) => (value ? parseInt(value, 10) : null),
  },
  block_reward: 'blockReward',
  block_time: 'blockTime',
  coin: 'coin',
  coin_price: 'coinPrice',
  curr_connections: 'currConnections',
  curr_period_rest_time: 'currPeriodRestRime',
  hash_unit: 'hashUnit',
  min_payment_amount: 'minPaymentAmount',
  mining_algorithm: 'miningAlgorithm',
  next_period_diff_float_rate: 'nextPeriodDiffFloat',
  payment_end_time: 'paymentEndTime',
  payment_start_time: 'paymentStartTime',
  pre_period_diff: 'prePeriodDiff',
  pre_period_diff_float_rate: 'prePeriodDiffFloat',
  pre_period_rest_time: {
    key: 'prePeriodRestTime',
    transform: (value: number) => (value ? fromUnixTime(value) : null),
  },
  pricing_currency: 'pricingCurrency',
  pricing_currency_symbol: 'pricingCurrencySymbol',
  reward_coins: 'rewardCoins',
  unit_output: 'unitOutput',
  unit_output_currency: 'unitOutputCurrency',

};

export const mapperSchemaGetCurrentValute = {
  coin: 'coin',
};
