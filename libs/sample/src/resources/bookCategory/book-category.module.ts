import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BookCategory } from './book-category.entity';

@Module({
  imports: [TypeOrmModule.forFeature([BookCategory])],
})
export class BookCategoryModule {}
