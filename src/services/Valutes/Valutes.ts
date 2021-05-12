import axios from 'axios';

import { CURRENCY_TYPE } from 'src/entitiesState/currency';

export default class CurrencysCourseServices {
  getCurrencysCourse(currency: CURRENCY_TYPE) {
    return axios.get(`https://functions.yandexcloud.net/d4evltgsl5rsnmgmdhba?base=USD&quote=${currency}`, {
      headers: {
        'Content-Type': 'application/json',
        'Accept-Language': 'en_US',
      },
    })
      .then(response => {
        const mappedData = response.data;
        return { data: mappedData };
      }).catch(e => {
        throw e;
      });
  }
}
