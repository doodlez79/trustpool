import { AppTypes } from 'ducks/App/App.types';

import { AuthTypesState } from 'entitiesState/auth';
import { UserTypesState } from 'entitiesState/user';
import { SettingState } from 'entitiesState/settings';
import { AccountTypesState } from 'entitiesState/account';
import { WorkersStateType } from 'entitiesState/workers';
import { PaymentStateType } from 'entitiesState/payment';
import { ReferalsTypesState } from 'entitiesState/referal';
import { GeneralStateType } from 'entitiesState/general';
import { CurrencyTypeToState } from 'entitiesState/currency';

export interface StoreTypes {
  app: AppTypes;
  auth: AuthTypesState;
  user: UserTypesState;
  account: AccountTypesState;
  setting: SettingState;
  workers: WorkersStateType;
  payment: PaymentStateType;
  referals: ReferalsTypesState
  general: GeneralStateType
  currency: CurrencyTypeToState
}
