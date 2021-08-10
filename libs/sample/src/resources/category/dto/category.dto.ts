import { Field, InputType } from '@nestjs/graphql';
import { IsInt } from 'class-validator';
import { BookCategory } from '../../bookCategory/book-category.entity';
import { CreateBookCategoryInput } from '../../bookCategory/dto/book-category.dto';
import Category from '../category.entity';

@InputType({ description: 'new category data' })
export class CreateCategoryInput implements Partial<Category> {
  @Field({ nullable: true })
  id: number;

  @Field()
  title: string;
}

@InputType({ description: 'new category data' })
export class CreateCategoryInputWithBridge implements Partial<Category> {
  @Field({ nullable: true })
  id: number;

  @Field()
  title: string;

  @Field(() => CreateBookCategoryInput)
  bookCategory: BookCategory;
}

@InputType({ description: 'update category data' })
export class UpdateCategoryInput implements Partial<Category> {
  @IsInt()
  @Field({ nullable: false })
  id: number;

  @Field({ nullable: false })
  title: string;
}
