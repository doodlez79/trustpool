import { SubAccountsType } from 'entitiesState/account';
import React from 'react';

export type SubAccountsModalContentProps = {
  currentNameId: number
  accounts: SubAccountsType[]
  onSelectSubAccounts: (id: number) => void
  addSubAccounts: (name: string, cb: () => void) => void
  loading: boolean
  errorSubAccountForm: number
  setErrorSubAccount: (code: number) => void
}

export type DataType = {
  id: number,
  component: React.ReactNode
}
