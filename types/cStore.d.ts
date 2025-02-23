export interface CStore {
    store: string; // The name of the convenience store. String(20) Required
    message?: string; // Label displayed in Indomaret POS. String(20) Optional
    alfamart_free_text_1?: string; // Customizable first row of text on the Alfamart printed receipt. String(40) Optional
    alfamart_free_text_2?: string; // Customizable second row of text on the Alfamart printed receipt. String(40) Optional
    alfamart_free_text_3?: string; // Customizable third row of text on the Alfamart printed receipt. String(40) Optional
  }