import { BaseResolver } from '@libs/common';
import { ResolveField, Resolver, Root } from '@nestjs/graphql';
import Book from '../book/book.entity';
import Author from './author.entity';
import { AuthorService } from './author.service';
import { CreateAuthorInput, UpdateAuthorInput } from './dto/author.dto';

@Resolver(() => Author)
export class AuthorResolver extends BaseResolver(
  Author,
  CreateAuthorInput,
  UpdateAuthorInput,
) {
  constructor(private readonly authorService: AuthorService) {
    super(authorService);
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
