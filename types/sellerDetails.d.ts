import { Address } from "./address";

export interface SellerDetails {
  id?: string; // Seller's ID. String(255) Optional
  name?: string; // Seller's name. String(255) Optional
  email?: string; // Seller's email. String(255) Optional
  url?: string; // Seller's HTTP URL. String(255) Optional
  address?: Address; // Seller's address. JSON Array Optional
}
