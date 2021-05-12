import { COIN_TYPE } from 'entitiesState/currency';
import { PaymentDataItemType } from 'entitiesState/payment';

export type PaymentContentItemProps = {
  item: PaymentDataItemType
  coin: COIN_TYPE
  onPress: () => void
  isDoge? : boolean
}
