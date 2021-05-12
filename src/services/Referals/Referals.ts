import { ReferalListType, ReferalsProfitType } from 'entitiesState/referal';
import { COIN_TYPE } from 'entitiesState/currency';
import mapper from 'helpers/Mapper';
import validationResponseFromApi from 'helpers/ValidationResponseFromApi';
import { ERROR_ACTIONS } from 'types/ActionTypes';
import { PageInfo } from 'types/pageInfo';
import { APIService } from '../API';

import { mapperSchemaReferalsList, mapperSchemaPageInfo, mapperSchemaReferalsProfit } from './ShemaMapper';
import { schemaGetReferalsListResponse, schemaPageInfoResponse, schemaGetReferalsProfitResponse } from './SchemaType';

export default class ReferalsServices {
  constructor(private readonly apiService: APIService) {}

  getReferalsList(coin: COIN_TYPE) {
    return this.apiService.get(`/pool/refer/user?coin=${coin}&limit=20`).then(res => {
      // eslint-disable-next-line max-len
      const newData = res.map((item: object) => mapper<ReferalListType>(item, mapperSchemaReferalsList)) as ReferalListType[];
      const validateData = validationResponseFromApi<ReferalListType[]>(schemaGetReferalsListResponse);
      const validData = validateData(newData);
      if (!validData) {
        const error = { ...validateData.errors, type: ERROR_ACTIONS.VALIDATION };
        throw (error);
      }
      return newData;
    }).catch(e => {
      throw e;
    });
  }

  getReferalsProfit(coin: COIN_TYPE) {
    return this.apiService.get(`/pool/refer/profit?page=1&limit=5&coin=${coin}`).then(res => {
      const { data, ...pageInfo } = res;
      // eslint-disable-next-line max-len
      const newData = data.map((item: object) => mapper<ReferalsProfitType>(item, mapperSchemaReferalsProfit)) as ReferalsProfitType[];
      const newPageInfo = mapper<PageInfo>(pageInfo, mapperSchemaPageInfo);
      const validateData = validationResponseFromApi<ReferalsProfitType[]>(schemaGetReferalsProfitResponse);
      const validatePageInfo = validationResponseFromApi<PageInfo>(schemaPageInfoResponse);

      const validData = validateData(newData);
      const validPageInfo = validatePageInfo(newPageInfo);

      if (!validData || !validPageInfo) {
        const error = { ...validateData.errors, ...validatePageInfo.errors, type: ERROR_ACTIONS.VALIDATION };
        throw (error);
      }
      return { data: newData, pageInfo: newPageInfo };
    }).catch(e => {
      throw e;
    });
  }
}
