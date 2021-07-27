import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import Author from '../author.entity';
import { AuthorRepository } from '../author.repository';
import { AuthorResolver } from '../author.resolver';
import { AuthorService } from '../author.service';

describe('AuthorResolver', () => {
  let resolver: AuthorResolver;
  let service: AuthorService;
  let repo: Repository<Author>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AuthorService, AuthorResolver, AuthorRepository],
    }).compile();

    resolver = module.get<AuthorResolver>(AuthorResolver);
    service = module.get<AuthorService>(AuthorService);
    repo = module.get<Repository<Author>>(getRepositoryToken(Author));
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
    expect(service).toBeDefined();
    expect(repo).toBeDefined();
  });
  it('should return for findAll', async () => {
    // mock file for reuse
    const testAuthor: Author = {
      id: 1,
      name: 'joe',
      phone: '789789787987',
      createdAt: new Date(),
      updatedAt: new Date(),
      books: [],
      virtualField: 1,
    };
    // notice we are pulling the repo variable and using jest.spyOn with no issues
    jest.spyOn(repo, 'find').mockResolvedValueOnce([testAuthor]);
    expect(await service.findAll()).toEqual([testAuthor]);
  });
});
