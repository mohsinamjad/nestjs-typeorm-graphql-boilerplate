import { Action } from '@libs/auth/constants';
import { CaslAbility } from '@libs/auth/decorators/current-user';
import { JwtAuthGuard } from '@libs/auth/guards/jwt-auth-guard';
import { UnauthorizedException, UseGuards } from '@nestjs/common';
import { Args, Int, Mutation, Query, Resolver } from '@nestjs/graphql';
import { CreateRoleInput, UpdateRoleInput } from './dto/role.dto';
import Role from './role.entity';
import { RoleService } from './role.service';

@UseGuards(JwtAuthGuard)
@Resolver(() => Role)
export class RoleResolver {
  constructor(private readonly roleService: RoleService) {}

  @Query(() => [Role])
  async roles(@CaslAbility() ability): Promise<Role[]> {
    if (ability.can(Action.Read, 'role')) {
      return this.roleService.findAll();
    } else {
      throw new UnauthorizedException();
    }
  }

  @Mutation(() => Role)
  async createRole(
    @Args('data') role: CreateRoleInput,
    @CaslAbility() ability,
  ): Promise<Role> {
    if (ability.can(Action.Create, 'role')) {
      return this.roleService.create(role);
    } else {
      throw new UnauthorizedException();
    }
  }

  @Mutation(() => Role)
  async updateRole(
    @Args('data') role: UpdateRoleInput,
    @CaslAbility() ability,
  ): Promise<Role> {
    if (ability.can(Action.Update, 'role')) {
      return this.roleService.update(role);
    } else {
      throw new UnauthorizedException();
    }
  }

  @Mutation(() => Int)
  async deleteRole(
    @Args('id') id: number,
    @CaslAbility() ability,
  ): Promise<number> {
    if (ability.can(Action.Delete, 'role')) {
      return this.roleService.delete(id);
    } else {
      throw new UnauthorizedException();
    }
  }
}
