import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PropertyRepository } from './property.repository';
import { PropertyResolver } from './property.resolver';
import { PropertyService } from './property.service';

@Module({
  imports: [
    /**
     *  With that in place, we can inject the PropertyRepository into the PropertyService
     *  using the @InjectRepository() decorator:
     */
    TypeOrmModule.forFeature([
      // Repo or Entity
      PropertyRepository,
    ]),
  ],
  providers: [PropertyResolver, PropertyService],
  exports: [PropertyService],
})
export class PropertyModule {}
