import { Injectable } from '@nestjs/common';
import { CreateRoleInput, UpdateRoleInput } from './dto/role.dto';
import Role from './role.entity';
import { RoleRepository } from './role.repository';

@Injectable()
export class RoleService {
  constructor(private roleRepository: RoleRepository) {}

  async findAll(options = {}): Promise<Role[]> {
    return this.roleRepository.find(options);
  }

  async findOne(options = {}): Promise<Role> {
    return this.roleRepository.findOne(options);
  }

  async create(role: CreateRoleInput): Promise<Role> {
    const createdRole = await this.roleRepository.create(role);
    const result = await this.roleRepository.save(createdRole);
    return result;
  }

  async update(role: UpdateRoleInput): Promise<Role> {
    return await this.roleRepository.save(role);
  }

  async delete(id: number, softDelete = false): Promise<number> {
    if (!softDelete) {
      const { affected } = await this.roleRepository.delete({ id });
      return affected;
    }
  }
}
