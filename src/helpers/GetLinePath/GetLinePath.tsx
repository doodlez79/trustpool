import { scaleLinear } from 'd3-scale';
import * as shape from 'd3-shape';

const getDomain = (domain: number[]) => [
  Math.min(...domain),
  Math.max(...domain),
];

interface DataPoint {
  date: number;
  value: number;
}
export const GetLinePath = (data: DataPoint[], widthChart: number, heightChart: number, padding: number) => {
  const scaleX = scaleLinear()
    .domain(getDomain(data.map(d => d.date)))
    .range([ 0, widthChart ]);
  const scaleY = scaleLinear()
    .domain(getDomain(data.map(d => d.value)))
    .range([ heightChart, padding ]);
  const line = shape
    .line<DataPoint>()
    .x((p: { date: number; }) => scaleX(p.date))
    .y((p: { value: number; }) => scaleY(p.value))
    .curve(shape.curveLinear)(data) as string;

  return {
    scaleX,
    scaleY,
    line,
  };
};
