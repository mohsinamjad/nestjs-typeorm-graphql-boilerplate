import { ClassValidationPipe } from '@libs/common/pipes';
import { DurationInterceptor } from '@libs/common/interceptors/duration-interceptor';
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
import User from './user.entity';
import { UserService } from './user.service';
import { CreateUserInput, UpdateUserInput } from './dto/user.dto';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @UseInterceptors(DurationInterceptor)
  @Get()
  async getUser(): Promise<User[]> {
    return this.userService.findAll();
  }

  @UseInterceptors(DurationInterceptor)
  @Get(':id')
  async findOne(@Param('id', ParseIntPipe) id: number): Promise<User> {
    return this.userService.findOne({ id });
  }

  @UseInterceptors(DurationInterceptor)
  @Post('create')
  async create(
    @Body(new ClassValidationPipe()) user: CreateUserInput,
  ): Promise<User> {
    return this.userService.create(user);
  }

  @UseInterceptors(DurationInterceptor)
  @Put(':id')
  async updateThis(
    @Param('id', ParseIntPipe) id: number,
    @Body() user: UpdateUserInput,
  ): Promise<User> {
    return this.userService.update(user);
  }

  @UseInterceptors(DurationInterceptor)
  @Delete(':id')
  async delete(@Param('id', ParseIntPipe) id: number): Promise<number> {
    return this.userService.delete(id);
  }
}
