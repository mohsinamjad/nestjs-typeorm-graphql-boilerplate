import { InputType, Field } from 'type-graphql';
import Book from '../../book/book.entity';
import Author from '../author.entity';
import { CreateBookInputWithoutAuthor } from '../../book/dto/book.dto';

@InputType({ description: 'new author data' })
export class CreateAuthorInput implements Partial<Author> {
  @Field()
  name: string;

  @Field({ nullable: true })
  phone?: string;

  @Field(() => [CreateBookInputWithoutAuthor], { nullable: true })
  books?: Book[];
}

@InputType({ description: 'update author data' })
export class UpdateAuthorInput implements Partial<Author> {
  @Field({ nullable: false })
  id: number;

  @Field({ nullable: true })
  name?: string;

  @Field({ nullable: true })
  phone?: string;
}
