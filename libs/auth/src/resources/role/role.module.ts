import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RoleController } from './role.controller';
import { RoleRepository } from './role.repository';
import { RoleResolver } from './role.resolver';
import { RoleService } from './role.service';

@Module({
  imports: [
    /**
     *  With that in place, we can inject the RoleRepository into the RoleService
     *  using the @InjectRepository() decorator:
     */
    TypeOrmModule.forFeature([
      // Repo or Entity
      RoleRepository,
    ]),
  ],
  providers: [RoleResolver, RoleService],
  controllers: [RoleController],
  exports: [RoleService],
})
export class RoleModule {}
