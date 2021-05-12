import React from 'react';

export type WidgetCalculatorProps = {
  onClick: ()=> void
  icon: React.ReactNode

  diffAmount: string
  diffType?: string
  nextDiff?: number
  coinPrice?: number
  coinPriceType?: string
  coinPriceCurrency?: string
}
