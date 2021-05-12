import Btc from 'Icons/Valute/Btc.svg';
import Bch from 'Icons/Valute/Bch.svg';
import Bsv from 'Icons/Valute/Bsv.svg';
import Ltc from 'Icons/Valute/Ltc.svg';
import Zec from 'Icons/Valute/Zec.svg';
import Dash from 'Icons/Valute/Dash.svg';
import Rvn from 'Icons/Valute/Rvn.svg';
import Doge from 'Icons/Valute/Doge.svg';

import Rub from 'Icons/rub.svg';
import Usd from 'Icons/usd.svg';
import Eur from 'Icons/eur.svg';
import Cny from 'Icons/yen.svg';
import React from 'react';
import { COIN_TYPE, CURRENCY_TYPE } from 'entitiesState/currency';

export const iconsByCoin: {[x in COIN_TYPE]: React.ReactNode} = {
  [COIN_TYPE.BTC]: <Btc />,
  [COIN_TYPE.BCH]: <Bch />,
  [COIN_TYPE.BSV]: <Bsv />,
  [COIN_TYPE.LTC]: <Ltc />,
  [COIN_TYPE.ZEC]: <Zec />,
  [COIN_TYPE.DASH]: <Dash />,
  [COIN_TYPE.RVN]: <Rvn />,
  [COIN_TYPE.DOGE]: <Doge />,
};

export const iconsByCurrency: {[y in CURRENCY_TYPE]: React.ReactNode} = {
  [CURRENCY_TYPE.RUB]: <Rub />,
  [CURRENCY_TYPE.USD]: <Usd />,
  [CURRENCY_TYPE.EUR]: <Eur />,
  [CURRENCY_TYPE.CNY]: <Cny />,
};
