import { CustomThrottlerGuard } from '@libs/auth/guards/throttler-guard';
import { LoggerMiddleware } from '@libs/common';
import { dbConfiguration } from '@libs/common/config/db-config';
import { redisConfiguration } from '@libs/common/config/redis-config';
import { SampleModule } from '@libs/sample';
import { MiddlewareConsumer, Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { APP_GUARD } from '@nestjs/core';
import { GraphQLModule } from '@nestjs/graphql';
import { ThrottlerModule } from '@nestjs/throttler';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RedisModule } from 'nestjs-redis';
import { join } from 'path';

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
    GraphQLModule.forRootAsync({
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => ({
        /**
         * it will auto generate schema.gql from objectTypes/Entities
         */
        autoSchemaFile: join(__dirname, 'schema.gql'),
        playground: true,
        uploads: false,
        cors: {
          origin: '*',
          credentials: true,
        },
        introspection: [true, 'true'].includes(
          configService.get('ENABLE_INTROSPECTION'),
        ),
      }),
    }),
    RedisModule.forRootAsync({
      useFactory: async (configService: ConfigService) => {
        return {
          ...(configService.get('redisConfig') as ConfigService),
        };
      },
      inject: [ConfigService],
    }),
    /**
     * Once this is done, the TypeORM Connection and EntityManager objects will be available to inject
     * across the entire project (without needing to import any modules)
     */
    ThrottlerModule.forRoot({
      ttl: 10,
      limit: 5,
    }),
    SampleModule,
  ],
  providers: [
    {
      provide: APP_GUARD,
      useClass: CustomThrottlerGuard,
    },
  ],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).forRoutes('*');
  }
}
