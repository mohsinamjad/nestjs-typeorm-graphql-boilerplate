import { Test, TestingModule } from '@nestjs/testing';
import { getConnectionToken } from '@nestjs/typeorm';
import { Connection } from 'typeorm';
import { BookResolver } from '../book.resolver';
import { BookService } from '../book.service';

describe('BookResolver', () => {
  let resolver: BookResolver;

  beforeEach(async () => {
    const mockedConnection = jest.fn().mockImplementation(() => Connection);
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        BookResolver,
        BookService,
        {
          provide: getConnectionToken(),
          useValue: mockedConnection,
        },
      ],
    }).compile();

    resolver = module.get<BookResolver>(BookResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
