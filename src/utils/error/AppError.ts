/**
 * @internal
 * Represents a custom application error with HTTP status codes, error codes, and additional data.
 */

export class AppError extends Error {
  /**
   * The HTTP status code associated with the error.
   * @type {number}
   */
  public httpStatus: number;

  /**
   * An optional error code that can be used to identify the error.
   * @type {string}
   */
  public errorCode?: string;

  /**
   * An optional data object that can be used to provide additional information about the error.
   * @type {Record<string, unknown>}
   */
  public data?: Record<string, unknown>;

  /**
   * Creates a new instance of the AppError class.
   * @param {string} message The error message.
   * @param {number} httpStatus The HTTP status code.
   * @param {string} [errorCode] An optional error code.
   * @param {Record<string, unknown>} [data] An optional data object.
   */
  constructor(
    message: string,
    httpStatus: number,
    errorCode?: string,
    data?: Record<string, unknown>,
  ) {
    super(message);
    this.httpStatus = httpStatus;
    this.errorCode = errorCode;
    this.data = data;

    Object.setPrototypeOf(this, new.target.prototype);
  }

  /**
   *
   * @returns {Object} Returns a JSON representation of the error.
   */
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
