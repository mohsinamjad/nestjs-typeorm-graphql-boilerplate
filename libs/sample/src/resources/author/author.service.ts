import { BaseService } from '@libs/common/base/base-service';
import { TENANT_CONNECTION } from '@libs/common/resources/tenant/tenant.module';
import { Inject, Injectable } from '@nestjs/common';
import Author from './author.entity';

@Injectable()
export class AuthorService extends BaseService<Author> {
  constructor(@Inject(TENANT_CONNECTION) private connection) {
    super(connection.getRepository(Author));
  }
}
