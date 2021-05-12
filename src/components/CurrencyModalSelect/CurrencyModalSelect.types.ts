import { CURRENCY_TYPE } from 'src/entitiesState/currency';

export type CurrencyModalSelectProps = {
  icon: React.ReactNode
  active: boolean
  item: CURRENCY_TYPE
  onSelect: (value: CURRENCY_TYPE) => void
}
