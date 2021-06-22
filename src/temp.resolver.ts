import { Query, Resolver } from 'type-graphql';

@Resolver()
export class AppResolver {
  @Query(() => String)
  sayHello(): string {
    return 'Hello World!';
  }
}
