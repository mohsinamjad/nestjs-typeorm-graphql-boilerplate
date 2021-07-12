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
import { CreateRoleInput, UpdateRoleInput } from './dto/role.dto';
import Role from './role.entity';
import { RoleService } from './role.service';

@UseGuards(JwtAuthGuard)
@UseInterceptors(DurationInterceptor)
@Controller('role')
export class RoleController {
  constructor(private readonly roleService: RoleService) {}

  @Get()
  async getRole(@CaslAbility() ability): Promise<Role[]> {
    if (ability.can(Action.Read, 'role')) {
      return this.roleService.findAll();
    } else {
      throw new UnauthorizedException();
    }
  }

  @Get(':id')
  async findOne(
    @Param('id', ParseIntPipe) id: number,
    @CaslAbility() ability,
  ): Promise<Role> {
    if (ability.can(Action.Read, 'role')) {
      return this.roleService.findOne({ id });
    } else {
      throw new UnauthorizedException();
    }
  }

  @Post('create')
  async create(
    @Body(new ClassValidationPipe()) role: CreateRoleInput,
    @CaslAbility() ability,
  ): Promise<Role> {
    if (ability.can(Action.Create, 'role')) {
      return this.roleService.create(role);
    } else {
      throw new UnauthorizedException();
    }
  }

  @Put(':id')
  async updateThis(
    @Param('id', ParseIntPipe) id: number,
    @Body() role: UpdateRoleInput,
    @CaslAbility() ability,
  ): Promise<Role> {
    if (ability.can(Action.Update, 'role')) {
      return this.roleService.update(role);
    } else {
      throw new UnauthorizedException();
    }
  }

  @Delete(':id')
  async delete(
    @Param('id', ParseIntPipe) id: number,
    @CaslAbility() ability,
  ): Promise<number> {
    if (ability.can(Action.Delete, 'role')) {
      return this.roleService.delete(id);
    } else {
      throw new UnauthorizedException();
    }
  }
}
