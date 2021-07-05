import { Action } from '@libs/auth/constants';
import { CaslAbility } from '@libs/auth/decorators/current-user';
import { JwtAuthGuard } from '@libs/auth/guards/jwt-auth-guard';
import { DurationInterceptor } from '@libs/common/interceptors/duration-interceptor';
import { ClassValidationPipe } from '@libs/common/pipes';
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Put,
  UnauthorizedException,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { Connection } from 'typeorm';
import { CreateUserInput, UpdateUserInput } from './dto/user.dto';
import User from './user.entity';
import { UserService } from './user.service';

@UseGuards(JwtAuthGuard)
@UseInterceptors(DurationInterceptor)
@Controller('user')
export class UserController {
  constructor(
    private readonly userService: UserService,
    private connection: Connection,
  ) {}

  @Get()
  async getUser(): Promise<User[]> {
    return this.userService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id', ParseIntPipe) id: number): Promise<User> {
    return this.userService.findOne({ id });
  }

  @Post('create')
  async create(
    @Body(new ClassValidationPipe()) user: CreateUserInput,
    @CaslAbility() ability,
  ): Promise<User> {
    if (ability.can(Action.Create, 'user')) {
      return this.userService.create(user);
    } else {
      throw new UnauthorizedException();
    }
  }

  @Put(':id')
  async updateThis(
    @Param('id', ParseIntPipe) id: number,
    @Body() user: UpdateUserInput,
    @CaslAbility() ability,
  ): Promise<User> {
    const userInstance = this.connection.manager.create(User, user);
    if (ability.can(Action.Update, userInstance)) {
      return this.userService.update(user);
    } else {
      throw new UnauthorizedException();
    }
  }

  @Delete(':id')
  async delete(
    @Param('id', ParseIntPipe) id: number,
    @CaslAbility() ability,
  ): Promise<number> {
    const userInstance = this.connection.manager.create(User, { id });
    if (ability.can(Action.Delete, userInstance)) {
      return this.userService.delete(id);
    } else {
      throw new UnauthorizedException();
    }
  }
}
