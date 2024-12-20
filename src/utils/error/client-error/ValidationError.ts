import { CustomErrorOptions } from "../error.types.js";
import { ClientError } from "./ClientError.js";

export class ValidationError extends ClientError {
  /**
   * Constructor for the ValidationError class.
   *
   * @param message - (required)
   * @param data - (optional)
   */
  constructor(message: string, data?: Record<string, unknown>) {
    const options: CustomErrorOptions = {
      message,
      httpStatus: 422,
      errorCode: "VALIDATION_ERROR",
      data,
    };

    super(options);

    this.name = "ValidationError";
    Object.setPrototypeOf(this, new.target.prototype);
  }
}
