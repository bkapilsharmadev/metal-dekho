import Role, { IRole } from "@src/models/role.model";
import { CreateRoleDTO, UpdateRoleDTO } from "@src/schemas/role.schema";
import { AnyBulkWriteOperation } from "mongoose";
import { HydratedDocument } from "mongoose";

const RoleRepository = {
  create: async (role: CreateRoleDTO): Promise<IRole> => {
    return await Role.create(role);
  },

  createMany: async (roles: Partial<IRole>[]): Promise<IRole[]> => {
    return (await Role.insertMany(roles, { lean: true })) as IRole[];
  },

  findAll: async (): Promise<IRole[]> => {
    const roles = await Role.find();
    return roles;
  },

  findById: async (id: string): Promise<IRole | null> => {
    return await Role.findById(id);
  },

  // update: async (
  //   id: string,
  //   updateQuery: {
  //     $addToSet?: { permissions: { $each: string[] } };
  //     $pull?: { permissions: { $in: string[] } };
  //     $set?: { name?: string; description?: string; active?: boolean };
  //   }
  // ): Promise<IRole | null> => {
  //   return await Role.findByIdAndUpdate(id, updateQuery, { new: true });
  // },

  update: async (
    id: string,
    updateQuery: {
      $set?: Partial<Pick<IRole, "name" | "description" | "active">>;
      $addToSet?: { permissions?: { $each: string[] } };
      $pull?: { permissions?: { $in: string[] } };
    },
  ): Promise<IRole | null> => {
    return await Role.findOneAndUpdate(
      { _id: id }, // Find the role by ID
      updateQuery, // Apply updates ($set, $addToSet, $pull)
      { new: true }, // Return the updated document
    );
  },

  bulkUpdate: async (
    bulkOperations: AnyBulkWriteOperation<HydratedDocument<IRole>>[],
  ): Promise<void> => {
    await Role.bulkWrite(bulkOperations);
  },

  delete: async (id: string): Promise<IRole | null> => {
    return await Role.findByIdAndDelete(id);
  },
};

export default RoleRepository;
