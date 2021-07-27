import { JwtModule } from '@nestjs/jwt';
import { Test, TestingModule } from '@nestjs/testing';
import { getConnectionToken } from '@nestjs/typeorm';
import { Connection } from 'typeorm';
import { AuthService } from './auth.service';
import { JWT_SECRET } from './constants';
import { RoleRepository } from './resources/role/role.repository';
import { UserRepository } from './resources/user/user.repository';
import { UserService } from './resources/user/user.service';

describe('AuthService', () => {
  let service: AuthService;

  beforeEach(async () => {
    const mockedConnection = jest.fn().mockImplementation(() => Connection);

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        {
          provide: getConnectionToken(),
          useValue: mockedConnection,
        },
        AuthService,
        UserService,
        UserRepository,
        RoleRepository,
      ],
      imports: [
        JwtModule.register({
          secret: JWT_SECRET,
          signOptions: { expiresIn: '10h' },
        }),
      ],
    })
      .overrideProvider(getConnectionToken())
      .useValue(mockedConnection)
      .compile();

    service = module.get<AuthService>(AuthService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
