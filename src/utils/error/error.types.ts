/**
 * Custom error options
 *
 * @param message - (required)
 * @param httpStatus - (optional)
 * @param errorCode - (optional)
 * @param data - (optional)
 */
export interface CustomErrorOptions {
  message: string;
  httpStatus?: number;
  errorCode?: string;
  data?: Record<string, unknown>;
}
