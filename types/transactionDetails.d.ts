export interface TransactionDetails {
  order_id: string;
  gross_amount: number;
}

export interface Refund {
  refund_chargeback_id: number;
  refund_amount: string;
  created_at: string;
  reason: string;
  refund_key: string;
  refund_method?: string;
  bank_confirmed_at?: string;
}

/**
 * @see https://docs.midtrans.com/reference/get-transaction-status
 * @see https://docs.midtrans.com/reference/status-code-2xx
 */
export interface TransactionStatus {
  status_code: string;
  status_message: string;
  transaction_id?: string;
  masked_card?: string;
  order_id?: string;
  payment_type?: string;
  transaction_time?: string;
  transaction_status?: string;
  fraud_status?: string;
  approval_code?: string;
  signature_key?: string;
  bank?: string;
  gross_amount?: string;
  channel_response_code?: string;
  channel_response_message?: string;
  card_type?: string;
  payment_option_type?: string;
  shopeepay_reference_number?: string;
  reference_id?: string;
  refund_amount?: string;
  refunds?: Refund[];
}