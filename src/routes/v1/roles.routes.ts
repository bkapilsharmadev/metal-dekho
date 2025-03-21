// routes/role.routes.ts
import { FastifyPluginAsync } from "fastify";
import RoleController from "@src/controllers/roles.controller";

import { createRoleSchema, UpdateRoleSchema } from "@src/schemas/role.schema";

/* eslint-disable @typescript-eslint/require-await */
const roleRoutes: FastifyPluginAsync = async (fastify) => {
  fastify.post(
    "/roles",
    { schema: createRoleSchema },
    RoleController.createRole,
  );
  fastify.put(
    "/roles/:id",
    { schema: UpdateRoleSchema },
    RoleController.updateRole,
  );
  fastify.get("/roles/:id", RoleController.getRoleById);
  fastify.delete("/roles/:id", RoleController.deleteRole);
  fastify.get("/roles", RoleController.getAllRoles);
};

export default roleRoutes;
