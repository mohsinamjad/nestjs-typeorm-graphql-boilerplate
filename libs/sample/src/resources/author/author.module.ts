import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthorController } from './author.controller';
import { AuthorRepository } from './author.repository';
import { AuthorResolver } from './author.resolver';
import { AuthorService } from './author.service';

@Module({
  imports: [
    /**
     *  With that in place, we can inject the AuthorRepository into the AuthorService
     *  using the @InjectRepository() decorator:
     */
    TypeOrmModule.forFeature([
      // Repo or Entity
      AuthorRepository,
    ]),
  ],
  providers: [AuthorResolver, AuthorService],
  controllers: [AuthorController],
})
export class AuthorModule {}
