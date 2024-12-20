import { CustomErrorOptions } from "../error.types.js";
import { ClientError } from "./ClientError.js";

export class AuthenticationError extends ClientError {
  /**
   * Constructs a new instance of the `AuthenticationError` class.
   *
   * @param message - (required) A descriptive message for the error.
   * @param data - (optional) Additional contextual information about the error.
   */

  constructor(message: string, data?: Record<string, unknown>) {
    const options: CustomErrorOptions = {
      message,
      httpStatus: 401,
      errorCode: "AUTHENTICATION_ERROR",
      data,
    };

    super(options);

    this.name = "AuthenticationError";
    Object.setPrototypeOf(this, new.target.prototype);
  }
}
