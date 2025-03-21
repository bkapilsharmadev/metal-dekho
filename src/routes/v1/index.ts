import { FastifyPluginAsync } from "fastify";
import roleRoutes from "@src/routes/v1/roles.routes";

/* eslint-disable @typescript-eslint/require-await */
const routes: FastifyPluginAsync = async (fastify) => {
  fastify.get("/api/v1", async (request, reply) => {
    return { status: "Running", message: "API version v1 is live." };
  });

  fastify.get("/api/v1/health", async (request, reply) => {
    return { status: "ok", uptime: process.uptime() };
  });

  fastify.register(roleRoutes, { prefix: "/api/v1" });
};

export default routes;
