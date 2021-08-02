import {
  Args,
  Int,
  Mutation,
  Query,
  ResolveField,
  Resolver,
  Root,
} from '@nestjs/graphql';
import Book from '../book/book.entity';
import Category from './category.entity';
import { CategoryService } from './category.service';
import { CreateCategoryInput, UpdateCategoryInput } from './dto/category.dto';

@Resolver(() => Category)
export class CategoryResolver {
  constructor(private readonly categoryService: CategoryService) {}

  @Query(() => [Category])
  async categories(): Promise<Category[]> {
    return this.categoryService.findAll();
  }

  @Mutation(() => Category)
  async createCategory(
    @Args('data') category: CreateCategoryInput,
  ): Promise<Category> {
    return this.categoryService.create(category);
  }

  @Mutation(() => Category)
  async updateCategory(
    @Args('data') category: UpdateCategoryInput,
  ): Promise<Category> {
    return this.categoryService.update(category);
  }

  @Mutation(() => Int)
  async deleteCategory(@Args('id') id: number): Promise<number> {
    return this.categoryService.delete(id);
  }

  @ResolveField(() => [Book])
  async books(@Root() root: Category): Promise<Book[]> {
    const { books } = await this.categoryService.findOne({
      relations: ['books'],
      where: {
        id: root.id,
      },
    });
    return books;
  }
}
