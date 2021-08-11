import { TenantModule } from '@libs/common/resources/tenant/tenant.module';
import { Module } from '@nestjs/common';
import { AuthorController } from './author.controller';
import { AuthorRepository } from './author.repository';
import { AuthorResolver } from './author.resolver';
import { AuthorService } from './author.service';

@Module({
  imports: [TenantModule],
  providers: [AuthorResolver, AuthorService, AuthorRepository],
  controllers: [AuthorController],
})
export class AuthorModule {}
