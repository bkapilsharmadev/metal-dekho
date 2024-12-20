import { DatabaseError } from "./DatabaseError.js";

export class TransactionError extends DatabaseError {
  /**
   * Provides a custom error for transaction errors.
   *
   * @param transactionId - (required)
   * @param message - (optional) Defaults to 'Transaction ${transactionId} failed to commit.'
   * @param data - (optional)
   */
  constructor(
    transactionId: string,
    message?: string,
    data?: Record<string, unknown>,
  ) {
    const options = {
      message: message ?? `Transaction ${transactionId} failed to commit.`,
      httpStatus: 500,
      errorCode: "TRANSACTION_ERROR",
      data: { transactionId, ...data },
    };

    super(options);

    this.name = "TransactionError";
    Object.setPrototypeOf(this, new.target.prototype);
  }
}
