/**
 * This is the entry point of the application.
 *
 * @module index
 */

import { buildApp } from "./app";
import { APP_PORT, APP_HOST } from "@src/config/env.config";
import { connectMongoWithRetry } from "./database/mongodb/mongoose-conn";

const startServer = async () => {
  const app = buildApp();

  try {
    await connectMongoWithRetry();
    await app.listen({ port: Number(APP_PORT) });
    console.log(`Server is running on http://${APP_HOST}:${APP_PORT}`);
  } catch (err) {
    app.log.error(err);
    process.exit(1);
  }
};

startServer().catch((err: unknown) => {
  console.error("Failed to start server:", err);
});
