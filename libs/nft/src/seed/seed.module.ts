import { Module } from '@nestjs/common';
import { MoralisModule } from '../moralis';
import { NftModule } from '../nft.module';
import { NFTSeed } from './nft-seed';

@Module({
  imports: [MoralisModule, NftModule],
  providers: [NFTSeed],
  exports: [NFTSeed],
})
export class NFTSeedModule {}
