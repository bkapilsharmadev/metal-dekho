import { AppError } from "../AppError.js";
import { CustomErrorOptions } from "../error.types.js";

export class ServerError extends AppError {
  /**
   * Creates an instance of `ServerError`.
   *
   * @param options - {@link ErrorOptions} An object containing error details:
   *   - `message` (required): A descriptive message for the error.
   *   - `httpStatus` (optional): The HTTP status code. Default is `500`.
   *   - `errorCode` (optional): A specific error code. Default is `"SERVER_ERROR"`.
   *   - `data` (optional): Additional contextual information about the error.
   */

  constructor({
    message,
    httpStatus = 500,
    errorCode,
    data,
  }: CustomErrorOptions) {
    super({
      message,
      httpStatus,
      errorCode: errorCode ?? "SERVER_ERROR",
      data,
    });
    this.name = "ServerError";
    Object.setPrototypeOf(this, new.target.prototype);
  }
}
