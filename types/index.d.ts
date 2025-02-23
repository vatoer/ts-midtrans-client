// Re-export all types from the "types" directory
export * from "./action";
export * from "./address";
export * from "./bankTransfer";
export * from "./cStore";
export * from "./creditCard";
export * from "./customExpiry";
export * from "./customerDetails";
export * from "./eChannel";
export * from "./goPay";
export * from "./item";
export * from "./notification";
export * from "./parameter";
export * from "./payment";
export * from "./qris";
export * from "./schedule";
export * from "./sellerDetails";
export * from "./shopeePay";
export * from "./transaction";
export * from "./transactionDetails";
export * from "./vaNumber";

// Import all core modules
import { Snap } from "./lib/snap";
import CoreApi from "./lib/coreApi";
import Iris from "./lib/iris";
import { MidtransError } from "./lib/midtransError";
import SnapBiConfig from "./lib/snapBi/snapBiConfig";
import SnapBi from "./lib/snapBi/snapBi";

// Define Midtrans as an object containing all modules
export declare const Midtrans: {
  Snap: typeof Snap;
  CoreApi: typeof CoreApi;
  Iris: typeof Iris;
  MidtransError: typeof MidtransError;
  SnapBiConfig: typeof SnapBiConfig;
  SnapBi: typeof SnapBi;
};

// Export all core modules individually
export { Snap, CoreApi, Iris, MidtransError, SnapBiConfig, SnapBi };

// Set default export for easier import in JS/TS projects
export default Midtrans;
