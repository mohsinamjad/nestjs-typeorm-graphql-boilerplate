import { Query, Resolver } from '@nestjs/graphql';
import Wallet from './wallet.entity';
import { WalletService } from './wallet.service';

@Resolver(() => Wallet)
export class WalletResolver {
  constructor(private readonly walletService: WalletService) {}

  @Query(() => [Wallet])
  async wallets(): Promise<Wallet[]> {
    return this.walletService.findAll();
  }
}
