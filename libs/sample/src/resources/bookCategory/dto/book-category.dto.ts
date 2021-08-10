import { Field, InputType } from '@nestjs/graphql';
import Category from '../../category/category.entity';
import { CreateCategoryInput } from '../../category/dto/category.dto';
import { BookCategory } from '../book-category.entity';

@InputType({ description: 'new book data' })
export class CreateThroughBookInput implements Partial<BookCategory> {
  @Field()
  isActive: boolean;

  @Field(() => CreateCategoryInput, { nullable: false })
  category: Category;
}

@InputType({ description: 'new book data' })
export class CreateBookCategoryInput implements Partial<BookCategory> {
  @Field()
  isActive: boolean;
}
