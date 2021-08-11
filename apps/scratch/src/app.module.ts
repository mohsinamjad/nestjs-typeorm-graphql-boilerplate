import { AuthModule } from '@libs/auth';
import { CustomThrottlerGuard } from '@libs/auth/guards/throttler-guard';
import Role from '@libs/auth/resources/role/role.entity';
import User from '@libs/auth/resources/user/user.entity';
import { SeedModule } from '@libs/auth/seed/seed.module';
import { LoggerMiddleware } from '@libs/common';
import tenantMiddleware from '@libs/common/resources/tenant/tenant.middleware';
import { TenantModule } from '@libs/common/resources/tenant/tenant.module';
import { SampleModule } from '@libs/sample';
import Author from '@libs/sample/resources/author/author.entity';
import Book from '@libs/sample/resources/book/book.entity';
import { BookCategory } from '@libs/sample/resources/bookCategory/book-category.entity';
import Category from '@libs/sample/resources/category/category.entity';
import Property from '@libs/sample/resources/property/property.entity';
import { MiddlewareConsumer, Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { APP_GUARD } from '@nestjs/core';
import { GraphQLModule } from '@nestjs/graphql';
import { ThrottlerModule } from '@nestjs/throttler';
import { TypeOrmModule } from '@nestjs/typeorm';
import { join } from 'path';
import { Connection } from 'typeorm';
import { AppController } from './app.controller';
import { AppResolver } from './app.resolver';
import { AppService } from './app.service';
import dbConfiguration from './config/db.config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      ignoreEnvFile: false,
      load: [dbConfiguration],
      envFilePath: `apps/scratch/env/.env.${process.env.NODE_ENV || 'dev'}`,
    }),
    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => {
        return configService.get('databaseConfig');
      },
    }),
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
    TenantModule,
    AuthModule,
    SampleModule,
    SeedModule,
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
  // eslint-disable-next-line @typescript-eslint/ban-types
  private tenantMiddleware: Function;
  constructor(private readonly connection: Connection) {
    this.tenantMiddleware = tenantMiddleware(connection, [
      User,
      Role,
      Author,
      Book,
      Category,
      BookCategory,
      Property,
    ]);
  }
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(LoggerMiddleware, this.tenantMiddleware as any)
      .forRoutes('*');
  }
}
