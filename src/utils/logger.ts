/**
 * A custom logger module that provides a Pino logger instance with multiple streams.
 *
 * @module utils/logger
 */

import pino, { DestinationStream } from "pino";
import { multistream } from "pino";
import * as rfs from "rotating-file-stream";
import { ensureLogDirExists } from "./filesystem.js";
import { LOG_DIR, NODE_ENV } from "@config/env.config.js";

// Ensure the logs directory exists
await ensureLogDirExists(LOG_DIR);

/**
 * Creates a rotating file stream for log files. It uses the `rotating-file-stream` package.
 *
 * - Rotates log files after they reach 10MB.
 * - Rotates log files daily.
 * - Compresses rotated log files using gzip.
 * - Stores log files in the directory specified by the LOG_DIR environment variable.
 *
 * @type {rfs.RotatingFileStream}
 */
const rotatingFileStream = rfs.createStream("app.log", {
  size: "10M", // Rotate after 10MB
  interval: "1d", // Rotate daily
  // compress: "gzip", // Compress rotated files
  path: LOG_DIR, // Directory to store logs
});

/**
 * Pretty-print transport for development logs.
 *
 * - Logs are colorized for better readability.
 * - Timestamps are displayed in a standard format.
 * - Fields like `pid` and `hostname` are ignored.
 *
 * @type {DestinationStream}
 */
const prettyTransport = pino.transport({
  target: "pino-pretty",
  options: {
    colorize: true, // Colorize console logs
    translateTime: "SYS:standard", // Format timestamps
    ignore: "pid,hostname", // Omit specific fields
    singleLine: false, // Print each log on a new line
  },
}) as DestinationStream;

/**
 * A multistream logger configuration.
 *
 * - Logs are written to both the console (using `pino-pretty`) and a rotating file stream.
 * - Log levels are set based on the environment (`trace` for development, `info` for production).
 *
 * @type {Array<{ stream: DestinationStream }>}
 */
const streams = [
  { stream: prettyTransport }, // Console logs
  { stream: rotatingFileStream }, // File logs
];

/**
 * A custom Pino logger instance with multiple streams.
 *
 * - Writes logs to the console in a developer-friendly format when not in production.
 * - Writes logs to rotating files for persistent storage.
 * - Log level adjusts dynamically based on the environment (`NODE_ENV`).
 *
 * Usage:
 * ```typescript
 * customLogger.info("This is an informational message.");
 * customLogger.error("This is an error message.");
 * ```
 *
 * @type {Logger}
 *
 *  @see {@link rotatingFileStream}
 */
export const customLogger = pino(
  {
    level: NODE_ENV === "production" ? "info" : "trace",
  },
  multistream(streams),
);
