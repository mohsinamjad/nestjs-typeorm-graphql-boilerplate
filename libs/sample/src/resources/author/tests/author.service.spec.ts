import { Test, TestingModule } from '@nestjs/testing';
import { AuthorRepository } from '../author.repository';
import { AuthorResolver } from '../author.resolver';
import { AuthorService } from '../author.service';

describe('AuthorService', () => {
  let service: AuthorService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AuthorService, AuthorResolver, AuthorRepository],
    }).compile();

    service = module.get<AuthorService>(AuthorService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
