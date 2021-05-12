import { SubAccountsType } from 'entitiesState/account';

export type SubAccountsModalItemProps = {
  onSelect: (id: number) => void
  item: SubAccountsType
  active: boolean
}
