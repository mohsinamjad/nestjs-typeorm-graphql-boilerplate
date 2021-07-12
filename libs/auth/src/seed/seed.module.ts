import { Module } from '@nestjs/common';
import { UserSeed } from './pre-auth';
import { CommandModule } from 'nestjs-command';
import { RoleModule } from '../resources/role/role.module';
import { UserModule } from '../resources/user/user.module';

@Module({
  imports: [CommandModule, UserModule, RoleModule],
  providers: [UserSeed],
  exports: [UserSeed],
})
export class SeedModule {}
