import { ApiConfig } from "./apiConfig";
import { HttpClient } from "./httpClient";
import { Transaction } from "./transaction";

interface IrisOptions {
  isProduction?: boolean;
  serverKey: string;
  clientKey: string;
}

interface RequestParameters {
  [key: string]: any;
}

class Iris {
  private apiConfig: ApiConfig;
  private httpClient: HttpClient;
  private transaction: Transaction;

  /**
   * Initiate with options
   * @param  {IrisOptions} options - should have these props: isProduction, serverKey
   */
  constructor(options: IrisOptions = { isProduction: false, serverKey: "", clientKey: "" }) {
    this.apiConfig = new ApiConfig(options);
    this.httpClient = new HttpClient(this);
    this.transaction = new Transaction(this);
  }

  /**
   * Do `/ping` API request to Iris API
   * @return {Promise} - Promise contains Object from JSON decoded response
   */
  ping(): Promise<any> {
    const apiUrl = `${this.apiConfig.getIrisApiBaseUrl()}/ping`;
    return this.httpClient.request(
      "get",
      this.apiConfig.get().serverKey,
      apiUrl
    );
  }

  /**
   * Do create `/beneficiaries` API request to Iris API
   * @param  {RequestParameters} parameter - object of Iris API JSON body as parameter
   * @return {Promise} - Promise contains Object from JSON decoded response
   */
  createBeneficiaries(parameter: RequestParameters = {}): Promise<any> {
    const apiUrl = `${this.apiConfig.getIrisApiBaseUrl()}/beneficiaries`;
    return this.httpClient.request(
      "post",
      this.apiConfig.get().serverKey,
      apiUrl,
      parameter
    );
  }

  /**
   * Do update `/beneficiaries/<alias_name>` API request to Iris API
   * @param  {string} aliasName - alias_name of the beneficiaries that need to be updated
   * @param  {RequestParameters} parameter - object of Iris API JSON body as parameter
   * @return {Promise} - Promise contains Object from JSON decoded response
   */
  updateBeneficiaries(
    aliasName: string,
    parameter: RequestParameters = {}
  ): Promise<any> {
    const apiUrl = `${this.apiConfig.getIrisApiBaseUrl()}/beneficiaries/${aliasName}`;
    return this.httpClient.request(
      "patch",
      this.apiConfig.get().serverKey,
      apiUrl,
      parameter
    );
  }

  /**
   * Do `/beneficiaries` API request to Iris API
   * @return {Promise} - Promise contains Object from JSON decoded response
   */
  getBeneficiaries(): Promise<any> {
    const apiUrl = `${this.apiConfig.getIrisApiBaseUrl()}/beneficiaries`;
    return this.httpClient.request(
      "get",
      this.apiConfig.get().serverKey,
      apiUrl
    );
  }

  /**
   * Do create `/payouts` API request to Iris API
   * @param  {RequestParameters} parameter - object of Iris API JSON body as parameter
   * @return {Promise} - Promise contains Object from JSON decoded response
   */
  createPayouts(parameter: RequestParameters = {}): Promise<any> {
    const apiUrl = `${this.apiConfig.getIrisApiBaseUrl()}/payouts`;
    return this.httpClient.request(
      "post",
      this.apiConfig.get().serverKey,
      apiUrl,
      parameter
    );
  }

  /**
   * Do approve `/payouts/approve` API request to Iris API
   * @param  {RequestParameters} parameter - object of Iris API JSON body as parameter
   * @return {Promise} - Promise contains Object from JSON decoded response
   */
  approvePayouts(parameter: RequestParameters = {}): Promise<any> {
    const apiUrl = `${this.apiConfig.getIrisApiBaseUrl()}/payouts/approve`;
    return this.httpClient.request(
      "post",
      this.apiConfig.get().serverKey,
      apiUrl,
      parameter
    );
  }

