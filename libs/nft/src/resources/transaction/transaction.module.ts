import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TransactionRepository } from './transaction.repository';
import { TransactionResolver } from './transaction.resolver';
import { TransactionService } from './transaction.service';

@Module({
  imports: [
    /**
     *  With that in place, we can inject the TransactionRepository into the TransactionService
     *  using the @InjectRepository() decorator:
     */
    TypeOrmModule.forFeature([
      // Repo or Entity
      TransactionRepository,
    ]),
  ],
  providers: [TransactionResolver, TransactionService],
  exports: [TransactionResolver, TransactionService],
})
export class TransactionModule {}
