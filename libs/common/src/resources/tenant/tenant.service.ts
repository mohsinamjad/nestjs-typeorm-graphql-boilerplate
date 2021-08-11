import { BaseService } from '@libs/common';
import { Injectable } from '@nestjs/common';
import Tenant from './tenant.entity';
import { TenantRepository } from './tenant.repository';

@Injectable()
export class TenantService extends BaseService<Tenant> {
  constructor(private tenantRepository: TenantRepository) {
    super(tenantRepository);
  }
}
