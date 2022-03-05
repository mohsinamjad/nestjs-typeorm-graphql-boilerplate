import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { WalletRepository } from './wallet.repository';
import { WalletResolver } from './wallet.resolver';
import { WalletService } from './wallet.service';

@Module({
  imports: [
    /**
     *  With that in place, we can inject the WalletRepository into the WalletService
     *  using the @InjectRepository() decorator:
     */
    TypeOrmModule.forFeature([
      // Repo or Entity
      WalletRepository,
    ]),
  ],
  providers: [WalletResolver, WalletService],
  exports: [WalletResolver, WalletService],
})
export class WalletModule {}
