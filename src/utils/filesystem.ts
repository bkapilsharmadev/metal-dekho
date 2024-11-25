import { promises as fs } from "fs";

/**
 * Ensures that a directory exists. If the directory does not exist, it will be created.
 *
 * - Uses `fs.mkdir` with the `{ recursive: true }` option to create parent directories if needed.
 * - Handles the case where the directory already exists gracefully.
 *
 * @param {string} dirPath - The path of the directory to ensure exists.
 * @returns {Promise<void>} Resolves when the directory exists or is created.
 * @throws {NodeJS.ErrnoException} If an error other than "EEXIST" occurs.
 */
const ensureLogDirExists = async (dirPath: string): Promise<void> => {
  try {
    await fs.mkdir(dirPath, { recursive: true });
  } catch (err) {
    const error = err as NodeJS.ErrnoException;
    if (error.code !== "EEXIST") {
      throw err;
    }
  }
};

export { ensureLogDirExists };
