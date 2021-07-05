import { Module } from '@nestjs/common';
import { UserSeed } from './pre-auth';
import { CommandModule } from 'nestjs-command';
import { RoleModule } from '../modules/role/role.module';
import { UserModule } from '../modules/user/user.module';

@Module({
  imports: [CommandModule, UserModule, RoleModule],
  providers: [UserSeed],
  exports: [UserSeed],
})
export class SeedModule {}
