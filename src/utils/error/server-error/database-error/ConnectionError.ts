import { CustomErrorOptions } from "../../error.types.js";
import { DatabaseError } from "./DatabaseError.js";

export class ConnectionError extends DatabaseError {
  /**
   * Creates an instance of `ConnectionError`.
   *
   * @param options - {@link CustomErrorOptions} An object containing error details:
   *  - `message` (required): A descriptive message for the error.
   *  - `httpStatus` (optional): The HTTP status code. Default is `503`.
   *  - `errorCode` (optional): A specific error code. Default is `"CONNECTION_ERROR"`.
   *  - `data` (optional): Additional contextual information about the error.
   */

  constructor({
    message,
    httpStatus = 503,
    errorCode,
    data,
  }: CustomErrorOptions) {
    super({
      message,
      httpStatus,
      errorCode: errorCode ?? "CONNECTION_ERROR",
      data,
    });

    this.name = "ConnectionError";
    Object.setPrototypeOf(this, new.target.prototype);
  }
}
