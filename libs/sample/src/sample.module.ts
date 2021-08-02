import { Module } from '@nestjs/common';
import { AuthorModule } from './resources/author/author.module';
import { BookModule } from './resources/book/book.module';
import { BookCategoryModule } from './resources/bookCategory/book-category.module';
import { CategoryModule } from './resources/category/category.module';
import { PropertyModule } from './resources/property/property.module';

@Module({
  imports: [
    BookModule,
    AuthorModule,
    PropertyModule,
    CategoryModule,
    BookCategoryModule,
  ],
  providers: [],
  exports: [BookModule, AuthorModule, PropertyModule],
})
export class SampleModule {}
