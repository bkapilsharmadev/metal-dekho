import { CustomErrorOptions } from "../error.types.js";
import { ClientError } from "./ClientError.js";

export class AuthorizationError extends ClientError {
  /**
   * Constructor for the AuthorizationError class.
   *
   * @param message - (required)
   * @param data - (optional)
   */
  constructor(message: string, data?: Record<string, unknown>) {
    const options: CustomErrorOptions = {
      message,
      httpStatus: 403,
      errorCode: "AUTHORIZATION_ERROR",
      data,
    };

    super(options);

    this.name = "AuthorizationError";
    Object.setPrototypeOf(this, new.target.prototype);
  }
}
