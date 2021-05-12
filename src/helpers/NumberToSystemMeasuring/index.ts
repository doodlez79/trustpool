const translateTypeSystem = [
  '', 'K', 'M', 'G', 'T', 'P',
];

export const NumberToSystemMeasuring = (value:number = 0, fix: number) => {
  let counter = 0;

  let tempValue = value;

  while (tempValue > 1000) {
    counter += 1;
    tempValue /= 1000;
  }

  return { newValue: parseFloat(tempValue.toFixed(fix)), prefix: translateTypeSystem[counter] };
};
