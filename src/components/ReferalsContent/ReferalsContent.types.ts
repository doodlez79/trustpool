import { PageInfo } from 'types/pageInfo';
import { ReferalListType, ReferalsProfitType } from 'entitiesState/referal';
import { TYPE_REFERALS_CONTENT } from 'screens/Referal/types';
import { COIN_TYPE } from 'entitiesState/currency';

export type ReferalsContentProps = {
  data: ReferalsProfitType[] | ReferalListType[]
  type: TYPE_REFERALS_CONTENT
  loading: boolean
  meta?: PageInfo
  updateData: (countPage: number, replace: boolean) => void
  userId: number
  onClick?: () => void,
  coin?: COIN_TYPE
}
