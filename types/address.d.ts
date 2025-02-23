export interface Address {
    first_name?: string; // Customer's first name. String(255) Optional
    last_name?: string;  // Customer's last name. String(255) Optional
    phone?: string;      // Customer's phone number. String(255) Optional
    address?: string;    // Customer's address. String(255) Optional
    city?: string;       // City of the address. String(255) Optional
    postal_code?: string; // Postal code of the address. String(255) Optional
    country_code?: string; // Country ID of the address. String(3) Optional
  }