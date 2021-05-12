import { TIME_CHART_TYPES } from 'entitiesState/general';

export const shiftOfHashrate = (data: number[], rateOfShift:number) => (Math.max(...data)) * rateOfShift;

export const dataMaxHashrate = (data: number[], shift:number) => (Math.max(...data) + shift);
// eslint-disable-next-line max-len
export const scaleRejectRateChart = (dataHash: number[], dataReject: number[]) => dataReject.map(e => ((e * (Math.max(...dataHash))) / 100));

export const TimeChartTranslate = {
  [TIME_CHART_TYPES.MIN]: '10-min',
  [TIME_CHART_TYPES.HOUR]: '1-hour',
  [TIME_CHART_TYPES.DAY]: '1-day',
};
