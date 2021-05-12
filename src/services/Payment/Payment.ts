import mapper from 'helpers/Mapper';
import {
  EarningsSummaryDataItemType, PaymentDataItemType,
} from 'entitiesState/payment';
import validationResponseFromApi from 'helpers/ValidationResponseFromApi';
import { ERROR_ACTIONS } from 'types/ActionTypes';
import { PageInfo } from 'types/pageInfo';
import { COIN_TYPE } from 'entitiesState/currency';
import { APIService } from '../API';
import {
  schemaPageInfoResponse, schemaGetPaymentInfoResponse,
  schemaGetEarningSummaryInfoResponse,

} from './SchemaType';
import {
  mapperSchemaPageInfo, mapperSchemaPaymentDataItem, mapperSchemaEarningSummaryDataItem,

} from './SchemaMapper';

export default class PaymentService {
  constructor(private readonly apiService: APIService) {}

  getPaymentInfo(data:{coin:COIN_TYPE, countPage: number}) {
    return this.apiService.get(`/profit/${data.coin}/payment?page=${data.countPage}&limit=50`).then(res => {
      const { data, ...pageInfo } = res;
      // eslint-disable-next-line max-len
      const newData = data.map((item: object) => mapper<PaymentDataItemType>(item, mapperSchemaPaymentDataItem))as PaymentDataItemType[];
      const newPageInfo = mapper<PageInfo>(pageInfo, mapperSchemaPageInfo);
      const validateData = validationResponseFromApi<PaymentDataItemType[]>(schemaGetPaymentInfoResponse);
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

  getEarningSummaryInfo(data:{ coin:COIN_TYPE, countPage: number }) {
    // eslint-disable-next-line max-len
    return this.apiService.get(`/profit${data.coin === COIN_TYPE.DOGE ? '/reward' : ''}/${data.coin}/summary?page=${data.countPage}&limit=50`).then(res => {
      const { data, ...pageInfo } = res;
      // eslint-disable-next-line max-len
      const newData = data.map((item: object) => mapper<EarningsSummaryDataItemType>(item, mapperSchemaEarningSummaryDataItem))as EarningsSummaryDataItemType[];
      const newPageInfo = mapper<PageInfo>(pageInfo, mapperSchemaPageInfo);
      // eslint-disable-next-line max-len
      const validateData = validationResponseFromApi<EarningsSummaryDataItemType[]>(schemaGetEarningSummaryInfoResponse);
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
