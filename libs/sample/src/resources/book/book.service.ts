import { Injectable } from '@nestjs/common';
import { Connection } from 'typeorm';
import Author from '../author/author.entity';
import Book from './book.entity';
import { CreateBookInputWithAuthor, UpdateBookInput } from './dto/book.dto';

@Injectable()
export class BookService {
  constructor(private connection: Connection) {}

  async findAll(): Promise<Book[]> {
    return this.connection.manager.find(Book);
  }

  async findOne(options = {}): Promise<Book> {
    return this.connection.manager.findOne(Book, options);
  }

  async create(book: CreateBookInputWithAuthor): Promise<Book> {
    const { author, ...rest } = book;
    const createdAuthor = await this.connection.manager.save(Author, author);
    const payload = { ...rest, author: createdAuthor };
    const createdBook = await this.connection.manager.create(Book, payload);
    const result = await this.connection.manager.save(Book, createdBook);
    return result;
  }

  async update(book: UpdateBookInput): Promise<Book> {
    return await this.connection.manager.save(Book, book);
  }

  async delete(id: number, softDelete = false): Promise<number> {
    if (!softDelete) {
      const book = await this.connection.manager.findOne(Book, {
        where: { id },
        relations: ['author'],
      });
      if (!book) return 0;
      const response = await this.connection.manager.remove(Book, [book]);
      return response?.length || 0;
    }
  }
}
