import Author from '@libs/sample/resources/author/author.entity';
import { AuthorRepository } from '@libs/sample/resources/author/author.repository';
import { AuthorService } from '@libs/sample/resources/author/author.service';
import { INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Connection, Repository } from 'typeorm';
import {
  defaultMockedRepo,
  mockConnection,
  mockedConnectionProvider,
} from './utils';

describe('App (e2e)', () => {
  let app: INestApplication;
  let authorService: AuthorService;
  // declaring the repo variable for easy access later
  let authorRepo: Repository<Author>;
  let authorRepo2: AuthorRepository;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthorService,
        {
          // how you provide the injection token in a test instance
          provide: getRepositoryToken(Author),
          // as a class value, Repository needs no generics
          // useValue: defaultMockedRepo(),
          // useClass: Repository,
          useValue: defaultMockedRepo(),
        },
        mockedConnectionProvider(),
      ],
    }).compile();
    authorService = module.get<AuthorService>(AuthorService);
    authorRepo = module.get<Repository<Author>>(getRepositoryToken(Author));
    authorRepo2 = module.get<AuthorRepository>(AuthorRepository);
    // authorRepo = module.get<AuthorRepository>(AuthorRepository);
    console.log({ authorRepo, authorRepo2 });
  });

  afterAll(async () => {
    await app.close();
  });

  describe('AuthorModule', () => {
    it('should get Author', async () => {
      const mock = [{ id: 1, name: 'mohsin' }];
      jest.spyOn(authorRepo, 'find').mockReturnValue([mock] as any);

      await expect(authorService.findAll()).toBe(mock);
      await expect(authorService.findAll()).resolves.not.toThrowError();
    });
  });
});
