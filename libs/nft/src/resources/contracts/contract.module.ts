import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ContractRepository } from './contract.repository';
import { ContractResolver } from './contract.resolver';
import { ContractService } from './contract.service';

@Module({
  imports: [
    /**
     *  With that in place, we can inject the ContractRepository into the ContractService
     *  using the @InjectRepository() decorator:
     */
    TypeOrmModule.forFeature([
      // Repo or Entity
      ContractRepository,
    ]),
  ],
  providers: [ContractResolver, ContractService],
})
export class ContractModule {}
