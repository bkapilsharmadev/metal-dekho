import { DatabaseError } from "./DatabaseError.js";

export class QuerySyntaxError extends DatabaseError {
  /**
   * Provides a custom error for SQL query syntax errors.
   *
   * @param query - (required)
   * @param message - (optional) Default: "Syntax error in SQL query"
   * @param data - (optional)
   */
  constructor(query: string, message?: string, data?: Record<string, unknown>) {
    const options = {
      message: message ?? "Syntax error in SQL query",
      httpStatus: 400,
      errorCode: "QUERY_SYNTAX_ERROR",
      data: { query, ...data },
    };

    super(options);

    this.name = "QuerySyntaxError";
    Object.setPrototypeOf(this, new.target.prototype);
  }
}
