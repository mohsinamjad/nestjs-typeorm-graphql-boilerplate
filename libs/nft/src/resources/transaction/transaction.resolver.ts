import { Query, Resolver } from '@nestjs/graphql';
import Transaction from './transaction.entity';
import { TransactionService } from './transaction.service';

@Resolver(() => Transaction)
export class TransactionResolver {
  constructor(private readonly transactionService: TransactionService) {}

  @Query(() => [Transaction])
  async transactions(): Promise<Transaction[]> {
    return this.transactionService.findAll();
  }
}
