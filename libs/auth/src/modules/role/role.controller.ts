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
  UseGuards,
} from '@nestjs/common';
import Role from './role.entity';
import { RoleService } from './role.service';
import { CreateRoleInput, UpdateRoleInput } from './dto/role.dto';
import { Roles } from '@libs/auth/decorators/roles';
import { JwtAuthGuard } from '@libs/auth/guards/jwt-auth-guard';
import { RolesGuard } from '@libs/auth/guards/roles-guard';

@Controller('role')
export class RoleController {
  constructor(private readonly roleService: RoleService) {}

  @Roles('ADMIN')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @UseInterceptors(DurationInterceptor)
  @Get()
  async getRole(): Promise<Role[]> {
    return this.roleService.findAll();
  }

  @UseInterceptors(DurationInterceptor)
  @Get(':id')
  async findOne(@Param('id', ParseIntPipe) id: number): Promise<Role> {
    return this.roleService.findOne({ id });
  }

  @UseInterceptors(DurationInterceptor)
  @Post('create')
  async create(
    @Body(new ClassValidationPipe()) role: CreateRoleInput,
  ): Promise<Role> {
    return this.roleService.create(role);
  }

  @UseInterceptors(DurationInterceptor)
  @Put(':id')
  async updateThis(
    @Param('id', ParseIntPipe) id: number,
    @Body() role: UpdateRoleInput,
  ): Promise<Role> {
    return this.roleService.update(role);
  }

  @UseInterceptors(DurationInterceptor)
  @Delete(':id')
  async delete(@Param('id', ParseIntPipe) id: number): Promise<number> {
    return this.roleService.delete(id);
  }
}
