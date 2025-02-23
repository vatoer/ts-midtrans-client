export interface Item {
    id?: string;           // Item ID. String Optional
    price: number;         // Price of the item in IDR. Integer Required
    quantity: number;      // Quantity of the item purchased by the customer. Integer Required
    name: string;          // Name of the item. String Required
    brand?: string;        // Brand name of the item. String Optional
    category?: string;     // Category of the item. String Optional
    merchant_name?: string; // Name of the merchant selling the item. String Optional
    tenor?: number;        // Installment term. Integer(2) Conditional
    code_plan?: number;    // Installment code. Integer(3) Conditional
    mid?: number;          // Installment Merchant ID. Integer(9) Conditional
    url?: string;          // HTTP URL of the item in the merchant site. String Optional
  }
  
  export type ItemDetails = Item[];