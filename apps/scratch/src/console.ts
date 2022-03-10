import { dbConfiguration } from '@libs/common/config/db-config';
import { redisConfiguration } from '@libs/common/config/redis-config';
import { logger } from '@libs/common/logger';
import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BootstrapConsole } from 'nestjs-console';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      ignoreEnvFile: false,
      load: [dbConfiguration, redisConfiguration],
      envFilePath: `apps/scratch/env/.env`,
    }),
    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => {
        return { ...configService.get('databaseConfig'), schema: 'public' };
      },
    }),
  ],
})
export class AppModule {}

const bootstrap = new BootstrapConsole({
  module: AppModule,
  useDecorators: true,
});
bootstrap
  .init()
  .then(async (app) => {
    try {
      await app.init();
      await bootstrap.boot();
      await app.close();
    } catch (e) {
      logger.error(e?.message);
      await app.close();
      process.exit(1);
    }
  })
  .catch((e) => logger.error(e.message));
