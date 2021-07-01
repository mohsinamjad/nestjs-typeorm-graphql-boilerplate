import { InputType, Field } from '@nestjs/graphql';
import Author from '../../author/author.entity';
import { CreateAuthorInput } from '../../author/dto/author.dto';
import Book from '../book.entity';

@InputType({ description: 'new book data' })
export class CreateBookInputWithoutAuthor implements Partial<Book> {
  @Field()
  title: string;
}

@InputType({ description: 'new book data' })
export class CreateBookInputWithAuthor implements Partial<Book> {
  @Field()
  title: string;

  @Field(() => CreateAuthorInput, { nullable: false })
  author: Author;
}

@InputType({ description: 'update book data' })
export class UpdateBookInput implements Partial<Book> {
  @Field({ nullable: false })
  title: string;
}
