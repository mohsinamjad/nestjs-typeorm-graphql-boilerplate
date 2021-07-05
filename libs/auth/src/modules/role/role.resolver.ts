import { JwtAuthGuard } from '@libs/auth/guards/jwt-auth-guard';
import { UseGuards } from '@nestjs/common';
import { Args, Int, Mutation, Query, Resolver } from '@nestjs/graphql';
import { CreateRoleInput, UpdateRoleInput } from './dto/role.dto';
import Role from './role.entity';
import { RoleService } from './role.service';

@UseGuards(JwtAuthGuard)
@Resolver(() => Role)
export class RoleResolver {
  constructor(private readonly roleService: RoleService) {}

  @Query(() => [Role])
  async roles(): Promise<Role[]> {
    return this.roleService.findAll();
  }

  @Mutation(() => Role)
  async createRole(@Args('data') role: CreateRoleInput): Promise<Role> {
    return this.roleService.create(role);
  }

  @Mutation(() => Role)
  async updateRole(@Args('data') role: UpdateRoleInput): Promise<Role> {
    return this.roleService.update(role);
  }

  @Mutation(() => Int)
  async deleteRole(@Args('id') id: number): Promise<number> {
    return this.roleService.delete(id);
  }
}
