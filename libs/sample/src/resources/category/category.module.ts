import { TenantModule } from '@libs/common/resources/tenant/tenant.module';
import { Module } from '@nestjs/common';
import { CategoryResolver } from './category.resolver';
import { CategoryService } from './category.service';

@Module({
  imports: [TenantModule],
  providers: [CategoryResolver, CategoryService],
})
export class CategoryModule {}
