import { Module } from '@nestjs/common';
import { AuthorModule } from './modules/author/author.module';
import { BookModule } from './modules/book/book.module';

@Module({
  imports: [AuthorModule, BookModule],
  exports: [AuthorModule, BookModule],
})
export class CommonModule {}
