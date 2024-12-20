import { CustomErrorOptions } from "./error.types";

export class AppError extends Error {
  public httpStatus?: number;
  public errorCode?: string;
  public data?: Record<string, unknown>;

  /**
   * @param options - {@link ErrorOptions} An object containing error details:
   *   - `message` (required): A descriptive message for the error.
   *   - `httpStatus` (optional): The HTTP status code. Default is `500`.
   *   - `errorCode` (optional): A specific error code for categorization.
   *   - `data` (optional): Additional contextual information about the error.
   */
  constructor({
    message,
    httpStatus = 500,
    errorCode,
    data,
  }: CustomErrorOptions) {
    super(message);
    this.httpStatus = httpStatus;
    this.errorCode = errorCode;
    this.data = data;

    this.name = "AppError";
    Object.setPrototypeOf(this, new.target.prototype);
  }

  public toJSON() {
    return {
      name: this.name,
      message: this.message,
      errorCode: this.errorCode,
      httpStatus: this.httpStatus,
      data: this.data,
      stack: this.stack,
    };
  }
}
