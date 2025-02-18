/**
 * A custom logger module that provides a Pino logger instance with multiple streams.
 *
 * @module utils/logger
 */

import pino, { DestinationStream } from "pino";
import { multistream } from "pino";
import * as rfs from "rotating-file-stream";
import { ensureLogDirExists } from "./filesystem";
import { LOG_DIR, NODE_ENV } from "@src/config/env.config";

// Ensure the logs directory exists
await ensureLogDirExists(LOG_DIR);

const rotatingFileStream = rfs.createStream("app.log", {
  size: "10M", // Rotate after 10MB
  interval: "1d", // Rotate daily
  // compress: "gzip", // Compress rotated files
  path: LOG_DIR, // Directory to store logs
});

const prettyTransport = pino.transport({
  target: "pino-pretty",
  options: {
    colorize: true, // Colorize console logs
    translateTime: "SYS:standard", // Format timestamps
    ignore: "pid,hostname", // Omit specific fields
    singleLine: false, // Print each log on a new line
  },
}) as DestinationStream;

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
 */
const customLogger = pino(
  {
    level: NODE_ENV === "production" ? "info" : "trace",
  },
  multistream(streams),
);

export const logError = (
  level: "warn" | "error",
  err: unknown,
  msg: string,
) => {
  customLogger[level](
    {
      err:
        err instanceof Error ? { message: err.message, stack: err.stack } : err,
    },
    msg,
  );
};

export default customLogger;
