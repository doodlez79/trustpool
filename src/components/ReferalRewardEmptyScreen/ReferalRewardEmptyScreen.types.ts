import { SelectorListProps } from 'components/SelectorList/SelectorList.types';
import { COIN_TYPE } from 'entitiesState/currency';

export interface ReferalRewardEmptyScreenProps extends SelectorListProps{
  coin?: COIN_TYPE
}
