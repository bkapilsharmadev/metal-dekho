import { FastifyPluginAsync } from "fastify";
import fp from "fastify-plugin";

/**
 * A custom error handler plugin for Fastify.
 *
 * - Logs errors using the request's logger for debugging.
 * - Sends a standardized JSON response for all errors.
 * - Defaults to a 500 status code for unhandled errors.
 *
 * @param {import('fastify').FastifyInstance} fastify - The Fastify instance to which the plugin is registered.
 * @param {object} opts - Plugin-specific options (not used in this plugin).
 * @returns {Promise<void>} Resolves when the plugin is successfully registered.
 * @type {FastifyPluginAsync}
 */

/* eslint-disable @typescript-eslint/require-await */
const customErrorHandler: FastifyPluginAsync = async (fastify) => {
  /**
   * Custom error handler for Fastify.
   *
   * - Logs the error details (`message`, `stack`, and `statusCode`) using `request.log.error`.
   * - Sends a consistent JSON response to the client with `success: false` and the error message.
   *
   * @param {Error} error - The error object thrown during request handling.
   * @param {import('fastify').FastifyRequest} request - The incoming HTTP request object.
   * @param {import('fastify').FastifyReply} reply - The outgoing HTTP reply object.
   */
  fastify.setErrorHandler((error, request, reply) => {
    request.log.error({
      error: {
        message: error.message,
        stack: error.stack,
        statusCode: error.statusCode ?? 500,
      },
    });

    reply.status(error.statusCode ?? 500).send({
      success: false,
      error: {
        message: error.message,
      },
    });
  });
};

/**
 * Exports the custom error handler plugin with metadata.
 *
 * - `name`: "custom-error-handler"
 */
export default fp(customErrorHandler, {
  name: "custom-error-handler",
});
