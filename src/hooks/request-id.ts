import { nanoid } from "nanoid";
import fp from "fastify-plugin";

/* eslint-disable @typescript-eslint/require-await */
/**
 * A Fastify plugin that adds a unique request ID to every incoming request.
 *
 * - Generates a unique ID using `nanoid`.
 * - Adds the `id` property to the request object for traceability.
 * - Enhances the request logger with the `requestId` property for better logging context.
 *
 * ### Hook Details:
 * - Registers an `onRequest` hook that:
 *   - Generates a unique `requestId` for every request.
 *   - Attaches the `requestId` to the `request` object.
 *   - Enhances the request logger with the `requestId`.
 *
 * @param {import('fastify').FastifyInstance} fastify - The Fastify instance to which the plugin is registered.
 * @param {object} opts - Plugin-specific options (not used in this plugin).
 * @returns {Promise<void>} Resolves when the plugin is successfully registered.
 * @type {import('fastify').FastifyPluginAsync}
 */
export default fp(async (fastify) => {
  fastify.addHook("onRequest", async (request, reply) => {
    const requestId = nanoid();
    request.id = requestId;
    request.log = request.log.child({ requestId });
  });
});
