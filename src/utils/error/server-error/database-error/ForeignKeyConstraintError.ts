import { DatabaseError } from "./DatabaseError.js";
import { CustomErrorOptions } from "../../error.types.js";

export class ForeignKeyConstraintError extends DatabaseError {
  /**
   * Provides a custom error for foreign key constraint violations.
   *
   * @param table - The table where the foreign key constraint was violated.
   * @param constraint - The name of the violated constraint.
   *  `Foreign key constraint error on table ${table} with constraint ${constraint}`.
   * @param data - (Optional) Additional contextual information.
   */
  constructor(
    table: string,
    constraint: string,
    data?: Record<string, unknown>,
  ) {
    const options: CustomErrorOptions = {
      message: `Foreign key constraint error on table ${table} with constraint ${constraint}`,
      httpStatus: 400,
      errorCode: "FOREIGN_KEY_CONSTRAINT",
      data: { table, constraint, ...data }, // Merge additional data if provided
    };

    super(options); // Pass constructed error details to the parent class

    this.name = "ForeignKeyConstraintError";
    Object.setPrototypeOf(this, new.target.prototype);
  }
}
