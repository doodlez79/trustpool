import { COIN_TYPE } from 'entitiesState/currency';

export type HeaderDrawerContentProps = {
  onClose: () => void,
  openUserModal: () => void,
  openCoinModal: () => void,
  activeAccountModal: boolean
  activeCoinModal: boolean
  userName: string
  coin: COIN_TYPE

}
