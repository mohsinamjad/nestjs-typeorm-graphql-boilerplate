import { TenantModule } from '@libs/common/resources/tenant/tenant.module';
import { Module } from '@nestjs/common';
import { PropertyRepository } from './property.repository';
import { PropertyResolver } from './property.resolver';
import { PropertyService } from './property.service';

@Module({
  imports: [TenantModule],
  providers: [PropertyResolver, PropertyService, PropertyRepository],
  exports: [PropertyService],
})
export class PropertyModule {}
