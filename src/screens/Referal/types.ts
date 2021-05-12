import { StackScreenProps } from '@react-navigation/stack';
import { MainStackParamList } from 'navigation/Navigation.types';

export interface ReferalsProps extends StackScreenProps<MainStackParamList, 'Referals'>{}

export enum TYPE_REFERALS_CONTENT {
  REFERALS_LIST = 'REFERALS_LIST',
  REWARD_LIST = 'REWARD_LIST'
}
