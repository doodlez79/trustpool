export type CalculationCardProps = {
  calculateValue: string
  setCalculateValue: (value: string) => void
  setCurrentPeriod: (time: string) => void
  currentCoinCalculation: string
  currentPeriod: string
  pricingCurrency: string
  resultCalculations: {
    result: number | string
    money: number | string
  }
  hashUnit: string
}
