/**
 * Type guard to check if a value is an instance of Error.
 * @param err - The value to check.
 * @returns {boolean} - True if it's an instance of Error.
 */
export const isError = (err: unknown): err is Error => {
  return err instanceof Error;
};

/**
 * Type guard to check if an error is a Mongo network error.
 * @param err - The error to check.
 * @returns {boolean} - True if it's a MongoNetworkError.
 */
export const isMongoNetworkError = (
  err: unknown,
): err is Error & { name: "MongoNetworkError" } => {
  return isError(err) && err.name === "MongoNetworkError";
};

/**
 * Type guard to check if an error has a specific name.
 * Useful for handling various named errors in Node.js & external libraries.
 * @param err - The error to check.
 * @param name - Expected error name.
 * @returns {boolean} - True if the error has the expected name.
 */
export const isNamedError = <T extends string>(
  err: unknown,
  name: T,
): err is Error & { name: T } => {
  return isError(err) && err.name === name;
};
