import { TENANT_CONNECTION } from '@libs/common/resources/tenant/tenant.module';
import { Inject, Injectable } from '@nestjs/common';
import * as bcrypt from 'bcryptjs';
import { keyBy } from 'lodash';
import { Repository } from 'typeorm';
import Role from '../role/role.entity';
import { CreateUserInput, UpdateUserInput } from './dto/user.dto';
import User from './user.entity';

@Injectable()
export class UserService {
  private roleRepository: Repository<Role>;
  private userRepository: Repository<User>;

  constructor(@Inject(TENANT_CONNECTION) private connection) {
    this.roleRepository = connection.getRepository(Role);
    this.userRepository = connection.getRepository(User);
  }

  async findAll(options = {}): Promise<User[]> {
    return this.userRepository.find(options);
  }

  async findOne(options = {}): Promise<User> {
    return this.userRepository.findOne(options);
  }

  async create(user: CreateUserInput): Promise<User> {
    const rolesResult = await this.roleRepository.find();
    const mappedRoles = keyBy(rolesResult, 'name');
    const { password, roles, ...rest } = user;
    const hashedPassword = await bcrypt.hash(password, 12);
    const transformedUser = {
      ...rest,
      password: hashedPassword,
      roles: (roles || [{ name: 'User' }]).map(
        (role) => mappedRoles[role.name],
      ),
    };
    const createdUser = await this.userRepository.create(transformedUser);
    const result = await this.userRepository.save(createdUser);
    return result;
  }

  async update(user: UpdateUserInput): Promise<User> {
    return await this.userRepository.save(user);
  }

  async delete(id: number, softDelete = false): Promise<number> {
    if (!softDelete) {
      const { affected } = await this.userRepository.delete({ id });
      return affected;
    }
  }
}
