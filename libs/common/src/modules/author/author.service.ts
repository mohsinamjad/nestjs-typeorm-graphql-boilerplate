import { Injectable } from '@nestjs/common';
import Author from './author.entity';
import { AuthorRepository } from './author.repository';
import { CreateAuthorInput, UpdateAuthorInput } from './dto/author.dto';

@Injectable()
export class AuthorService {
  constructor(private authorRepository: AuthorRepository) {}

  async findAll(options = {}): Promise<Author[]> {
    return this.authorRepository.find(options);
  }

  async findOne(options = {}): Promise<Author> {
    return this.authorRepository.findOne(options);
  }

  async create(author: CreateAuthorInput): Promise<Author> {
    const createdAuthor = await this.authorRepository.create(author);
    const result = await this.authorRepository.save(createdAuthor);
    return result;
  }

  async update(author: UpdateAuthorInput): Promise<Author> {
    return await this.authorRepository.save(author);
  }

  async delete(id: number, softDelete = false): Promise<number> {
    if (!softDelete) {
      const { affected } = await this.authorRepository.delete({ id });
      return affected;
    }
  }
}
