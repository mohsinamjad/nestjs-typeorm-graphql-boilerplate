import { Test, TestingModule } from '@nestjs/testing';
import { Connection } from "typeorm";
import { RoleRepository } from "../role/role.repository";
import { UserRepository } from "./user.repository";
import { UserService } from './user.service';

describe('UserService', () => {
  let service: UserService;
   const mockConnection = () => ({
     // creating mock function
     transaction: jest.fn(),
   });

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UserService,
        UserRepository,
        RoleRepository,
        {
          provide: Connection,
          useFactory: mockConnection,
        },
      ],
    }).compile();

    service = module.get<UserService>(UserService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
