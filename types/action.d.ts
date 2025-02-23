export interface Action {
    name: string;   // Action name. String Required
    method: string; // HTTP method used for the action. String Required
    url: string;    // HTTP URL target for the action. String Required
    fields?: string[]; // Parameters which can be sent for the action. Only for HTTP methods other than GET. Array(String) Conditional
  }