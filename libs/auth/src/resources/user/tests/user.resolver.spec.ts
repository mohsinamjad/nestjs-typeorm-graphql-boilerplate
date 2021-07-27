import { Test, TestingModule } from '@nestjs/testing';
import { getConnectionToken } from '@nestjs/typeorm';
import { Connection } from 'typeorm';
import { RoleRepository } from '../../role/role.repository';
import { UserRepository } from '../user.repository';
import { UserResolver } from '../user.resolver';
import { UserService } from '../user.service';

describe('UserResolver', () => {
  let resolver: UserResolver;

  beforeEach(async () => {
    const mockedConnection = jest.fn().mockImplementation(() => Connection);

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UserService,
        UserRepository,
        UserResolver,
        RoleRepository,
        {
          provide: getConnectionToken(),
          useValue: mockedConnection,
        },
      ],
    }).compile();

    resolver = module.get<UserResolver>(UserResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
