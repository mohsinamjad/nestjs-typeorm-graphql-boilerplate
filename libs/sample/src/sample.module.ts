import { Module } from '@nestjs/common';
import { AuthorModule } from './resources/author/author.module';
import { BookModule } from './resources/book/book.module';
import { PropertyModule } from './resources/property/property.module';

@Module({
  imports: [BookModule, AuthorModule, PropertyModule],
  providers: [],
  exports: [BookModule, AuthorModule, PropertyModule],
})
export class SampleModule {}
