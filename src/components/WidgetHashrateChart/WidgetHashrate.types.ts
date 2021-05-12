import { ChartType } from 'types/chart';
import { TIME_CHART_TYPES } from 'entitiesState/general';

export type WidgetHashrateChartProps = {
  data: {
    [TIME_CHART_TYPES.HOUR]:Omit<ChartType, 'time'>& {start: number[]},
    [TIME_CHART_TYPES.DAY]:Omit<ChartType, 'time'>& {start: number[]},
    [TIME_CHART_TYPES.MIN]:Omit<ChartType, 'time'>& {start: number[]},
  }
  setTimeChartRequest: (value:TIME_CHART_TYPES)=>void
  hashAvg?: number
  hashPrefix?: string
  changeChartInfo: (time: TIME_CHART_TYPES) => void
  currentTime: TIME_CHART_TYPES
  loading: boolean

  titleAlign?: 'center' | 'left'
  heightChart?:number
}

export const dataCharts = {
  hashrate: [
    999, 3, 999, 5, 666, 513, 999, 88, 2, 3, 6, 7, 8, 8, 9, 222, 1, 33,
  ],
  rejectRate: [
    10, 11, 22, 13, 42, 34, 0.12, 0.13, 0.13, 0.20, 0.2, 0.11, 0.99, 0.41, 0.33,
  ],
  unit: 'T',
  // "start": 1614775800000,
};
