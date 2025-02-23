export interface GoPay {
    enable_callback?: boolean; // Enable callback. Boolean Optional
    callback_url?: string;     // Callback URL. String Optional
    account_id?: string;       // Account ID. String Conditional
    payment_option_token?: string; // Payment option token. String Conditional
    pre_auth?: boolean;        // Pre-authorization. Boolean Optional
    recurring?: boolean;       // Recurring payment. Boolean Optional
    promotion_ids?: string[];  // List of promotion IDs. Array of strings Optional
  }

/**
 * SubscriptionGopay
 * @example 
 * "gopay": {
 *   "account_id": "123456"
 * }
 */
export interface SubscriptionGopay {
  "account_id": string,
}
