import { COIN_TYPE } from 'entitiesState/currency';
import { EarningsSummaryDataItemType } from 'entitiesState/payment';

export type EarningContentItemProps = {
  item: EarningsSummaryDataItemType
  coin: COIN_TYPE
  isDoge? :boolean
}
