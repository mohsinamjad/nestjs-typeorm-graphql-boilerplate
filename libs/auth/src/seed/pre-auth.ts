import { Command } from 'nestjs-command';
import { Injectable } from '@nestjs/common';
import { RoleService } from '../resources/role/role.service';
import { UserService } from '../resources/user/user.service';
import { logger } from '@libs/common/logger';

@Injectable()
export class UserSeed {
  constructor(
    private readonly userService: UserService,
    private readonly roleService: RoleService,
  ) {}

  @Command({
    command: 'create:pre-auth',
    describe: 'creates two roles and one admin user',
    autoExit: true,
  })
  async create() {
    logger.info('********* CREATING ROLE ************');
    const roles = ['ADMIN', 'USER'];
    const rolesMap = {};
    for (const role of roles) {
      rolesMap[role] = await this.roleService.create({
        name: role,
      });
    }
    logger.info('********* CREATING ADMIN USER ************');
    await this.userService.create({
      name: 'Admin',
      email: 'superadmin@gmail.com',
      password: 'password',
      roles: [rolesMap['ADMIN']],
    });
  }
}
