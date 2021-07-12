import { Action } from '@libs/auth/constants';
import { CaslAbility, CurrentUser } from '@libs/auth/decorators/current-user';
import { JwtAuthGuard } from '@libs/auth/guards/jwt-auth-guard';
import { UnauthorizedException, UseGuards } from '@nestjs/common';
import {
  Args,
  Int,
  Mutation,
  Query,
  ResolveField,
  Resolver,
  Root,
} from '@nestjs/graphql';
import { Connection } from 'typeorm';
import Role from '../role/role.entity';
import { CreateUserInput, UpdateUserInput } from './dto/user.dto';
import User from './user.entity';
import { UserService } from './user.service';

@UseGuards(JwtAuthGuard)
@Resolver(() => User)
export class UserResolver {
  constructor(
    private readonly userService: UserService,
    private connection: Connection,
  ) {}

  @Query(() => User)
  whoAmI(@CurrentUser() user: User) {
    return this.userService.findOne({ where: { id: user?.id } });
  }

  @Query(() => [User])
  async users(): Promise<User[]> {
    return this.userService.findAll();
  }

  @Mutation(() => User)
  async createUser(
    @Args('data') user: CreateUserInput,
    @CaslAbility() ability,
  ): Promise<User> {
    if (ability.can(Action.Create, 'user')) {
      return this.userService.create(user);
    } else {
      throw new UnauthorizedException();
    }
  }

  @Mutation(() => User)
  async updateUser(
    @Args('data') user: UpdateUserInput,
    @CaslAbility() ability,
  ): Promise<User> {
    const userInstance = this.connection.manager.create(User, user);
    if (ability.can(Action.Update, userInstance)) {
      return this.userService.update(user);
    } else {
      throw new UnauthorizedException();
    }
  }

  @Mutation(() => Int)
  async deleteUser(
    @Args('id') id: number,
    @CaslAbility() ability,
  ): Promise<number> {
    const userInstance = this.connection.manager.create(User, { id });
    if (ability.can(Action.Delete, userInstance)) {
      return this.userService.delete(id);
    } else {
      throw new UnauthorizedException();
    }
  }

  @ResolveField()
  async roles(@Root() root: User): Promise<Role[]> {
    const { roles } = await this.userService.findOne({
      relations: ['roles'],
      where: {
        id: root.id,
      },
    });
    return roles;
  }
}
