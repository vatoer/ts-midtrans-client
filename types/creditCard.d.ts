export interface CreditCard {
    token_id: string;         // Token id represents customer credit card information. String(255) Required
    bank?: 'mandiri' | 'bni' | 'cimb' | 'bca' | 'maybank' | 'bri'; // Name of the acquiring bank. String(255) Optional
    installment_term?: number; // Installment tenure in terms of months. Integer Optional
    bins?: string[];          // List of credit card's BIN (Bank Identification Number) that is allowed for transaction. JSON Array Optional
    type?: 'authorize';       // Used as preauthorization feature. Valid value: authorize. String(255) Optional
    save_token_id?: boolean;  // Used on 'One Click' or 'Two Clicks' feature. Boolean Optional
    channel?: 'dragon' | 'mti' | 'migs' | 'cybersource' | 'braintree' | 'mpgs'; // Used to route transaction to specific channel. String(255) Optional
  }