import { HttpClient } from './httpClient';
import { ApiConfig } from './apiConfig';
import { MidtransError } from './midtransError';

/**
 * These are wrapper/implementation of API methods described on: 
 * https://api-docs.midtrans.com/#midtrans-api
 * @return {Promise} - Promise that contains JSON API response decoded as Object
 */
export class Transaction {
  private parent: any;

  constructor(parentObj: any = {}) {
    this.parent = parentObj;
  }

  status(transactionId: string = ''): Promise<any> {
    const apiUrl = `${this.parent.apiConfig.getCoreApiBaseUrl()}/v2/${transactionId}/status`;
    return this.parent.httpClient.request(
      'get',
      this.parent.apiConfig.get().serverKey,
      apiUrl,
      null
    );
  }

  statusb2b(transactionId: string = ''): Promise<any> {
    const apiUrl = `${this.parent.apiConfig.getCoreApiBaseUrl()}/v2/${transactionId}/status/b2b`;
    return this.parent.httpClient.request(
      'get',
      this.parent.apiConfig.get().serverKey,
      apiUrl,
      null
    );
  }

  approve(transactionId: string = ''): Promise<any> {
    const apiUrl = `${this.parent.apiConfig.getCoreApiBaseUrl()}/v2/${transactionId}/approve`;
    return this.parent.httpClient.request(
      'post',
      this.parent.apiConfig.get().serverKey,
      apiUrl,
      null
    );
  }

  deny(transactionId: string = ''): Promise<any> {
    const apiUrl = `${this.parent.apiConfig.getCoreApiBaseUrl()}/v2/${transactionId}/deny`;
    return this.parent.httpClient.request(
      'post',
      this.parent.apiConfig.get().serverKey,
      apiUrl,
      null
    );
  }

  cancel(transactionId: string = ''): Promise<any> {
    const apiUrl = `${this.parent.apiConfig.getCoreApiBaseUrl()}/v2/${transactionId}/cancel`;
    return this.parent.httpClient.request(
      'post',
      this.parent.apiConfig.get().serverKey,
      apiUrl,
      null
    );
  }

  expire(transactionId: string = ''): Promise<any> {
    const apiUrl = `${this.parent.apiConfig.getCoreApiBaseUrl()}/v2/${transactionId}/expire`;
    return this.parent.httpClient.request(
      'post',
      this.parent.apiConfig.get().serverKey,
      apiUrl,
      null
    );
  }

  refund(transactionId: string = '', parameter: any = {}): Promise<any> {
    const apiUrl = `${this.parent.apiConfig.getCoreApiBaseUrl()}/v2/${transactionId}/refund`;
    return this.parent.httpClient.request(
      'post',
      this.parent.apiConfig.get().serverKey,
      apiUrl,
      parameter
    );
  }

  refundDirect(transactionId: string = '', parameter: any = {}): Promise<any> {
    const apiUrl = `${this.parent.apiConfig.getCoreApiBaseUrl()}/v2/${transactionId}/refund/online/direct`;
    return this.parent.httpClient.request(
      'post',
      this.parent.apiConfig.get().serverKey,
      apiUrl,
      parameter
    );
  }

  notification(notificationObj: any = {}): Promise<any> {
    return new Promise((resolve, reject) => {
      if (typeof notificationObj === 'string') {
        try {
          notificationObj = JSON.parse(notificationObj);
        } catch (err) {
          if (err instanceof Error) {
            reject(
              new MidtransNotificationError(
                `fail to parse 'notification' string as JSON. Use JSON string or Object as 'notification'. with message: ${err.message}`
              )
            );
          } else {
            reject(
              new MidtransNotificationError(
                `fail to parse 'notification' string as JSON. Use JSON string or Object as 'notification'.`
              )
            );
          }
        }
      }

      const transactionId = notificationObj.transaction_id;
      this.status(transactionId)
        .then((res) => {
          resolve(res);
        })
        .catch((err) => {
          reject(err);
        });
    });
  }
}

export class MidtransNotificationError extends Error {}
