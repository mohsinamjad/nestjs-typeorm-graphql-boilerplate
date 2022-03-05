import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import moralis from 'moralis/node';

export const MORALIS = 'MORALIS';

const moralisFactory = {
  provide: MORALIS,
  imports: [ConfigModule],
  useFactory: (configService: ConfigService) => {
    moralis.start({
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
})
export class MoralisModule {}
