import { JwtService } from "@nestjs/jwt";
import { Test, TestingModule } from '@nestjs/testing';
import { Connection } from "typeorm";
import { AuthService } from './auth.service';
import { RoleRepository } from "./resources/role/role.repository";
import { UserRepository } from "./resources/user/user.repository";
import { UserService } from "./resources/user/user.service";

describe('AuthService', () => {
  let service: AuthService;
   const mockConnection = () => ({
     // creating mock function
     transaction: jest.fn(),
   });

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthService,
        UserService,
        UserRepository,
        RoleRepository,
        {
          provide: JwtService,
          useFactory: mockConnection
        },
        {
          provide: Connection,
          useFactory: mockConnection,
        },
      ],
    }).compile();

    service = module.get<AuthService>(AuthService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
