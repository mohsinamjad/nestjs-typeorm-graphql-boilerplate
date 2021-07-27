import { Test, TestingModule } from '@nestjs/testing';
import { Connection } from "typeorm";
import { RoleRepository } from "../role/role.repository";
import { UserRepository } from "./user.repository";
import { UserResolver } from './user.resolver';
import { UserService } from './user.service';

describe('UserResolver', () => {
  let resolver: UserResolver;
   const mockConnection = () => ({
     // creating mock function
     transaction: jest.fn(),
   });

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UserResolver,
        UserService,
        UserRepository,
        RoleRepository,
        {
          provide: Connection,
          useFactory: mockConnection,
        },
      ],
    }).compile();

    resolver = module.get<UserResolver>(UserResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