  /**
   * Do reject `/payouts/reject` API request to Iris API
   * @param  {RequestParameters} parameter - object of Iris API JSON body as parameter
   * @return {Promise} - Promise contains Object from JSON decoded response
   */
  rejectPayouts(parameter: RequestParameters = {}): Promise<any> {
    const apiUrl = `${this.apiConfig.getIrisApiBaseUrl()}/payouts/reject`;
    return this.httpClient.request(
      "post",
      this.apiConfig.get().serverKey,
      apiUrl,
      parameter
    );
  }

  /**
   * Do `/payouts/<reference_no>` API request to Iris API
   * @param  {string} referenceNo - reference_no of the payout
   * @return {Promise} - Promise contains Object from JSON decoded response
   */
  getPayoutDetails(referenceNo: string): Promise<any> {
    const apiUrl = `${this.apiConfig.getIrisApiBaseUrl()}/payouts/${referenceNo}`;
    return this.httpClient.request(
      "get",
      this.apiConfig.get().serverKey,
      apiUrl
    );
  }

  /**
   * Do `/statements` API request to Iris API
   * @param {RequestParameters} parameter - Optional parameters for the request
   * @return {Promise} - Promise contains Object from JSON decoded response
   */
  getTransactionHistory(parameter: RequestParameters = {}): Promise<any> {
    const apiUrl = `${this.apiConfig.getIrisApiBaseUrl()}/statements`;
    return this.httpClient.request(
      "get",
      this.apiConfig.get().serverKey,
      apiUrl,
      undefined,
      parameter
    );
  }

  /**
   * Do `/channels` API request to Iris API
   * @return {Promise} - Promise contains Object from JSON decoded response
   */
  getTopupChannels(): Promise<any> {
    const apiUrl = `${this.apiConfig.getIrisApiBaseUrl()}/channels`;
    return this.httpClient.request(
      "get",
      this.apiConfig.get().serverKey,
      apiUrl
    );
  }

  /**
   * Do `/balance` API request to Iris API
   * @return {Promise} - Promise contains Object from JSON decoded response
   */
  getBalance(): Promise<any> {
    const apiUrl = `${this.apiConfig.getIrisApiBaseUrl()}/balance`;
    return this.httpClient.request(
      "get",
      this.apiConfig.get().serverKey,
      apiUrl
    );
  }

  /**
   * Do `/bank_accounts` API request to Iris API
   * @return {Promise} - Promise contains Object from JSON decoded response
   */
  getFacilitatorBankAccounts(): Promise<any> {
    const apiUrl = `${this.apiConfig.getIrisApiBaseUrl()}/bank_accounts`;
    return this.httpClient.request(
      "get",
      this.apiConfig.get().serverKey,
      apiUrl
    );
  }

  /**
   * Do `/bank_accounts/<bank_account_id>/balance` API request to Iris API
   * @param  {string} bankAccountId - bank_account_id of the bank account
   * @return {Promise} - Promise contains Object from JSON decoded response
   */
  getFacilitatorBalance(bankAccountId: string): Promise<any> {
    const apiUrl = `${this.apiConfig.getIrisApiBaseUrl()}/bank_accounts/${bankAccountId}/balance`;
    return this.httpClient.request(
      "get",
      this.apiConfig.get().serverKey,
      apiUrl
    );
  }

  /**
   * Do `/beneficiary_banks` API request to Iris API
   * @return {Promise} - Promise contains Object from JSON decoded response
   */
  getBeneficiaryBanks(): Promise<any> {
    const apiUrl = `${this.apiConfig.getIrisApiBaseUrl()}/beneficiary_banks`;
    return this.httpClient.request(
      "get",
      this.apiConfig.get().serverKey,
      apiUrl
    );
  }

  /**
   * Do `/account_validation` API request to Iris API
   * @param  {RequestParameters} parameter - object of Iris API JSON body as parameter
   * @return {Promise} - Promise contains Object from JSON decoded response
   */
  validateBankAccount(parameter: RequestParameters = {}): Promise<any> {
    const apiUrl = `${this.apiConfig.getIrisApiBaseUrl()}/account_validation`;
    return this.httpClient.request(
      "get",
      this.apiConfig.get().serverKey,
      apiUrl,
      parameter
    );
  }
}

export default Iris;
