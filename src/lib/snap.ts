import { ApiConfig } from './apiConfig';
import { HttpClient } from './httpClient';
import { Transaction } from './transaction';
import {  SnapTransaction } from 'types/transaction';
import { Parameter } from 'types/parameter';
import { MidtransError } from './midtransError';

/**
 * Snap object used to do request to Midtrans Snap API
 */
export class Snap {
  private apiConfig: ApiConfig;
  private httpClient: HttpClient;
  private transaction: Transaction;

  constructor(options: { isProduction?: boolean; serverKey: string; clientKey: string } = { isProduction: false, serverKey: '', clientKey: '' }) {
    this.apiConfig = new ApiConfig(options);
    this.httpClient = new HttpClient(this);
    this.transaction = new Transaction(this);
  }

  /**
   * Do `/transactions` API request to Snap API
   * @param  {Object} parameter - object of Core API JSON body as parameter, will be converted to JSON
   * @return {Promise<Object>} - Promise contains Object from JSON decoded response
   */
  async createTransaction(parameter: Parameter ): Promise<SnapTransaction|MidtransError> {
    const apiUrl = `${this.apiConfig.getSnapApiBaseUrl()}/transactions`;
    return this.httpClient.request(
      'post',
      this.apiConfig.get().serverKey,
      apiUrl,
      parameter
    );
  }

  /**
   * Wrapper function that call `createTransaction` then:
   * @return {Promise<string>} - Promise of String token
   */
  async createTransactionToken(parameter: Parameter): Promise<string> {
    const res = await this.createTransaction(parameter);
    if (res instanceof MidtransError) {
      throw res; // Re-throw the error to be handled by the caller
    }
    return res.token;
  }

  /**
   * Wrapper function that call `createTransaction` then:
   * @return {Promise<string>} - Promise of String redirect_url
   */
  async createTransactionRedirectUrl(parameter: Parameter): Promise<string> {
    const res = await this.createTransaction(parameter);
    if (res instanceof MidtransError) {
      throw res; // Re-throw the error to be handled by the caller
    }
    return res.redirect_url!;
  }

  getTransaction(): Transaction {
    return this.transaction;
  }

}
