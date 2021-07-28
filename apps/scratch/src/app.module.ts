import { AuthModule } from '@libs/auth';
import { CustomThrottlerGuard } from '@libs/auth/guards/throttler-guard';
import { SeedModule } from '@libs/auth/seed/seed.module';
import { LoggerMiddleware } from '@libs/common';
import { MiddlewareConsumer, Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { APP_GUARD } from '@nestjs/core';
import { GraphQLModule } from '@nestjs/graphql';
import { ThrottlerModule } from '@nestjs/throttler';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SampleModule } from '@libs/sample';
import { join } from 'path';
import { AppController } from './app.controller';
import { AppResolver } from './app.resolver';
import { AppService } from './app.service';
import { typeOrmConfigAsync } from './config/ormconfig';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      ignoreEnvFile: false,
      envFilePath: `apps/scratch/env/.env.${process.env.NODE_ENV || 'dev'}`,
    }),
    TypeOrmModule.forRootAsync(typeOrmConfigAsync),
    GraphQLModule.forRoot({
      /**
       * it will auto generate schema.gql from objectTypes/Entities
       */
      autoSchemaFile: join(__dirname, 'schema.gql'),
      playground: true,
      cors: {
        origin: '*',
        credentials: true,
      },
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
    SeedModule,
    AuthModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    AppResolver,
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
