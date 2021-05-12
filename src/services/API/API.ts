import axios, { AxiosResponse } from 'axios';
import { EventEmitter } from 'events';

import { ERROR_ACTIONS } from 'types/ActionTypes';

import {
  RequestHeadersType,
  RequestMethods,
  RequestOptionsType,
  RequestRetryOptionsType,

  ResponseType,
} from './types';

const defaultRetryOptions = {
  retry: 5,
  retryTimeoutMillis: 250,
};

export class APIService {
  private accessToken: Nullable<string> = null;

  connectionNetwork: boolean

  private eventEmitter: EventEmitter = new EventEmitter();

  constructor(private readonly baseUrl: string) {
    this.connectionNetwork = true;
  }

  setAccessToken(accessToken: Nullable<string>) {
    this.accessToken = accessToken;
  }

  hasNetworkConnection(isConnect: boolean) {
    this.connectionNetwork = isConnect;
  }

  addErrorHandler(handler: (error: any) => void) {
    this.eventEmitter.on('error', handler);

    return () => {
      this.eventEmitter.off('error', handler);
    };
  }

  _invokeErrorHandlers(error: any) {
    this.eventEmitter.emit('error', error);
  }

  _request({
    method,
    url,
    data,
    params,
    headers,
    flag,
  }: RequestOptionsType, {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    retry = defaultRetryOptions.retry,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    retryTimeoutMillis = defaultRetryOptions.retryTimeoutMillis,
  }: RequestRetryOptionsType = defaultRetryOptions) {
    const requestHeaders: RequestHeadersType = {
      'Content-Type': 'application/json',
      ...headers,
    };

    if (typeof this.accessToken === 'string' && this.accessToken.length > 0) {
      requestHeaders.Authorization = this.accessToken;
    }

    return axios(flag ? `${url}` : `${this.baseUrl}${url}`, {
      method,
      data,
      params,
      headers: requestHeaders,
    }).then((response: AxiosResponse<ResponseType>) => {
      const {
        data: {
          code,
          message,
          data,
        },
      } = response;

      if (code === 0) {
        return data;
      }

      const error = {
        code,
        message,
        type: ERROR_ACTIONS.NETWORK,
      };

      throw error;
    }).catch(error => {
      if (error.response) {
        if (error.response.data) {
          const errorData = {
            ...error.response.data,
            type: ERROR_ACTIONS.NETWORK,
          };

          throw errorData;
        }
      }

      throw error;
    });
  }

  get(url: string, params: any = {}, headers = {}) {
    return this._request({
      method: RequestMethods.GET,
      url,
      params,
      headers,
    }).catch(e => {
      this._invokeErrorHandlers(e);

      throw e;
    });
  }

  post(url: string, data?: any, flag? : boolean) {
    return this._request({
      method: RequestMethods.POST,
      url,
      data,
      flag,
    }).catch(e => {
      this._invokeErrorHandlers(e);

      throw e;
    });
  }

  put(url: string, data?: any) {
    return this._request({
      method: RequestMethods.PUT,
      url,
      data,
    }).catch(e => {
      this._invokeErrorHandlers(e);

      throw e;
    });
  }

  delete(url: string, data?: any) {
    return this._request({
      method: RequestMethods.DELETE,
      url,
      data,
    }).catch(e => {
      this._invokeErrorHandlers(e);

      throw e;
    });
  }

  patch(url: string, data?: any, flag? :boolean) {
    return this._request({
      method: RequestMethods.PATCH,
      url,
      data,
      flag,
    }).catch(e => {
      this._invokeErrorHandlers(e);

      throw e;
    });
  }
}
