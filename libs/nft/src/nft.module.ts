import { Module } from '@nestjs/common';
import { HolderModule } from './resources/holder/holder.module';
import { TransactionModule } from './resources/transaction/transaction.module';
import { WalletModule } from './resources/wallet/wallet.module';

@Module({
  imports: [TransactionModule, HolderModule, WalletModule],
  providers: [],
  exports: [TransactionModule, HolderModule, WalletModule],
})
export class NftModule {}
