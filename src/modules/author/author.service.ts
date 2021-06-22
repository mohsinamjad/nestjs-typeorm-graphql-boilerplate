import { Injectable } from '@nestjs/common';
import Author from './author.entity';
import { AuthorRepository } from './author.repository';
import { AddAuthorInput, UpdateAuthorInput } from './dto/author.dto';

@Injectable()
export class AuthorService {
  constructor(private authorRepository: AuthorRepository) {}

  async findAll(): Promise<Author[]> {
    return this.authorRepository.find();
  }

  async create(author: AddAuthorInput): Promise<Author> {
    const createdAuthor = await this.authorRepository.create(author);
    await this.authorRepository.save(createdAuthor);
    return createdAuthor;
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
