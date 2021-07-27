import { Test, TestingModule } from '@nestjs/testing';
import { getConnectionToken } from '@nestjs/typeorm';
import { Connection } from 'typeorm';
import { RoleRepository } from '../../role/role.repository';
import { UserRepository } from '../user.repository';
import { UserService } from '../user.service';

describe('UserService', () => {
  let service: UserService;

  beforeEach(async () => {
    const mockedConnection = jest.fn().mockImplementation(() => Connection);

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UserService,
        UserRepository,
        RoleRepository,
        {
          provide: getConnectionToken(),
          useValue: mockedConnection,
        },
      ],
    }).compile();

    service = module.get<UserService>(UserService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
