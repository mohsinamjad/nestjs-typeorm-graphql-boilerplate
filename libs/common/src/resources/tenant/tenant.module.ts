import { Module, Scope } from '@nestjs/common';
import { REQUEST } from '@nestjs/core';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Connection, getConnection } from 'typeorm';
import Tenant from './tenant.entity';
import { TenantRepository } from './tenant.repository';
import { TenantResolver } from './tenant.resolver';
import { TenantService } from './tenant.service';

export const TENANT_CONNECTION = 'TENANT_CONNECTION';
@Module({
  imports: [TypeOrmModule.forFeature([TenantRepository])],
  providers: [
    {
      provide: TENANT_CONNECTION,
      inject: [REQUEST, Connection],
      scope: Scope.REQUEST,
      useFactory: async (request, connection) => {
        const tenant: Tenant = await connection.getRepository(Tenant).findOne({
          where: { name: (request?.req || request)?.headers?.tenant },
        });
        const conn = tenant
          ? getConnection(tenant.name)
          : getConnection('default');
        return conn;
      },
    },
    TenantResolver,
    TenantService,
  ],
  exports: [TENANT_CONNECTION],
})
export class TenantModule {}
