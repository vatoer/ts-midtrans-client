/**
 * Custom HTTP Error Class that also expose httpStatusCode, ApiResponse, rawHttpClientData
 * To expose more info for lib user
 */
export class MidtransError extends Error {
    httpStatusCode: number | null;
    ApiResponse: any;
    rawHttpClientData: any;
  
    constructor(
      message: string,
      httpStatusCode: number | null = null,
      ApiResponse: any = null,
      rawHttpClientData: any = null
    ) {
      super(message);
      // Ensure the name of this error is the same as the class name
      this.name = this.constructor.name;
  
      this.httpStatusCode = httpStatusCode;
      this.ApiResponse = ApiResponse;
      this.rawHttpClientData = rawHttpClientData;
  
      // This clips the constructor invocation from the stack trace.
      Error.captureStackTrace(this, this.constructor);
    }
  }
  