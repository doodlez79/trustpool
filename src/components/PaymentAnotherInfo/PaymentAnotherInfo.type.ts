import { EarningsSummaryDataItemType, PaymentDataItemType } from 'entitiesState/payment';
import { SelectorListProps } from 'components/SelectorList/SelectorList.types';
import { WORKERS_CONTENT_TYPE } from 'screens/Workers/Workers.types';
import { COIN_TYPE } from 'entitiesState/currency';

export interface PaymentAnotherInfoProps extends SelectorListProps{
  data?: PaymentDataItemType[] & EarningsSummaryDataItemType[]
  wallet?:boolean
  workers?:boolean
  status? : WORKERS_CONTENT_TYPE
  coin?: COIN_TYPE
  goTo?: () => void
}
