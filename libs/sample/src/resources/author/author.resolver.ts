import {
  Args,
  ResolveField,
  Int,
  Mutation,
  Query,
  Resolver,
  Root,
} from '@nestjs/graphql';
import Book from '../book/book.entity';
import Author from './author.entity';
import { AuthorService } from './author.service';
import { CreateAuthorInput, UpdateAuthorInput } from './dto/author.dto';

@Resolver(() => Author)
export class AuthorResolver {
  constructor(private readonly authorService: AuthorService) {}

  @Query(() => [Author])
  async authors(): Promise<Author[]> {
    return this.authorService.findAll();
  }

  @Mutation(() => Author)
  async createAuthor(@Args('data') author: CreateAuthorInput): Promise<Author> {
    return this.authorService.create(author);
  }

  @Mutation(() => Author)
  async updateAuthor(@Args('data') author: UpdateAuthorInput): Promise<Author> {
    return this.authorService.update(author);
  }

  @Mutation(() => Int)
  async deleteAuthor(@Args('id') id: number): Promise<number> {
    return this.authorService.delete(id);
  }

  @ResolveField()
  async books(@Root() root: Author): Promise<Book[]> {
    const { books } = await this.authorService.findOne({
      relations: ['books'],
      where: {
        id: root.id,
      },
    });
    return books;
  }

  @ResolveField()
  async virtualField(@Root() root: Author): Promise<number> {
    return root.id;
  }
}

// function createResolver<T extends ClassType, X extends ClassType>(
//   suffix: string,
//   returnType: T,
//   inputType: X,
//   entity: any,
//   middleware?: Middleware<any>[],
// ) {
//   @Resolver()
//   class BaseResolver {
//     @Mutation(() => returnType, { name: `create${suffix}` })
//     @UseMiddleware(...(middleware || []))
//     async create(@Arg('data', () => inputType) data: any) {
//       return entity.create(data).save();
//     }
//   }

//   return BaseResolver;
// }

// // export const CreateProductResolver = createResolver(
// //   "Product",
// //   Product,
// //   ProductInput,
// //   Product
// // );
