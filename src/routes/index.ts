import { FastifyPluginAsync } from "fastify";

/* eslint-disable @typescript-eslint/require-await */
const routes: FastifyPluginAsync = async (fastify) => {
  fastify.get("/", async (request, reply) => {
    request.log.info("Debugging root endpoint", {
      user: { id: 1, name: "Alice" },
      session: { id: "abc123", ip: "1231234123", userAgent: "Chrome" },
    });
    return { message: "Hello, Fastify! Kapil" };
  });

  fastify.get("/health", async (request, reply) => {
    return { status: "ok", uptime: process.uptime() };
  });
};

export default routes;
