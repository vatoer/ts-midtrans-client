import { CustomerDetails } from './customerDetails';
import { ItemDetails } from './item';
import { CreditCard } from './creditCard';
import { BankTransfer } from './bankTransfer';
import { EChannel } from './echannel';
import { TransactionDetails } from './transactionDetails';

// export interface TransactionDetails {
//   order_id: string; // Order ID. String Required
//   gross_amount: number; // Gross amount. Number Required
// }

export interface Callbacks {
  finish?: string; // Finish callback URL. String Optional
}

export interface Expiry {
  start_time: string; // Start time. String Required
  unit: 'second' | 'minute' | 'hour' | 'day'; // Unit of the expiry duration. String Required
  duration: number; // Duration. Number Required
}

export interface Parameter {
  transaction_details: TransactionDetails; // Transaction details. Object Required
  item_details?: ItemDetails; // Item details. Array of Item objects Required
  customer_details?: CustomerDetails; // Customer details. Object Required
  enabled_payments?: string[]; // Enabled payments. Array of strings Optional
  credit_card?: CreditCard; // Credit card details. Object Optional
  bca_va?: BankTransfer; // BCA virtual account details. Object Optional
  bni_va?: BankTransfer; // BNI virtual account details. Object Optional
  permata_va?: BankTransfer; // Permata virtual account details. Object Optional
  echannel?: EChannel; // EChannel details. Object Optional
  callbacks?: Callbacks; // Callbacks. Object Optional
  expiry?: Expiry; // Expiry details. Object Optional
  custom_field1?: string; // Custom field 1. String Optional
  custom_field2?: string; // Custom field 2. String Optional
  custom_field3?: string; // Custom field 3. String Optional
}