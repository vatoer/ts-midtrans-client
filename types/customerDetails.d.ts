import { Address } from "./address";

export interface CustomerDetails {
  first_name?: string; // Customer's first name. String(255) Optional
  last_name?: string; // Customer's last name. String(255) Optional
  email?: string; // Customer's email address. String(255) Optional
  phone?: string; // Customer's phone number. String(255) Optional
  billing_address?: Address; // Customer's billing address. JSON Array Optional
  shipping_address?: Address; // Customer's shipping address. JSON Array Optional
}
