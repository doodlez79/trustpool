import { CURRENCY_TYPE } from 'src/entitiesState/currency';

export type CurrencyModalProps = {
  loading?: boolean
  currencyList: string[]
  currentCurrency: string
  onSelectCurrency: (val: CURRENCY_TYPE) => void
}
