import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RoleRepository } from '../role/role.repository';
import { UserController } from './user.controller';
import { UserRepository } from './user.repository';
import { UserResolver } from './user.resolver';
import { UserService } from './user.service';

@Module({
  imports: [
    /**
     *  With that in place, we can inject the UserRepository into the UserService
     *  using the @InjectRepository() decorator:
     */
    TypeOrmModule.forFeature([
      // Repo or Entity
      UserRepository,
      RoleRepository,
    ]),
  ],
  providers: [UserResolver, UserService],
  controllers: [UserController],
  exports: [UserService],
})
export class UserModule {}
