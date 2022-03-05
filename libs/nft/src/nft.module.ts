import { Module } from '@nestjs/common';
import { ContractModule } from './resources/contracts/contract.module';
import { HolderModule } from './resources/holder/holder.module';
import { TransactionModule } from './resources/transaction/transaction.module';
import { WalletModule } from './resources/wallet/wallet.module';

@Module({
  imports: [TransactionModule, HolderModule, WalletModule, ContractModule],
  providers: [],
  exports: [TransactionModule, HolderModule, WalletModule, ContractModule],
})
export class NftModule {}
