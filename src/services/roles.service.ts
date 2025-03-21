import RoleRepository from "@src/repositories/roles.repository";
import { IRole } from "@src/models/role.model";
import { FastifyBaseLogger } from "fastify";
import { CreateRoleDTO, UpdateRoleDTO } from "@src/schemas/role.schema";

import { AnyBulkWriteOperation } from "mongoose";
import { HydratedDocument } from "mongoose";

const RoleService = {
  createRole: async (
    data: CreateRoleDTO,
    logger: FastifyBaseLogger,
  ): Promise<IRole> => {
    logger.info("Creating a new role");
    return await RoleRepository.create(data);
  },

  createRoles: async (data: Partial<IRole>[]): Promise<IRole[]> => {
    return await RoleRepository.createMany(data);
  },

  getAllRoles: async (logger: FastifyBaseLogger): Promise<IRole[]> => {
    logger.info("Fetching all roles");
    return await RoleRepository.findAll();
  },

  getRoleById: async (
    id: string,
    logger: FastifyBaseLogger,
  ): Promise<IRole | null> => {
    logger.info(`Service: Fetching role with ID ${id}`);
    return await RoleRepository.findById(id);
  },

  updateRole: async (
    id: string,
    data: UpdateRoleDTO,
    logger: FastifyBaseLogger,
  ): Promise<IRole | null> => {
    logger.info(`Service: Updating role with ID ${id}`);

    try {
      const bulkOperations: AnyBulkWriteOperation<HydratedDocument<IRole>>[] =
        [];

      // Update description if provided
      if (data.description) {
        bulkOperations.push({
          updateOne: {
            filter: { _id: id },
            update: { $set: { description: data.description } },
          },
        });
      }

      // Handle permissions (add/remove)
      if (data.permissionsToAdd?.length) {
        bulkOperations.push({
          updateOne: {
            filter: { _id: id },
            update: {
              $addToSet: { permissions: { $each: data.permissionsToAdd } },
            },
          },
        });
      }

      if (data.permissionsToRemove?.length) {
        bulkOperations.push({
          updateOne: {
            filter: { _id: id },
            update: {
              $pull: { permissions: { $in: data.permissionsToRemove } },
            },
          },
        });
      }

      // Delegate to repository
      if (bulkOperations.length > 0) {
        await RoleRepository.bulkUpdate(bulkOperations);
      }

      // Return the updated role
      return await RoleRepository.findById(id);
    } catch (error) {
      logger.error(
        `Error updating role ID ${id}: ${error instanceof Error ? error.message : String(error)}`,
      );
      throw new Error(
        `Failed to update role: ${error instanceof Error ? error.message : String(error)}`,
      );
    }
  },

  deleteRole: async (
    id: string,
    logger: FastifyBaseLogger,
  ): Promise<IRole | null> => {
    logger.info(`Service: Deleting role with ID ${id}`);
    return await RoleRepository.delete(id);
  },
};

export default RoleService;
