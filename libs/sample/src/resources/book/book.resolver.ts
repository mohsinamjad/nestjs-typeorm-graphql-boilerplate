import {
  Args,
  Int,
  Mutation,
  Query,
  ResolveField,
  Resolver,
  Root,
} from '@nestjs/graphql';
import Category from '../category/category.entity';
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
    @Args('data') book: CreateBookInputWithAuthor,
  ): Promise<Book> {
    return this.bookService.create(book);
  }

  @Mutation(() => Book)
  async updateBook(@Args('data') book: UpdateBookInput): Promise<Book> {
    return this.bookService.update(book);
  }

  @Mutation(() => Int)
  async deleteBook(@Args('id') id: number): Promise<number> {
    return this.bookService.delete(id);
  }

  @ResolveField(() => [Category])
  async categories(@Root() root: Book): Promise<Category[]> {
    const { categories } = await this.bookService.findOne({
      relations: ['categories'],
      where: {
        id: root.id,
      },
    });
    return categories;
  }
}
