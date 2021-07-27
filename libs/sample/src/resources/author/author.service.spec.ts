import { Test, TestingModule } from '@nestjs/testing';
import { AuthorService } from './author.service';
import { AuthorRepository } from './author.repository';
import { AuthorModule } from "./author.module";
import { getRepositoryToken, TypeOrmModule } from "@nestjs/typeorm";
import Author from "./author.entity";
import { Connection, Repository } from "typeorm";

describe('AuthorService', () => {
  let service: AuthorService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthorService,
        AuthorRepository,
      ],
    }).compile();

    service = module.get<AuthorService>(AuthorService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
