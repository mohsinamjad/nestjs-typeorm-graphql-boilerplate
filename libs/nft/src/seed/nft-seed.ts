import { Command } from 'nestjs-command';
import { Inject, Injectable } from '@nestjs/common';
import { logger } from '@libs/common/logger';
import { ContractService } from '../resources/contracts/contract.service';
import { MORALIS } from '../moralis';
import { CONTRACTS } from './fixtures/collections';

@Injectable()
export class NFTSeed {
  constructor(
    @Inject(MORALIS) private readonly moralis,
    private readonly contractService: ContractService,
  ) {}

  async fetchAndSaveContractsMeta(contracts) {
    const limit = 500;
    let list = [];
    for (const contract of contracts) {
      let hasMore = true;
      let i = 0;
      while (hasMore) {
        const tokenOptions = {
          chain: 'eth',
          address: contract,
          limit,
          offset: i * limit,
        };
        const tokenTrades = await this.moralis.Web3API.token.getContractNFTTransfers(
          tokenOptions,
        );
        console.log(
          `Found ${
            tokenTrades.result && tokenTrades.result.length
          } for contract ${contract}, fetching more...  limit: ${limit}, offset: ${
            i * limit
          } `,
        );
        if (tokenTrades.result.length === 0) {
          hasMore = false;
          break;
        }
        tokenTrades.result = tokenTrades.result.map((token) => {
          if (token.block_timestamp == null) {
            return { ...token, block_timestamp: '2050-01-01 12:00:00.00000' };
          }
          return token;
        });
        await this.contractService.create(tokenTrades.result);
        list = [...list, ...tokenTrades.result];
        i++;
      }
    }
  }

  @Command({
    command: 'seed:collections-meta',
    describe:
      'seed all collections meta information in database through Moralis',
    autoExit: true,
  })
  async createContracts() {
    logger.info('********* FETCHING CONTRACTS ************');
    // await this.fetchAndSaveContractsMeta(CONTRACTS);
    logger.info('********* SAVED CONTRACTS ************');
  }
}
