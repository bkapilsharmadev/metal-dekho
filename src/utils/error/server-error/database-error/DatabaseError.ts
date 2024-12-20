import { CustomErrorOptions } from "../../error.types.js";
import { ServerError } from "../ServerError.js";

export class DatabaseError extends ServerError {
  /**
   * Creates an instance of `DatabaseError`.
   *
   * @param options - ${@link CustomErrorOptions} An object containing error details:
   *  - `message` (required): A descriptive message for the error.
   *  - `httpStatus` (optional): The HTTP status code. Default is `500`.
   *  - `errorCode` (optional): A specific error code. Default is `"DATABASE_ERROR"`.
   *  - `data` (optional): Additional contextual information about the error.
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
      errorCode: errorCode ?? "DATABASE_ERROR",
      data,
    });

    this.name = "DatabaseError";
    Object.setPrototypeOf(this, new.target.prototype);
  }
}
