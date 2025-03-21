import { FastifyRequest, FastifyReply } from "fastify";
import {
  CreateRoleDTO,
  UpdateRoleDTO,
  RoleParamDTO,
} from "@src/schemas/role.schema";
import RoleService from "@src/services/roles.service";

const RoleController = {
  createRole: async (
    req: FastifyRequest<{ Body: CreateRoleDTO }>,
    reply: FastifyReply,
  ) => {
    const role = await RoleService.createRole(req.body, req.log);
    reply.status(201).send(role);
  },

  getAllRoles: async (req: FastifyRequest, reply: FastifyReply) => {
    //logger
    const logger = req.log;
    logger.info("Request ID %s", req.id);
    const roles = await RoleService.getAllRoles(req.log);
    reply.send(roles);
  },

  getRoleById: async (req: FastifyRequest, reply: FastifyReply) => {
    const { id } = req.params as { id: string };
    const role = await RoleService.getRoleById(id, req.log);
    if (!role) return reply.status(404).send({ message: "Role not found" });
    reply.send(role);
  },

  updateRole: async (
    req: FastifyRequest<{ Params: RoleParamDTO; Body: UpdateRoleDTO }>,
    reply: FastifyReply,
  ) => {
    const { id } = req.params;
    const { body } = req;

    const updatedRole = await RoleService.updateRole(id, body, req.log);
    if (!updatedRole) {
      return reply.status(404).send({ message: "Role not found" });
    }
    reply.send(updatedRole);
  },

  deleteRole: async (req: FastifyRequest, reply: FastifyReply) => {
    const { id } = req.params as { id: string };
    const deletedRole = await RoleService.deleteRole(id, req.log);
    if (!deletedRole)
      return reply.status(404).send({ message: "Role not found" });
    reply.send({ message: "Role deleted successfully" });
  },
};

export default RoleController;
