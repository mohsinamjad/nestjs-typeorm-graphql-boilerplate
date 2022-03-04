import { Injectable } from '@nestjs/common';
import Transaction from './transaction.entity';
import { TransactionRepository } from './transaction.repository';

@Injectable()
export class TransactionService {
  constructor(private transactionRepository: TransactionRepository) {}

  async findAll(options = {}): Promise<Transaction[]> {
    return this.transactionRepository.find(options);
  }

  async findOne(options = {}): Promise<Transaction> {
    return this.transactionRepository.findOne(options);
  }

  async create(transaction: Transaction): Promise<Transaction> {
    const createdTransaction = await this.transactionRepository.create(
      transaction,
    );
    const result = await this.transactionRepository.save(createdTransaction);
    return result;
  }

  async update(transaction: Transaction): Promise<Transaction> {
    return await this.transactionRepository.save(transaction);
  }

  async delete(id: number, softDelete = false): Promise<number> {
    if (!softDelete) {
      const { affected } = await this.transactionRepository.delete({ id });
      return affected;
    }
  }
}
