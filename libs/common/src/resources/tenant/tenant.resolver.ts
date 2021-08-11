import { BaseResolver } from '@libs/common';
import { Resolver } from '@nestjs/graphql';
import { CreateTenantInput } from './dto/create-tenant.input';
import { UpdateTenantInput } from './dto/update-tenant.input';
import Tenant from './tenant.entity';
import { TenantService } from './tenant.service';

@Resolver(() => Tenant)
export class TenantResolver extends BaseResolver(
  Tenant,
  CreateTenantInput,
  UpdateTenantInput,
) {
  constructor(private readonly service: TenantService) {
    super(service);
  }
}
