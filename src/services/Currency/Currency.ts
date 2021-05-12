import mapper from 'helpers/Mapper';

import { ERROR_ACTIONS } from 'types/ActionTypes';
import validationResponseFromApi from 'helpers/ValidationResponseFromApi';

import { AllCoinsType, COIN_TYPE, CurrencyType } from 'entitiesState/currency';
import { APIService } from '../API';
import { mapperSchemaGetCurrencysInfo, mapperSchemaGetCurrentValute } from './SchemaMapper';
import { schemaCurrencyInfoResponse, schemaGetCurrentValute, TestCoinValid } from './SchemaType';

export default class CurrencyServices {
  constructor(private readonly apiService: APIService) {}

  getCurrencysInfo() {
    return this.apiService.get('/pool/state/new').then(response => {
      const mappedData = response.map((item: object) => mapper<CurrencyType>(item, mapperSchemaGetCurrencysInfo));

      const validator = validationResponseFromApi<CurrencyType[]>(schemaCurrencyInfoResponse);
      const isValid = validator(mappedData);

      const coinsData = mappedData.map((item:AllCoinsType) => (item.coin));
      const enumArrayOurCoins = Object.entries(COIN_TYPE).map(([ i ]) => (i));
      const intersectionCoins = coinsData.filter((x: string) => enumArrayOurCoins.includes(x));

      if (!isValid) {
        const error = {
          ...validator.errors,
          type: ERROR_ACTIONS.VALIDATION,
        };

        throw error;
      }

      return { allValuts: mappedData, allCoins: intersectionCoins };
    }).catch(e => {
      throw e;
    });
  }

  getCurrentValute() {
    return this.apiService.get('/setting/coin/pool').then(res => {
      const newData = mapper<COIN_TYPE>(res, mapperSchemaGetCurrentValute);
      const validate = validationResponseFromApi<TestCoinValid>(schemaGetCurrentValute);
      const valid = validate(newData);
      if (!valid) {
        const error = { ...validate.errors, type: ERROR_ACTIONS.VALIDATION };
        throw (error);
      }
      return newData;
    }).catch(e => {
      throw e;
    });
  }

  postChangeValute(coin: COIN_TYPE) {
    return this.apiService.post('/setting/coin/pool', { coin }).then(res => res).catch(e => {
      throw e;
    });
  }
}
