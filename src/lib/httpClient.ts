import axios, { AxiosInstance, AxiosResponse } from 'axios';
import { MidtransError } from './midtransError';

/**
 * Wrapper of Axios to do API request to Midtrans API
 * @return {Promise} of API response, or exception during request
 * capable to do HTTP `request`
 * @see https://docs.midtrans.com/reference/code-2xx
 */
export class HttpClient {
  private parent: any;
  private http_client: AxiosInstance;

  constructor(parentObj: any = {}) {
    this.parent = parentObj;
    this.http_client = axios.create();
  }

  request(
    httpMethod: string,
    serverKey: string,
    requestUrl: string,
    firstParam: Record<string, any> = {},
    secondParam: Record<string, any> = {}
  ): Promise<any> {
    let headers = {
      'content-type': 'application/json',
      'accept': 'application/json',
      'user-agent': 'midtransclient-nodejs/1.4.2',
    };

    let reqBodyPayload: Record<string, any> = {};
    let reqQueryParam: Record<string, any> = {};

    if (httpMethod.toLowerCase() === 'get') {
      // GET http request will use first available param as URL Query param
      reqQueryParam = firstParam;
      reqBodyPayload = secondParam;
    } else {
      // Non-GET http request will use first available param as JSON payload body
      reqBodyPayload = firstParam;
      reqQueryParam = secondParam;
    }

    return new Promise((resolve, reject) => {
      // Reject if param is not JSON
      if (typeof reqBodyPayload === 'string') {
        try {
          reqBodyPayload = JSON.parse(reqBodyPayload);
        } catch (err) {
          reject(
            new MidtransError(
              `fail to parse 'body parameters' string as JSON. Use JSON string or Object as 'body parameters'. with message: ${err}`
            )
          );
        }
      }

      // Reject if param is not JSON
      if (typeof reqQueryParam === 'string') {
        try {
          reqQueryParam = JSON.parse(reqQueryParam);
        } catch (err) {
          reject(
            new MidtransError(
              `fail to parse 'query parameters' string as JSON. Use JSON string or Object as 'query parameters'. with message: ${err}`
            )
          );
        }
      }

      this.http_client({
        method: httpMethod,
        headers: headers,
        url: requestUrl,
        data: reqBodyPayload,
        params: reqQueryParam,
        auth: {
          username: serverKey,
          password: '',
        },
      })
        .then((res: AxiosResponse) => {
          // Reject core API error status code
          if (res.data.hasOwnProperty('status_code') && res.data.status_code >= 400 && res.data.status_code !== 407) {
            reject(
              new MidtransError(
                `Midtrans API is returning API error. HTTP status code: ${res.data.status_code}. API response: ${JSON.stringify(res.data)}`,
                res.data.status_code,
                res.data,
                res
              )
            );
          }
          resolve(res.data);
        })
        .catch((err: any) => {
          let res = err.response;
          // Reject API error HTTP status code
          if (res && res.status >= 400) {
            reject(
              new MidtransError(
                `Midtrans API is returning API error. HTTP status code: ${res.status}. API response: ${JSON.stringify(res.data)}`,
                res.status,
                res.data,
                res
              )
            );
          } else if (!res) {
            reject(
              new MidtransError(
                `Midtrans API request failed. HTTP response not found, likely connection failure, with message: ${JSON.stringify(err.message)}`,
                null,
                null,
                err
              )
            );
          }
          reject(err);
        });
    });
  }
}
