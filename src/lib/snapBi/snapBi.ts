import * as crypto from 'crypto';
import SnapBiApiRequestor from './snapBiApiRequestor';
import SnapBiConfig from './snapBiConfig';

class SnapBi {
    static ACCESS_TOKEN = '/v1.0/access-token/b2b';
    static PAYMENT_HOST_TO_HOST = '/v1.0/debit/payment-host-to-host';
    static CREATE_VA = '/v1.0/transfer-va/create-va';
    static DEBIT_STATUS = '/v1.0/debit/status';
    static DEBIT_REFUND = '/v1.0/debit/refund';
    static DEBIT_CANCEL = '/v1.0/debit/cancel';
    static VA_STATUS = '/v1.0/transfer-va/status';
    static VA_CANCEL = '/v1.0/transfer-va/delete-va';
    static QRIS_PAYMENT = '/v1.0/qr/qr-mpm-generate';
    static QRIS_STATUS = '/v1.0/qr/qr-mpm-query';
    static QRIS_REFUND = '/v1.0/qr/qr-mpm-refund';
    static QRIS_CANCEL = '/v1.0/qr/qr-mpm-cancel';

    private paymentMethod: string;
    private apiPath: string;
    private accessTokenHeader: Record<string, string>;
    private transactionHeader: Record<string, string>;
    private body: any;
    private accessToken: string;
    private deviceId: string;
    private debugId: string;
    private timeStamp: string;
    private timeout: number | null;
    private signature: string;
    private notificationUrlPath: string;
    private notificationPayload: any;

    constructor(paymentMethod: string) {
        this.paymentMethod = paymentMethod;
        this.apiPath = '';
        this.accessTokenHeader = {};
        this.transactionHeader = {};
        this.body = {};
        this.accessToken = '';
        this.deviceId = '';
        this.debugId = '';
        this.timeStamp = new Date().toISOString();
        this.timeout = null;
        this.signature = '';
        this.notificationUrlPath = '';
        this.notificationPayload = {};
    }

    static directDebit() {
        return new SnapBi('directDebit');
    }

    static va() {
        return new SnapBi('va');
    }

    static qris() {
        return new SnapBi('qris');
    }

    static notification() {
        return new SnapBi('');
    }

    withAccessTokenHeader(headers: Record<string, string>) {
        this.accessTokenHeader = { ...this.accessTokenHeader, ...headers };
        return this;
    }

    withTransactionHeader(headers: Record<string, string>) {
        this.transactionHeader = { ...this.transactionHeader, ...headers };
        return this;
    }

    withAccessToken(accessToken: string) {
        this.accessToken = accessToken;
        return this;
    }

    withBody(body: any) {
        this.body = body;
        return this;
    }

    withSignature(signature: string) {
        this.signature = signature;
        return this;
    }

    withTimeStamp(timeStamp: string) {
        this.timeStamp = timeStamp;
        return this;
    }

    withNotificationPayload(notificationPayload: any) {
        this.notificationPayload = notificationPayload;
        return this;
    }

    withNotificationUrlPath(notificationUrlPath: string) {
        this.notificationUrlPath = notificationUrlPath;
        return this;
    }

    withPrivateKey(privateKey: string) {
        SnapBiConfig.snapBiPrivateKey = privateKey;
        return this;
    }

    withClientId(clientId: string) {
        SnapBiConfig.snapBiClientId = clientId;
        return this;
    }

    withClientSecret(clientSecret: string) {
        SnapBiConfig.snapBiClientSecret = clientSecret;
        return this;
    }

    withPartnerId(partnerId: string) {
        SnapBiConfig.snapBiPartnerId = partnerId;
        return this;
    }

    withChannelId(channelId: string) {
        SnapBiConfig.snapBiChannelId = channelId;
        return this;
    }

    withDeviceId(deviceId: string) {
        this.deviceId = deviceId;
        return this;
    }

    withDebugId(debugId: string) {
        this.debugId = debugId;
        return this;
    }

    withTimeout(timeout: number | null) {
        this.timeout = timeout;
        return this;
    }

    async createPayment(externalId: string) {
        this.apiPath = this.setupCreatePaymentApiPath(this.paymentMethod);
        return await this.createConnection(externalId);
    }

    async cancel(externalId: string) {
        this.apiPath = this.setupCancelApiPath(this.paymentMethod);
        return await this.createConnection(externalId);
    }

    async refund(externalId: string) {
        this.apiPath = this.setupRefundApiPath(this.paymentMethod);
        return await this.createConnection(externalId);
    }

    async getStatus(externalId: string) {
        this.apiPath = this.setupGetStatusApiPath(this.paymentMethod);
        return await this.createConnection(externalId);
    }

    isWebhookNotificationVerified() {
        if (SnapBiConfig.snapBiPublicKey == null) {
            throw new Error("The public key is null, You need to set the public key from SnapBiConfig.'\n" +
                "For more details, contact support at support@midtrans.com if you have any questions.");
        }
        const notificationHttpMethod = "POST";
        const minifiedNotificationBodyJsonString = JSON.stringify(this.notificationPayload);
        const hashedNotificationBodyJsonString = crypto
            .createHash("sha256")
            .update(minifiedNotificationBodyJsonString)
            .digest("hex")
            .toLowerCase();

        const rawStringDataToVerifyAgainstSignature =
            notificationHttpMethod +
            ":" +
            this.notificationUrlPath +
            ":" +
            hashedNotificationBodyJsonString +
            ":" +
            this.timeStamp;

        const verifier = crypto.createVerify("SHA256");
        verifier.update(rawStringDataToVerifyAgainstSignature, "utf8");
        const isSignatureVerified = verifier.verify(
            SnapBiConfig.snapBiPublicKey,
            this.signature,
            "base64",
        );
        return isSignatureVerified;
    }

