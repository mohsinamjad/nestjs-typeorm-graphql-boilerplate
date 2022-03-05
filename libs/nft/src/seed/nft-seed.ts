import { logger } from '@libs/common/logger';
import { Inject, Injectable } from '@nestjs/common';
import { Command, Console } from 'nestjs-console';
import { MORALIS } from '../moralis';
import { ContractService } from '../resources/contracts/contract.service';
import { TransactionService } from '../resources/transaction/transaction.service';
import { CONTRACTS } from './fixtures/collections';

@Console({
  command: 'nft',
  description: 'A cli for nft related scripts',
})
@Injectable()
export class NFTSeed {
  constructor(
    @Inject(MORALIS) private readonly moralis,
    private readonly contractService: ContractService,
    private readonly transactionService: TransactionService,
  ) {}

  async fetchAndSaveTrades() {
    const limit = 500;
    let list = [];
    for (const contract of CONTRACTS) {
      let hasMore = true;
      let i = 0;
      while (hasMore) {
        const tokenOptions = {
          chain: 'eth',
          address: contract,
          limit,
          offset: i * limit,
        };
        const tokenTrades = await this.moralis.Web3API.token.getNftTrades(
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
        await this.transactionService.create(tokenTrades.result);
        list = [...list, ...tokenTrades.result];
        i++;
      }
    }
  }

  async fetchAndSaveContractsMeta(contracts) {
    const tokenOptions = {
      chain: 'eth',
      addresses: contracts,
    };
    const tokenMeta = await this.moralis.Web3API.token.getTokenMetadata(
      tokenOptions,
    );
    logger.info(JSON.stringify(tokenMeta, null, 2));
    await this.contractService.create(tokenMeta);
  }

  @Command({
    command: 'seed:collections-meta',
    description: 'creates collections in database',
  })
  async createContracts() {
    logger.info('********* FETCHING CONTRACTS ************');
    await this.fetchAndSaveContractsMeta(CONTRACTS);
    logger.info('********* SAVED CONTRACTS ************');
    process.exit(0);
  }

  @Command({
    command: 'seed:trades',
    description: 'creates collections in database',
  })
  async createTrades() {
    logger.info('********* FETCHING TRADES ************');
    await this.fetchAndSaveTrades();
    logger.info('********* TRADES SAVED ************');
    process.exit(0);
  }
}
