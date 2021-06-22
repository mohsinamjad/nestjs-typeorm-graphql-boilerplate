import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { join } from 'path';
import { getConnectionOptions } from 'typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthorModule } from './modules/author/author.module';
import { BookModule } from './modules/book/book.module';
import { TypeGraphQLModule } from 'typegraphql-nestjs';

import { AppResolver } from './temp.resolver';

@Module({
  imports: [
    // GraphQLModule.forRoot({
    //   /**
    //    * it will auto generate schema.gql from objectTypes/Entities
    //    */
    //   autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
    //   playground: true,
    // }),
    /**
     * Once this is done, the TypeORM Connection and EntityManager objects will be available to inject
     * across the entire project (without needing to import any modules)
     */
    TypeOrmModule.forRootAsync({
      useFactory: async () =>
        Object.assign(await getConnectionOptions(), {
          /**
           * Manually adding entities to the entities array of the connection options can be tedious
           * With that option specified, every entity registered through the forFeature() method will
           * be automatically added to the entities array of the configuration object.
           * here we are merging ormconfig with extra @nest/typeorm configs
           */
          autoLoadEntities: true,
        }),
    }),

    TypeGraphQLModule.forRoot({
      emitSchemaFile: join(process.cwd(), 'src/schema.gql'),
      dateScalarMode: 'timestamp',
      context: ({ req }) => ({ currentUser: req.user }),
    }),
    AuthorModule,
    BookModule,
  ],
  controllers: [AppController],
  providers: [AppService, AppResolver],
})
export class AppModule {}
