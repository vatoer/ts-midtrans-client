class SnapBiConfig {
    // Static properties for configuration values
    static isProduction: boolean = false;
    static snapBiClientId: string;
    static snapBiPrivateKey: string;
    static snapBiClientSecret: string;
    static snapBiPartnerId: string;
    static snapBiChannelId: string;
    static enableLogging: boolean = false;
    static snapBiPublicKey: string;

    // Constants for base URLs
    static SNAP_BI_SANDBOX_BASE_URL: string = 'https://merchants.sbx.midtrans.com';
    static SNAP_BI_PRODUCTION_BASE_URL: string = 'https://merchants.midtrans.com';

    static getBaseUrl(): string {
        return this.isProduction
            ? this.SNAP_BI_PRODUCTION_BASE_URL
            : this.SNAP_BI_SANDBOX_BASE_URL;
    }
}

export default SnapBiConfig;
