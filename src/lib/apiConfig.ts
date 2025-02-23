import * as _ from 'lodash';

/**
 * Config Object that is used to store isProduction, serverKey, clientKey,
 * and also API base URLs.
 */
export class ApiConfig {
  private isProduction: boolean;
  private serverKey: string;
  private clientKey: string;

  static readonly CORE_SANDBOX_BASE_URL = 'https://api.sandbox.midtrans.com';
  static readonly CORE_PRODUCTION_BASE_URL = 'https://api.midtrans.com';
  static readonly SNAP_SANDBOX_BASE_URL = 'https://app.sandbox.midtrans.com/snap/v1';
  static readonly SNAP_PRODUCTION_BASE_URL = 'https://app.midtrans.com/snap/v1';
  static readonly IRIS_SANDBOX_BASE_URL = 'https://app.sandbox.midtrans.com/iris/api/v1';
  static readonly IRIS_PRODUCTION_BASE_URL = 'https://app.midtrans.com/iris/api/v1';

  constructor(options: { isProduction?: boolean; serverKey: string; clientKey: string } = { isProduction: false, serverKey: '', clientKey: '' }) {
    this.isProduction = options.isProduction ?? false;
    this.serverKey = options.serverKey;
    this.clientKey = options.clientKey;

    this.set(options);
  }

  /**
   * Return config stored
   * @return {Object} object contains isProduction, serverKey, clientKey
   */
  get(): { isProduction: boolean; serverKey: string; clientKey: string } {
    return {
      isProduction: this.isProduction,
      serverKey: this.serverKey,
      clientKey: this.clientKey,
    };
  }

  /**
   * Set config stored
   * @param {Object} options - object contains isProduction, serverKey, clientKey
   */
  set(options: { isProduction?: boolean; serverKey: string; clientKey: string }): void {
    const parsedOptions = _.pick(options, ['isProduction', 'serverKey', 'clientKey']);
    const mergedConfig = _.merge({}, { isProduction: this.isProduction, serverKey: this.serverKey, clientKey: this.clientKey }, parsedOptions);

    this.isProduction = mergedConfig.isProduction;
    this.serverKey = mergedConfig.serverKey;
    this.clientKey = mergedConfig.clientKey;
  }

  /**
   * @return {String} core api base url
   */
  getCoreApiBaseUrl(): string {
    return this.isProduction ? ApiConfig.CORE_PRODUCTION_BASE_URL : ApiConfig.CORE_SANDBOX_BASE_URL;
  }

  /**
   * @return {String} snap api base url
   */
  getSnapApiBaseUrl(): string {
    return this.isProduction ? ApiConfig.SNAP_PRODUCTION_BASE_URL : ApiConfig.SNAP_SANDBOX_BASE_URL;
  }

  /**
   * @return {String} Iris api base url
   */
  getIrisApiBaseUrl(): string {
    return this.isProduction ? ApiConfig.IRIS_PRODUCTION_BASE_URL : ApiConfig.IRIS_SANDBOX_BASE_URL;
  }
}
