import { registerAs } from '@nestjs/config';
import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { join } from 'path';

function getMigrationDirectory() {
  const path =
    process.env.NODE_MODE === 'cli'
      ? join('/apps/scratch/src', '/migrations/*{.ts,.js}')
      : join('/dist/apps/scratch/main.js');
  return `${path}`;
}

export const dbConfiguration = registerAs(
  'databaseConfig',
  (): TypeOrmModuleOptions => {
    const isCliCmd = process.env.NODE_MODE === 'cli';
    return {
      name: 'default',
      type: 'postgres',
      schema: process.env.APP_SCHEMA,
      host: process.env.DATABASE_HOST,
      username: process.env.DATABASE_USERNAME,
      password: process.env.DATABASE_PASSWORD as string,
      database: process.env.DATABASE_NAME,
      port: parseInt(process.env.DATABASE_PORT),
      logging: process.env.TYPEORM_LOGGING === 'true',
      migrationsRun: process.env.MIGRATIONS_RUN === 'true',
      synchronize: isCliCmd
        ? false
        : process.env.TYPEORM_SYNCHRONIZE === 'true',
      autoLoadEntities: true,
      ...(isCliCmd ? { entities: ['**/**/*.entity.ts'] } : {}), // GLOB pattern doesnt work in app mode but works only in CLI mode
      migrationsTableName: process.env.MIGRATIONS_TABLE_NAME,
      migrations: [getMigrationDirectory()], // workis only in cli mode // indicates that typeorm must load migrations from the given "migration" directory.
      cli: {
        migrationsDir: 'apps/scratch/src/migrations', //  indicates that the CLI must create new migrations in the "migration" directory.
      },
      // extra: {
      //   // based on  https://node-postgres.com/api/pool
      //   // max connection pool size
      //   max: 10,
      //   // connection timeout
      //   connectionTimeoutMillis: 1000,
      // },
    };
  },
);
