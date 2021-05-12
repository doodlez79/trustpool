import { COIN_TYPE } from 'entitiesState/currency';
import { WalletBalanceType } from 'entitiesState/settings';

export const findWalletInfoByCurrentCoin = (array: WalletBalanceType[], coinPoint : COIN_TYPE) => {
  const emptyState = {
    coinPoint,
    withdrawAddress: '',
    minimalPayment: '',
    minimalPaymentChoices: [{ value: '', label: '' }],
    minMinimalPayment: '',
    accountBalance: '',
  };

  if (array.find(el => el.coin === coinPoint)) {
    return array.find(el => el.coin === coinPoint);
  }
  return emptyState;
};
