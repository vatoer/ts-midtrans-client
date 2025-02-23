export interface FreeText {
    id?: string; // Free Text ID. String Required
    en?: string; // Free Text EN. String Required
  }
  
  export interface FreeTextObject {
    inquiry?: FreeText[]; // Free texts shown during inquiry. JSON Object Array(10) Optional
    payment?: FreeText[]; // Free texts shown during payment. JSON Object Array(10) Optional
  }
  
  export interface BcaSpecific {
    sub_company_code?: string; // Specific parameters for BCA VA. String Optional
  }
  
  export interface BankTransfer {
    bank: 'permata' | 'bni' | 'bri' | 'bca'; // Bank name which processes bank transfer transaction. String(255) Required
    va_number?: string; // Custom VA number assigned by you. String(255) Optional
    free_text?: FreeTextObject; // List of free texts. JSON Object Array Optional
    bca?: BcaSpecific; // Specific parameters for BCA VA. JSON Object Optional
    permata?: Record<string, unknown>; // Specific parameters for Permata VA. JSON Object Optional
  }