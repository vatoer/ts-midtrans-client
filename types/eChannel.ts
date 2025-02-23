export interface EChannel {
    bill_info1: string; // Label 1. Mandiri allows only 10 characters. String(255) Required
    bill_info2: string; // Value for Label 1. Mandiri allows only 30 characters. String(255) Required
    bill_info3?: string; // Label 2. Mandiri allows only 10 characters. String(255) Optional
    bill_info4?: string; // Value for Label 2. Mandiri allows only 30 characters. String(255) Optional
    bill_info5?: string; // Label 3. Mandiri allows only 10 characters. String(255) Optional
    bill_info6?: string; // Value for Label 3. Mandiri allows only 30 characters. String(255) Optional
    bill_info7?: string; // Label 4. Mandiri allows only 10 characters. String(255) Optional
    bill_info8?: string; // Value for Label 4. Mandiri allows only 30 characters. String(255) Optional
    bill_key?: string; // Custom bill key assigned by you. String(6-12) Optional
  }