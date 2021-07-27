import { Test, TestingModule } from '@nestjs/testing';
import { Connection } from "typeorm";
import { BookService } from './book.service';

describe('BookService', () => {
  let service: BookService;
    const mockConnection = () => ({
      // creating mock function
      transaction: jest.fn(),
    });

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        BookService,
        {
          provide: Connection,
          useFactory: mockConnection,
        },
      ],
    }).compile();

    service = module.get<BookService>(BookService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
