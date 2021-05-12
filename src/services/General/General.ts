import mapper from 'helpers/Mapper';

import { ERROR_ACTIONS } from 'types/ActionTypes';
import validationResponseFromApi from 'helpers/ValidationResponseFromApi';

import { GeneralStateType, TIME_CHART_TYPES } from 'entitiesState/general';
import { COIN_TYPE } from 'entitiesState/currency';
import { APIService } from '../API';
import { mapperSchemaGetGeneralInfo, mapperSchemaGetGeneralChartInfo } from './SchemaMapper';
import { schemaGeneralInfoResponse, schemaGeneralChartInfoResponse } from './SchemaType';

export default class GeneralServices {
  constructor(private readonly apiService: APIService) {}

  getGeneralInfo(coin: string) {
    return this.apiService.get(`/pool/${coin}/home`).then(response => {
      const mappedData = mapper<GeneralStateType>(response, mapperSchemaGetGeneralInfo);

      const validator = validationResponseFromApi<GeneralStateType>(schemaGeneralInfoResponse);
      const isValid = validator(mappedData);

      if (!isValid) {
        const error = {
          ...validator.errors,
          type: ERROR_ACTIONS.VALIDATION,
        };

        throw error;
      }

      return mappedData;
    }).catch(e => {
      throw e;
    });
  }

  getGeneralChartInfo(time: string, coin: COIN_TYPE) {
    return this.apiService.get(`/pool/${coin}/user/hashrate/${time}/chart`).then(response => {
      const { length } = response.hashrate;
      // eslint-disable-next-line max-len
      const mappedData = mapper<GeneralStateType['accountInfo']['chart']>(response, mapperSchemaGetGeneralChartInfo(length, time as TIME_CHART_TYPES));
      // eslint-disable-next-line max-len
      const validator = validationResponseFromApi<GeneralStateType['accountInfo']['chart']>(schemaGeneralChartInfoResponse);
      const isValid = validator(mappedData);

      if (!isValid) {
        const error = {
          ...validator.errors,
          type: ERROR_ACTIONS.VALIDATION,
        };

        throw error;
      }

      return mappedData;
    }).catch(e => {
      throw e;
    });
  }
}
