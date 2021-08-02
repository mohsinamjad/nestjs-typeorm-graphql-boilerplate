import { Field, InputType } from '@nestjs/graphql';
import Author from '../../author/author.entity';
import { AuthorConnectInput } from '../../author/dto/author.dto';
import { BookCategory } from '../../bookCategory/book-category-entity';
import { CreateThroughBookInput } from '../../bookCategory/dto/book-category.dto';
import Category from '../../category/category.entity';
import { CreateCategoryInput } from '../../category/dto/category.dto';
import Book from '../book.entity';

@InputType({ description: 'new book data' })
export class CreateBookInputWithoutAuthor implements Partial<Book> {
  @Field()
  title: string;

  @Field(() => [CreateCategoryInput], { nullable: false })
  categories: Category[];
}

@InputType({ description: 'new book data' })
export class CreateBookInputWithAuthor implements Partial<Book> {
  @Field()
  title: string;

  @Field(() => AuthorConnectInput, { nullable: false })
  author: Author;

  @Field(() => [CreateThroughBookInput], { nullable: false })
  bookCategories: BookCategory[];
}

@InputType({ description: 'update book data' })
export class UpdateBookInput implements Partial<Book> {
  @Field({ nullable: false })
  title: string;
}
