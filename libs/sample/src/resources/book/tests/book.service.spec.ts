import { Test, TestingModule } from '@nestjs/testing';
import { getConnectionToken } from '@nestjs/typeorm';
import { Connection } from 'typeorm';
import { BookResolver } from '../book.resolver';
import { BookService } from '../book.service';

describe('BookService', () => {
  let service: BookService;

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

    service = module.get<BookService>(BookService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
