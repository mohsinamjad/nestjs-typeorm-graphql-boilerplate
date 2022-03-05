import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
// eslint-disable-next-line @typescript-eslint/no-var-requires
const moralis = require('moralis/node');

export const MORALIS = 'MORALIS';

const moralisFactory = {
  provide: MORALIS,
  imports: [ConfigModule],
  useFactory: async (configService: ConfigService) => {
    await moralis.start({
      serverUrl: configService.get('MORALIS_SERVER_URL'),
      appId: configService.get('MORALIS_APP_ID'),
      masterKey: configService.get('MORALIS_MASTER_KEY'),
    });
    return moralis;
  },
  inject: [ConfigService],
};

@Module({
  providers: [moralisFactory],
  exports: [MORALIS],
})
export class MoralisModule {}
