export enum RequestMethods {
  POST = 'POST',
  GET = 'GET',
  DELETE = 'DELETE',
  PATCH = 'PATCH',
  PUT = 'PUT'
}

export type RequestHeadersType = {
  [key: string]: string | number,
}

export type RequestOptionsType = {
  method: RequestMethods,
  url: string,
  data?: object,
  params?: object,
  headers?: RequestHeadersType,
  flag? :boolean
}

export type RequestRetryOptionsType = {
  retry: number;
  retryTimeoutMillis: number;
}

export type ResponseType = {
  code: number;
  data: any;
  message: string;
}
