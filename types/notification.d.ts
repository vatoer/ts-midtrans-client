export interface Notification {
    transaction_type: string; // Type of transaction. String Required
    transaction_time: string; // Time of transaction. String Required
    transaction_status: string; // Status of transaction. String Required
    transaction_id: string; // ID of transaction. String Required
    status_message: string; // Status message. String Required
    status_code: string; // Status code. String Required
    signature_key: string; // Signature key. String Required
    settlement_time?: string; // Settlement time. String Optional
    payment_type: string; // Type of payment. String Required
    order_id: string; // Order ID. String Required
    merchant_id: string; // Merchant ID. String Required
    issuer?: string; // Issuer. String Optional
    gross_amount: string; // Gross amount. String Required
    fraud_status: string; // Fraud status. String Required
    expiry_time?: string; // Expiry time. String Optional
    currency: string; // Currency. String Required
    acquirer?: string; // Acquirer. String Optional
  }