    async getAccessToken() {
        const snapBiAccessTokenHeader = this.buildAccessTokenHeader(this.timeStamp);
        const openApiPayload = {
            grant_type: 'client_credentials',
        };
        return await SnapBiApiRequestor.remoteCall(
            SnapBiConfig.getBaseUrl() + SnapBi.ACCESS_TOKEN,
            snapBiAccessTokenHeader,
            openApiPayload,
            this.timeout
        );
    }

    async createConnection(externalId: string | null = null) {
        if (!this.accessToken) {
            const accessTokenResponse = await this.getAccessToken();
            if (!accessTokenResponse.accessToken) {
                return accessTokenResponse;
            }
            this.accessToken = accessTokenResponse.accessToken;
        }

        const snapBiTransactionHeader = this.buildSnapBiTransactionHeader(externalId, this.timeStamp);
        return await SnapBiApiRequestor.remoteCall(
            SnapBiConfig.getBaseUrl() + this.apiPath,
            snapBiTransactionHeader,
            this.body,
            this.timeout
        );
    }

    static getSymmetricSignatureHmacSh512(accessToken: string, requestBody: any, method: string, path: string, clientSecret: string, timeStamp: string) {
        const minifiedBody = JSON.stringify(requestBody);
        const hashedBody = crypto.createHash('sha256').update(minifiedBody).digest('hex').toLowerCase();

        const payload = `${method.toUpperCase()}:${path}:${accessToken}:${hashedBody}:${timeStamp}`;
        const hmac = crypto.createHmac('sha512', clientSecret).update(payload).digest('base64');

        return hmac;
    }

    static getAsymmetricSignatureSha256WithRsa(clientId: string, xTimeStamp: string, privateKey: string) {
        const stringToSign = clientId + "|" + xTimeStamp;
        return crypto.sign('RSA-SHA256', Buffer.from(stringToSign), privateKey).toString("base64");
    }

    buildSnapBiTransactionHeader(externalId: string | null, timeStamp: string) {
        let snapBiTransactionHeader: Record<string, string> = {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'X-PARTNER-ID': SnapBiConfig.snapBiPartnerId,
            'X-EXTERNAL-ID': externalId ?? '',
            'X-DEVICE-ID': this.deviceId,
            'CHANNEL-ID': SnapBiConfig.snapBiChannelId,
            'debug-id': this.debugId,
            'Authorization': `Bearer ${this.accessToken}`,
            'X-TIMESTAMP': timeStamp,
            'X-SIGNATURE': SnapBi.getSymmetricSignatureHmacSh512(
                this.accessToken,
                this.body,
                'post',
                this.apiPath,
                SnapBiConfig.snapBiClientSecret,
                timeStamp
            ),
        };

        if (this.transactionHeader) {
            snapBiTransactionHeader = { ...snapBiTransactionHeader, ...this.transactionHeader };
        }

        return snapBiTransactionHeader;
    }

    buildAccessTokenHeader(timeStamp: string) {
        let snapBiAccessTokenHeader: Record<string, string> = {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'X-CLIENT-KEY': SnapBiConfig.snapBiClientId,
            'X-SIGNATURE': SnapBi.getAsymmetricSignatureSha256WithRsa(
                SnapBiConfig.snapBiClientId,
                timeStamp,
                SnapBiConfig.snapBiPrivateKey
            ),
            'X-TIMESTAMP': timeStamp,
            'debug-id': this.debugId,
        };

        if (this.accessTokenHeader) {
            snapBiAccessTokenHeader = { ...snapBiAccessTokenHeader, ...this.accessTokenHeader };
        }

        return snapBiAccessTokenHeader;
    }

    setupCreatePaymentApiPath(paymentMethod: string) {
        switch (paymentMethod) {
            case 'va':
                return SnapBi.CREATE_VA;
            case 'qris':
                return SnapBi.QRIS_PAYMENT;
            case 'directDebit':
                return SnapBi.PAYMENT_HOST_TO_HOST;
            default:
                throw new Error(`Payment method not implemented: ${paymentMethod}`);
        }
    }

    setupRefundApiPath(paymentMethod: string) {
        switch (paymentMethod) {
            case 'qris':
                return SnapBi.QRIS_REFUND;
            case 'directDebit':
                return SnapBi.DEBIT_REFUND;
            default:
                throw new Error(`Payment method not implemented: ${paymentMethod}`);
        }
    }

    setupCancelApiPath(paymentMethod: string) {
        switch (paymentMethod) {
            case 'va':
                return SnapBi.VA_CANCEL;
            case 'qris':
                return SnapBi.QRIS_CANCEL;
            case 'directDebit':
                return SnapBi.DEBIT_CANCEL;
            default:
                throw new Error(`Payment method not implemented: ${paymentMethod}`);
        }
    }

    setupGetStatusApiPath(paymentMethod: string) {
        switch (paymentMethod) {
            case 'va':
                return SnapBi.VA_STATUS;
            case 'qris':
                return SnapBi.QRIS_STATUS;
            case 'directDebit':
                return SnapBi.DEBIT_STATUS;
            default:
                throw new Error(`Payment method not implemented: ${paymentMethod}`);
        }
    }
}

export default SnapBi;
