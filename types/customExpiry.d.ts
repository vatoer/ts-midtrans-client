export interface CustomExpiry {
    order_time: string;       // Order time in the format "YYYY-MM-DD HH:mm:ss Z". String Required
    expiry_duration: number;  // Expiry duration. Integer Required
    unit: 'second' | 'minute' | 'hour' | 'day'; // Unit of the expiry duration. String Required
  }