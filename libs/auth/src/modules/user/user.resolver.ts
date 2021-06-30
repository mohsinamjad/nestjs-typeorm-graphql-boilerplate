import { Arg, Int, Mutation, Query, Resolver } from 'type-graphql';
import { CreateUserInput, UpdateUserInput } from './dto/user.dto';
import User from './user.entity';
import { UserService } from './user.service';

@Resolver(() => User)
export class UserResolver {
  constructor(private readonly userService: UserService) {}

  @Query(() => [User])
  async users(): Promise<User[]> {
    return this.userService.findAll();
  }

  @Mutation(() => User)
  async createUser(@Arg('data') user: CreateUserInput): Promise<User> {
    return this.userService.create(user);
  }

  @Mutation(() => User)
  async updateUser(@Arg('data') user: UpdateUserInput): Promise<User> {
    return this.userService.update(user);
  }

  @Mutation(() => Int)
  async deleteUser(@Arg('id') id: number): Promise<number> {
    return this.userService.delete(id);
  }
}
