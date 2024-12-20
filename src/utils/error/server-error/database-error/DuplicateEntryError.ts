import { DatabaseError } from "./DatabaseError.js";
import { CustomErrorOptions } from "../../error.types.js";

export class DuplicateEntryError extends DatabaseError {
  /**
   * Creates an instance of `DuplicateEntryError`.
   *
   * @param field - The name of the field that has the duplicate entry.
   * @param value - The value that is duplicated.
   * @param additionalData - (Optional) Additional contextual information about the error.
   */
  constructor(
    field: string,
    value: string,
    additionalData?: Record<string, unknown>,
  ) {
    const options: CustomErrorOptions = {
      message: `Duplicate entry '${value}' for key '${field}'`,
      httpStatus: 409,
      errorCode: "DUPLICATE_ENTRY",
      data: { field, value, ...additionalData }, // Merge additional data
    };

    super(options); // Pass the constructed error details to the parent class

    this.name = "DuplicateEntryError";
    Object.setPrototypeOf(this, new.target.prototype);
  }
}
