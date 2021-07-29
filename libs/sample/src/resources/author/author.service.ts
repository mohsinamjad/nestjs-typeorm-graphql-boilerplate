import { BaseService } from '@libs/common/base/base-service';
import { Injectable } from '@nestjs/common';
import Author from './author.entity';
import { AuthorRepository } from './author.repository';

@Injectable()
export class AuthorService extends BaseService<Author> {
  constructor(private authorRepository: AuthorRepository) {
    super(authorRepository);
  }
}
