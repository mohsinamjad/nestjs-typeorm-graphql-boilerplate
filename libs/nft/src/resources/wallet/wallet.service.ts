import { Injectable } from '@nestjs/common';
import Wallet from './wallet.entity';
import { WalletRepository } from './wallet.repository';

@Injectable()
export class WalletService {
  constructor(private walletRepository: WalletRepository) {}

  async findAll(options = {}): Promise<Wallet[]> {
    return this.walletRepository.find(options);
  }

  async findOne(options = {}): Promise<Wallet> {
    return this.walletRepository.findOne(options);
  }

  async create(wallet: Wallet): Promise<Wallet> {
    const createdWallet = await this.walletRepository.create(wallet);
    const result = await this.walletRepository.save(createdWallet);
    return result;
  }

  async update(wallet: Wallet): Promise<Wallet> {
    return await this.walletRepository.save(wallet);
  }

  async delete(id: number, softDelete = false): Promise<number> {
    if (!softDelete) {
      const { affected } = await this.walletRepository.delete({ id });
      return affected;
    }
  }
}
