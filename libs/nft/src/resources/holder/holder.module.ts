import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { HolderRepository } from './holder.repository';
import { HolderResolver } from './holder.resolver';
import { HolderService } from './holder.service';

@Module({
  imports: [
    /**
     *  With that in place, we can inject the HolderRepository into the HolderService
     *  using the @InjectRepository() decorator:
     */
    TypeOrmModule.forFeature([
      // Repo or Entity
      HolderRepository,
    ]),
  ],
  providers: [HolderResolver, HolderService],
})
export class HolderModule {}
