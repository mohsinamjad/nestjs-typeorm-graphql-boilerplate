import { CurrentUser } from '@libs/auth/decorators/gql-current-user';
import { JwtAuthGuard } from '@libs/auth/guards/jwt-auth-guard';
import { UseGuards } from '@nestjs/common';
import {
  Args,
  Int,
  Mutation,
  Query,
  ResolveField,
  Resolver,
  Root,
} from '@nestjs/graphql';
import Role from '../role/role.entity';
import { CreateUserInput, UpdateUserInput } from './dto/user.dto';
import User from './user.entity';
import { UserService } from './user.service';

@Resolver(() => User)
export class UserResolver {
  constructor(private readonly userService: UserService) {}

  @UseGuards(JwtAuthGuard)
  @Query(() => User)
  whoAmI(@CurrentUser() user: User) {
    return this.userService.findOne({ where: { id: user?.id } });
  }

  @Query(() => [User])
  async users(): Promise<User[]> {
    return this.userService.findAll();
  }

  @Mutation(() => User)
  async createUser(@Args('data') user: CreateUserInput): Promise<User> {
    return this.userService.create(user);
  }

  @Mutation(() => User)
  async updateUser(@Args('data') user: UpdateUserInput): Promise<User> {
    return this.userService.update(user);
  }

  @Mutation(() => Int)
  async deleteUser(@Args('id') id: number): Promise<number> {
    return this.userService.delete(id);
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
