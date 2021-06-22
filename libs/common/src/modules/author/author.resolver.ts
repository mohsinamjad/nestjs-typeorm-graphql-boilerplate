import { Arg, Int, Mutation, Query, Resolver } from 'type-graphql';
import Author from './author.entity';
import { AuthorService } from './author.service';
import { AddAuthorInput, UpdateAuthorInput } from './dto/author.dto';

@Resolver(() => Author)
export class AuthorResolver {
  constructor(private readonly authorService: AuthorService) {}

  @Query(() => [Author])
  async authors(): Promise<Author[]> {
    return this.authorService.findAll();
  }

  @Mutation(() => Author)
  async addAuthor(@Arg('data') author: AddAuthorInput): Promise<Author> {
    return this.authorService.create(author);
  }

  @Mutation(() => Author)
  async updateAuthor(@Arg('data') author: UpdateAuthorInput): Promise<Author> {
    return this.authorService.update(author);
  }

  @Mutation(() => Int)
  async deleteAuthor(@Arg('id') id: number): Promise<number> {
    return this.authorService.delete(id);
  }
}
