import { BullModule } from '@nestjs/bull';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthorModule } from '../author/author.module';
import Book from './book.entity';
import { BookProcessor } from './book.processor';
import { BookResolver } from './book.resolver';
import { BookService } from './book.service';
import { BookSubscriber } from './book.subscriber';

@Module({
  imports: [
    TypeOrmModule.forFeature([Book]),
    BullModule.registerQueue({
      name: 'book',
    }),
    AuthorModule,
  ],
  providers: [BookResolver, BookService, BookSubscriber, BookProcessor],
})
export class BookModule {}
