import { Arg, Int, Mutation, Query, Resolver } from 'type-graphql';
import Book from './book.entity';
import { BookService } from './book.service';
import { CreateBookInputWithAuthor, UpdateBookInput } from './dto/book.dto';

@Resolver(() => Book)
export class BookResolver {
  constructor(private readonly bookService: BookService) {}

  @Query(() => [Book])
  async books(): Promise<Book[]> {
    return this.bookService.findAll();
  }

  @Mutation(() => Book)
  async createBook(
    @Arg('data') book: CreateBookInputWithAuthor,
  ): Promise<Book> {
    return this.bookService.create(book);
  }

  @Mutation(() => Book)
  async updateBook(@Arg('data') book: UpdateBookInput): Promise<Book> {
    return this.bookService.update(book);
  }

  @Mutation(() => Int)
  async deleteBook(@Arg('id') id: number): Promise<number> {
    return this.bookService.delete(id);
  }
}
