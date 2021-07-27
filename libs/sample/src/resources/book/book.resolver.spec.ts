import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from "@nestjs/typeorm";
import { Connection, Repository } from "typeorm";
import Book from "./book.entity";
import { BookResolver } from './book.resolver';
import { BookService } from "./book.service";

describe('BookResolver', () => {
  let resolver: BookResolver;
      const mockConnection = () => ({
        // creating mock function
        transaction: jest.fn(),
      });

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        BookResolver,
        BookService,
        {
          provide: Connection,
          useFactory: mockConnection,
        },
      ],
    }).compile();

    resolver = module.get<BookResolver>(BookResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
