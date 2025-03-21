/**
 * This module is responsible for building the Fastify app instance.
 * - It adds request id and logger to the request object.
 * - Registers hooks, plugins and routes.
 *
 * @module app
 */

import Fastify, { FastifyInstance } from "fastify";
import requestIdHook from "@hooks/request-id";
import customErrorHandler from "@plugins/error-handler";
import routes from "@routes/v1/index";

export const buildApp = (): FastifyInstance => {
  const app = Fastify({ logger: false });

  // Register hooks
  app.register(requestIdHook);

  // Register plugins
  app.register(customErrorHandler);

  // Register routes
  app.register(routes);

  return app;
};
