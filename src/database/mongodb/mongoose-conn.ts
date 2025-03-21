import mongoose from "mongoose";
import { MONGO_MASTER_URI } from "@config/env.config";
import customLogger, { logError } from "@src/utils/logger";
import { getRetryDelay } from "@src/utils/retry-utils";
import { isMongoNetworkError } from "@src/utils/type-guard";

let reconnectTimeout: NodeJS.Timeout | null = null;
const MAX_RETRIES = 5;
let retries = 0;
let isShuttingDown = false;
let isInitialConnection = true;
let isReconnecting = false;

const connectMongoWithRetry = async (): Promise<void> => {
  if (isShuttingDown) return;

  try {
    await mongoose.connect(MONGO_MASTER_URI, {
      maxPoolSize: 10,
    });

    retries = 0;
    isInitialConnection = false;
    isReconnecting = false;
    customLogger.info("✅ MongoDB connected.");
  } catch (err: unknown) {
    console.log(
      "catch === isMongoNetworkError(err)>>>",
      isMongoNetworkError(err),
    );

    if (retries >= MAX_RETRIES) {
      logError(
        "error",
        err,
        "❌ Max retries reached. MongoDB connection failed.",
      );
      process.exit(1);
    } else if (!isMongoNetworkError(err) || isInitialConnection) {
      logError("error", err, "❌ MongoDB connetion error.");
      process.exit(1);
    }

    retries++;
    isReconnecting = true;

    const delay = getRetryDelay(1000, retries, 30000);
    logError(
      "error",
      err,
      `❌ MongoDB connection attempt ${retries.toString()}/${MAX_RETRIES.toString()} failed.`,
    );

    await new Promise((resolve) => setTimeout(resolve, delay));
    return connectMongoWithRetry();
  }
};

const scheduleReconnect = (reason: string, err?: unknown) => {
  if (isShuttingDown || isReconnecting || isInitialConnection) return;

  isReconnecting = true;

  if (err) {
    logError("error", err, `❌ MongoDB connection error: ${reason}`);
  } else {
    customLogger.warn(`⚠️ MongoDB disconnected: ${reason}`);
  }

  if (reconnectTimeout) clearTimeout(reconnectTimeout);

  reconnectTimeout = setTimeout(() => {
    void connectMongoWithRetry();
    reconnectTimeout = null; // Reset after execution
  }, 1000);
};

//Handle unexpected disconnection
mongoose.connection.on("disconnected", () => {
  scheduleReconnect("disconnected");
});

//Handle connection errors
mongoose.connection.on("error", (err) => {
  scheduleReconnect("error", err);
});

//Handle process termination
const gracefulShutdown = async (): Promise<void> => {
  if (isShuttingDown) return;

  isShuttingDown = true;
  customLogger.info("🔄 Starting graceful shutdown of MongoDB connection...");

  try {
    await mongoose.connection.close(false);
    customLogger.info("✅ MongoDB connection closed.");
  } catch (err: unknown) {
    logError("error", err, "❌ Error closing MongoDB connection.");
  } finally {
    process.exit(0);
  }
};

process.on("SIGINT", () => {
  void (async () => {
    await gracefulShutdown();
    setTimeout(() => process.exit(0), 500); // Ensure logs are flushed
  })();
});

process.on("SIGTERM", () => {
  void (async () => {
    await gracefulShutdown();
    setTimeout(() => process.exit(0), 500);
  })();
});

mongoose.connection.on("connecting", () => {
  customLogger.info("🔄 Connecting to MongoDB...");
});

export default mongoose;
export { connectMongoWithRetry };
