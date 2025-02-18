import Role, { IRole } from "@models/role.model";

class RoleRepository {
  async create(data: Partial<IRole>): Promise<IRole> {
    const role = new Role(data);
    return await role.save();
  }

  async findAll(): Promise<IRole[]> {
    return await Role.find();
  }
}
