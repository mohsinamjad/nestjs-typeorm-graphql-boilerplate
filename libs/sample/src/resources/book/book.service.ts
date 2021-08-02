import { Injectable } from '@nestjs/common';
import { plainToClass } from 'class-transformer';
import { Connection, getManager } from 'typeorm';
import { BookCategory } from '../bookCategory/book-category-entity';
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

  async create(bookData: CreateBookInputWithAuthor): Promise<Book> {
    return await getManager().transaction(
      async (transactionalEntityManager) => {
        const transformed = plainToClass(Book, bookData);
        const { bookCategories, ...book } = transformed;
        const bookInstance = await transactionalEntityManager.save(Book, book);
        if (bookCategories.length) {
          await transactionalEntityManager.save(
            BookCategory,
            bookCategories.map((bookCategory) => {
              return {
                ...bookCategory,
                book: bookInstance,
              };
            }),
          );
        }
        return bookInstance;
      },
    );
  }

  async update(book: UpdateBookInput): Promise<Book> {
    return await this.connection.manager.save(Book, book);
  }

  async delete(id: number, softDelete = false): Promise<number> {
    if (!softDelete) {
      const { affected } = await this.connection.manager.delete(Book, { id });
      return affected;
    }
  }
}
