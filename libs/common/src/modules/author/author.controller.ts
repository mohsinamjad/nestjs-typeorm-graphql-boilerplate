import { ClassValidationPipe } from '@lib/common/pipes';
import { DurationInterceptor } from '@lib/common/interceptors/duration-interceptor';
import {
  Controller,
  Get,
  Body,
  Param,
  ParseIntPipe,
  UseInterceptors,
  Post,
  Put,
  Delete,
} from '@nestjs/common';
import Author from './author.entity';
import { AuthorService } from './author.service';
import { CreateAuthorInput, UpdateAuthorInput } from './dto/author.dto';

@Controller('author')
export class AuthorController {
  constructor(private readonly authorService: AuthorService) {}

  @UseInterceptors(DurationInterceptor)
  @Get()
  async getAuthor(): Promise<Author[]> {
    return this.authorService.findAll();
  }

  @UseInterceptors(DurationInterceptor)
  @Get(':id')
  async findOne(@Param('id', ParseIntPipe) id: number): Promise<Author> {
    return this.authorService.findOne({ id });
  }

  @UseInterceptors(DurationInterceptor)
  @Post('create')
  async create(
    @Body(new ClassValidationPipe()) author: CreateAuthorInput,
  ): Promise<Author> {
    console.log({ author });
    return this.authorService.create(author);
  }

  @UseInterceptors(DurationInterceptor)
  @Put(':id')
  async updateThis(
    @Param('id', ParseIntPipe) id: number,
    @Body() author: UpdateAuthorInput,
  ): Promise<Author> {
    return this.authorService.update(author);
  }

  @UseInterceptors(DurationInterceptor)
  @Delete(':id')
  async delete(@Param('id', ParseIntPipe) id: number): Promise<number> {
    return this.authorService.delete(id);
  }
}
