import { StackScreenProps } from '@react-navigation/stack';
import { MainStackParamList } from 'navigation/Navigation.types';

export interface PaymentProps extends StackScreenProps<MainStackParamList, 'Payment'>{}
export enum TYPE_PAYMENT_CONTENT {
  PAYMENT = 'PATMENT',
  EARNING = 'EARNING'
}
