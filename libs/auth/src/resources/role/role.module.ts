import { TenantModule } from '@libs/common/resources/tenant/tenant.module';
import { Module } from '@nestjs/common';
import { RoleController } from './role.controller';
import { RoleResolver } from './role.resolver';
import { RoleService } from './role.service';

@Module({
  imports: [TenantModule],
  providers: [RoleResolver, RoleService],
  controllers: [RoleController],
  exports: [RoleService],
})
export class RoleModule {}
