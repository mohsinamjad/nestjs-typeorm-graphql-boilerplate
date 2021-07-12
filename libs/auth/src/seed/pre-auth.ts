import { Command } from 'nestjs-command';
import { Injectable } from '@nestjs/common';
import { RoleService } from '../resources/role/role.service';
import { UserService } from '../resources/user/user.service';

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
    console.log('********* CREATING ROLE ************');
    const roles = ['ADMIN', 'USER'];
    const rolesMap = {};
    for (const role of roles) {
      rolesMap[role] = await this.roleService.create({
        name: role,
      });
    }
    console.log('********* CREATING ADMIN USER ************');
    await this.userService.create({
      name: 'Mohsin',
      email: 'mohsinamjad51@gmail.com',
      password: 'password',
      roles: [rolesMap['ADMIN']],
    });
  }
}
