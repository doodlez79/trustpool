import { ERROR_ACTIONS } from 'types/ActionTypes';
import mapper from 'helpers/Mapper';
import validationResponseFromApi from 'helpers/ValidationResponseFromApi';
import { UserTypesToState } from 'entitiesState/user';
import { GeeTestTypes } from 'entitiesState/auth';

import { APIService } from '../API';

import { schemaGeeTestResponse, schemaSingInResponse } from './SchemaType';
import {
  SignInTypeToRequest,
} from './types';
import { mapperSchemaGeeTest, mapperSchemaUserState } from './ShemaMapper';

export class AuthService {
  constructor(private readonly apiService: APIService) {}

  geeTest() {
    return this.apiService.get('/common/geetest').then(response => {
      const mappedData = mapper<GeeTestTypes>(response, mapperSchemaGeeTest);

      const validator = validationResponseFromApi<GeeTestTypes>(schemaGeeTestResponse);
      const isValid = validator(mappedData);

      if (!isValid) {
        const error = { ...validator.errors, type: ERROR_ACTIONS.VALIDATION };

        throw error;
      }

      return mappedData;
    }).catch(e => {
      throw e;
    });
  }

  signIn(signInData: SignInTypeToRequest) {
    return this.apiService.post('/account/signin', signInData).then(response => {
      const mappedData = mapper<UserTypesToState & {token: string}>(response, mapperSchemaUserState);

      const validator = validationResponseFromApi<UserTypesToState & {token: string}>(schemaSingInResponse);
      const isValid = validator(mappedData);

      if (!isValid) {
        const error = { ...validator.errors, type: ERROR_ACTIONS.VALIDATION };

        throw error;
      }

      this.apiService.setAccessToken(mappedData.token);

      return mappedData;
    }).catch(e => {
      throw e;
    });
  }

  signOut() {
    const responsePromise = this.apiService.post('/account/sign/out').catch(e => {
      throw e;
    });

    this.apiService.setAccessToken(null);

    return responsePromise;
  }
}
