import { Module } from '@nestjs/common';
import { TenantModule } from '../../../../common/src/resources/tenant/tenant.module';
import { RoleRepository } from '../role/role.repository';
import { UserController } from './user.controller';
import { UserRepository } from './user.repository';
import { UserResolver } from './user.resolver';
import { UserService } from './user.service';

@Module({
  imports: [TenantModule],
  providers: [UserResolver, UserService, UserRepository, RoleRepository],
  controllers: [UserController],
  exports: [UserService],
})
export class UserModule {}
