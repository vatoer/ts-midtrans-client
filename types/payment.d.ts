export interface PaymentAmount {
    paid_at: string; // Date and time when the payment was made. String Required
    amount: string;  // Amount paid. String Required
  }
  
  export type PaymentAmounts = PaymentAmount[]; // Array of PaymentAmount objects. JSON Array Required