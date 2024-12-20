/**
 * This is the entry point of the application.
 *
 * @module index
 */

import { buildApp } from "./app.js";
import { APP_PORT, APP_HOST } from "@config/env.config.js";

const startServer = async () => {
  const app = buildApp();

  try {
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
