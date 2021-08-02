import { Test, TestingModule } from '@nestjs/testing';
import { getConnectionToken } from '@nestjs/typeorm';
import { Connection } from 'typeorm';
import { CategoryResolver } from '../category.resolver';
import { CategoryService } from '../category.service';

describe('CategoryService', () => {
  let service: CategoryService;

  beforeEach(async () => {
    const mockedConnection = jest.fn().mockImplementation(() => Connection);

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CategoryResolver,
        CategoryService,
        {
          provide: getConnectionToken(),
          useValue: mockedConnection,
        },
      ],
    }).compile();

    service = module.get<CategoryService>(CategoryService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
