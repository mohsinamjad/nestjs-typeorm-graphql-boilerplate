import { Controller, Get } from '@nestjs/common';
import Book from './book.entity';
import { BookService } from './book.service';

@Controller('book')
export class BookController {
  constructor(private readonly bookService: BookService) {}

  @Get()
  async getBooks(): Promise<Book[]> {
    return this.bookService.findAll();
  }
}
