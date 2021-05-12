import {
  AccountType, CurrentAccount, SubAccountsType, UserInfo,
} from 'entitiesState/account';
import mapper from 'helpers/Mapper';
import validationResponseFromApi from 'helpers/ValidationResponseFromApi';
import { ERROR_ACTIONS } from 'types/ActionTypes';
import { APIService } from '../API';

import {
  schemaAccountResponse, schemaSubAccountsResponse, schemaUserInfoResponse, schemaChangeSubAccountResponse,
} from './SchemaType';
import {
  mapperSchemaGetAccountToState, mapperSchemaGetSubAccountsToState,
  mapperSchemaGetUserInfo, mapperSchemaPutChangeSubAccont,
} from './ShemaMapper';

export default class AccountService {
  constructor(private readonly apiService: APIService) {}

  getAccountInfo() {
    return this.apiService.get('/account/origin/user').then(res => {
      const newData = mapper<AccountType>(res, mapperSchemaGetAccountToState);
      const validate = validationResponseFromApi<AccountType>(schemaAccountResponse);
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

  getSubAccountsInfo() {
    return this.apiService.get('/account/user').then(res => {
      const newData = res.map((item: object) => mapper<SubAccountsType>(item, mapperSchemaGetSubAccountsToState));
      const validate = validationResponseFromApi<SubAccountsType[]>(schemaSubAccountsResponse);
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

  getUserInfo() {
    return this.apiService.get('/account/user/info').then(res => {
      const newData = mapper<UserInfo>(res, mapperSchemaGetUserInfo);
      const validate = validationResponseFromApi<UserInfo>(schemaUserInfoResponse);
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

  putChangeSubAccount(id:number) {
    return this.apiService.put('/account/user', { id }).then(res => {
      const newData = mapper<CurrentAccount>(res, mapperSchemaPutChangeSubAccont);
      const validate = validationResponseFromApi<CurrentAccount>(schemaChangeSubAccountResponse);
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

  postSubAccount(account:string) {
    return this.apiService.post('/account/user/manage', { account }).catch(e => {
      throw e;
    });
  }

  putChangeVisibleSubAccount(id: number, visible: boolean) {
    return this.apiService.put('/account/user/manage', { id, visible: !visible }).catch(e => {
      throw e;
    });
  }
}
