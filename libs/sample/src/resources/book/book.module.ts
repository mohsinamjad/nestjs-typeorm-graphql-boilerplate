import { TenantModule } from '@libs/common/resources/tenant/tenant.module';
import { Module } from '@nestjs/common';
import { BookResolver } from './book.resolver';
import { BookService } from './book.service';

@Module({
  imports: [TenantModule],
  providers: [BookResolver, BookService],
})
export class BookModule {}
