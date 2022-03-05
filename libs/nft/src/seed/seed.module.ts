import { Module } from '@nestjs/common';
import { ConsoleModule } from 'nestjs-console';
import { MoralisModule } from '../moralis';
import { NftModule } from '../nft.module';
import { NFTSeed } from './nft-seed';

@Module({
  imports: [MoralisModule, NftModule, ConsoleModule],
  providers: [NFTSeed],
  exports: [NFTSeed],
})
export class NFTSeedModule {}
