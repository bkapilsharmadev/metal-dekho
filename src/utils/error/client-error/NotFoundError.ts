import { CustomErrorOptions } from "../error.types.js";
import { ClientError } from "./ClientError.js";

export class NotFoundError extends ClientError {
  /**
   * Constructor for NotFoundError.
   *
   * @param message - (required)
   * @param data - (optional)
   */

  constructor(message: string, data?: Record<string, unknown>) {
    const options: CustomErrorOptions = {
      message: message,
      httpStatus: 404,
      errorCode: "NOT_FOUND",
      data: data,
    };
    super(options);

    this.name = "NotFoundError";
    Object.setPrototypeOf(this, new.target.prototype);
  }
}
