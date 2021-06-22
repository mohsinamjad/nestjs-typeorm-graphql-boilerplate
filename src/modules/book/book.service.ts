import { Injectable } from '@nestjs/common';
import { Connection } from 'typeorm';
import Book from './book.entity';

@Injectable()
export class BookService {
  constructor(private connection: Connection) {}

  async findAll(): Promise<Book[]> {
    return this.connection.manager.find(Book);
  }
}
