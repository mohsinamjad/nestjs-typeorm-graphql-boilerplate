import { Test, TestingModule } from '@nestjs/testing';
import { AuthorService } from './author.service';
import { AuthorRepository } from './author.repository';
import { AuthorModule } from "./author.module";
import { getRepositoryToken, TypeOrmModule } from "@nestjs/typeorm";
import Author from "./author.entity";
import { Connection, Repository } from "typeorm";

describe('AuthorService', () => {
  let service: AuthorService;
  let repo;
   const mockConnection = () => ({
     transaction: jest.fn(),
     name: 'mock'
   });

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthorService,
        {
          // how you provide the injection token in a test instance
          provide: getRepositoryToken(Author),
          // as a class value, Repository needs no generics
          useClass: Repository,
        },
      ],
      // imports: [AuthorModule],
    }).compile();

    service = module.get<AuthorService>(AuthorService);
    // repo = module.get<Repository<Author>>(getRepositoryToken(Author));
    // connection = await module.get<Connection>(Connection);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
