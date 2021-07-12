import { Module } from '@nestjs/common';
import { AuthorModule } from './resources/author/author.module';
import { BookModule } from './resources/book/book.module';

@Module({
  imports: [BookModule, AuthorModule],
  providers: [],
  exports: [BookModule, AuthorModule],
})
export class SampleModule {}
