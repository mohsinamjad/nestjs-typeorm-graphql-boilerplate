import { Injectable } from '@nestjs/common';
import User from './user.entity';
import { UserRepository } from './user.repository';
import { CreateUserInput, UpdateUserInput } from './dto/user.dto';
import * as bcrypt from 'bcryptjs';

@Injectable()
export class UserService {
  constructor(private userRepository: UserRepository) {}

  async findAll(options = {}): Promise<User[]> {
    return this.userRepository.find(options);
  }

  async findOne(options = {}): Promise<User> {
    return this.userRepository.findOne(options);
  }

  async create(user: CreateUserInput): Promise<User> {
    const hashedPassword = await bcrypt.hash(user.password, 12);
    const hashedUser = { ...user, password: hashedPassword };
    const createdUser = await this.userRepository.create(hashedUser);
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
