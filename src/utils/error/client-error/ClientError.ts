import { AppError } from "../AppError.js";
import { CustomErrorOptions } from "../error.types.js";

export class ClientError extends AppError {
  /**
   * Constructs a new instance of the `ClientError` class.
   *
   * @param options - ${@link CustomErrorOptions} The error details object.
   *  - `message` (required): A descriptive message for the error.
   *  - `httpStatus` (optional): The HTTP status code. Default is `400`.
   *  - `errorCode` (optional): A specific error code for categorization.
   *  - `data` (optional): Additional contextual information about the error.
   */
  constructor({
    message,
    httpStatus = 400,
    errorCode,
    data,
  }: CustomErrorOptions) {
    super({
      message,
      httpStatus,
      errorCode: errorCode ?? "CLIENT_ERROR",
      data,
    });

    this.name = "ClientError";
    Object.setPrototypeOf(this, new.target.prototype);
  }
}
