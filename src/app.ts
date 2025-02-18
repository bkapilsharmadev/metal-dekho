/**
 * This module is responsible for building the Fastify app instance.
 * - It adds request id and logger to the request object.
 * - Registers hooks, plugins and routes.
 *
 * @module app
 */

import Fastify, { FastifyInstance } from "fastify";
import customLogger from "@utils/logger";
import requestIdHook from "@hooks/request-id";
import customErrorHandler from "@plugins/error-handler";
import routes from "@routes/index";
import { nanoid } from "nanoid";
import mongoose from "@database/mongodb/mongoose-conn";
import { time } from "console";

// Connect to MongoDB
const dataDb = mongoose;

/**
 *
 * @returns {FastifyInstance}
 */
export const buildApp = (): FastifyInstance => {
  const app = Fastify({ logger: false });

  // Add request id and logger to request
  app.addHook("onRequest", async (request, reply) => {
    const requestId = nanoid();
    request.id = requestId;
    request.log = customLogger.child({ requestId });
  });

  // Register hooks
  app.register(requestIdHook);

  // Register plugins
  app.register(customErrorHandler);

  // Register routes
  app.register(routes);

  return app;
};
