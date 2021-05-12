import {
  addDays, addHours, addMinutes, getUnixTime,
} from 'date-fns';
import { TIME_CHART_TYPES } from 'entitiesState/general';

export const mapperSchemaGetGeneralInfo = {
  hashrate_10min: {
    key: 'accountInfo.hashrate.10min',
    transform: (value: string) => (value ? parseInt(value, 10) : null),
  },
  hashrate_1hour: {
    key: 'accountInfo.hashrate.1day',
    transform: (value: string) => (value ? parseInt(value, 10) : null),
  },
  hashrate_1day: {
    key: 'accountInfo.hashrate.1hour',
    transform: (value: string) => (value ? parseInt(value, 10) : null),
  },
  stratum_url: 'stratum.url',
  stratum_urls: 'stratum.urls',
  quick_switch_stratum_url: 'stratum.quickSwitchUrl',
  backup_stratum_ports: 'stratum.backupPorts',
  backup_quick_switch_stratum_ports: 'stratum.backupQuickSwitchPorts',
  total_active: 'workers.totalActive',
  total_unactive: 'workers.totalUnactive',
  target_24hour: 'stratum.target24Hour',
  account_balance: 'accountInfo.accountBalance',
  hash_unit: 'accountInfo.hashUnit',
  payment_total: 'accountInfo.paymentTotal',
  pps_plus_rate: 'accountInfo.ppsPlusRate',
  profit_24hour: 'accountInfo.profit.24hour',
  profit_total: 'accountInfo.profit.total',
  profit_type: 'accountInfo.profit.type',
};

export const periodByTime = {
  [TIME_CHART_TYPES.HOUR]: (time: number, index: number) => addHours(time, index),
  [TIME_CHART_TYPES.DAY]: (time: number, index: number) => addDays(time, index),
  [TIME_CHART_TYPES.MIN]: (time: number, index: number) => addMinutes(time, index * 10),
};

export const mapperSchemaGetGeneralChartInfo = (length = 0, currentTime: TIME_CHART_TYPES) => ({
  hashrate: 'hashrate',
  reject_rate: 'rejectRate',
  active_workers: 'workers',
  start: {
    key: 'time',
    // eslint-disable-next-line max-len
    transform: (time: number) => Array(length).fill(0).map((value, index) => getUnixTime(periodByTime[currentTime](time, index))),
  },
  unit: 'unit',
});
