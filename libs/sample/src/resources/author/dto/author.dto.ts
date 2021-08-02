import { InputType, Field } from '@nestjs/graphql';
import Book from '../../book/book.entity';
import Author from '../author.entity';
import { CreateBookInputWithoutAuthor } from '../../book/dto/book.dto';
import { IsString, IsInt, IsOptional } from 'class-validator';

@InputType({ description: 'new author data' })
export class CreateAuthorInput implements Partial<Author> {
  @IsString()
  @Field()
  name: string;

  @IsOptional()
  @IsString()
  @Field({ nullable: true })
  phone?: string;

  @Field(() => [CreateBookInputWithoutAuthor], { nullable: true })
  books?: Book[];
}

@InputType({ description: 'author connect' })
export class AuthorConnectInput implements Partial<Author> {
  @IsInt()
  @Field({ nullable: false })
  id: number;
}

@InputType({ description: 'update author data' })
export class UpdateAuthorInput implements Partial<Author> {
  @IsInt()
  @Field({ nullable: false })
  id: number;

  @IsString()
  @Field({ nullable: true })
  name?: string;

  @IsString()
  @Field({ nullable: true })
  phone?: string;
}
