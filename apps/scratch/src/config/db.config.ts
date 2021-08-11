import { registerAs } from '@nestjs/config';
import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { join } from 'path';

function getMigrationDirectory() {
  const path =
    process.env.NODE_MODE === 'cli'
      ? join('/apps/scratch/src', '/migrations/root/*{.ts,.js}')
      : join('/dist/apps/scratch/main.js');
  return `${path}`;
}

export default registerAs(
  'databaseConfig',
  (): TypeOrmModuleOptions => {
    return {
      name: 'default',
      type: 'postgres',
      schema: 'public',
      host: process.env.TYPEORM_HOST,
      username: process.env.TYPEORM_USERNAME,
      password: process.env.TYPEORM_PASSWORD as string,
      database: process.env.TYPEORM_DATABASE,
      port: parseInt(process.env.TYPEORM_PORT),
      logging: process.env.TYPEORM_LOGGING === 'true',
      migrationsRun: process.env.TYPEORM_MIGRATIONS_RUN === 'true',
      synchronize: process.env.TYPEORM_SYNCHRONIZE === 'true',
      autoLoadEntities: true,
      ...(process.env.NODE_MODE === 'cli'
        ? { entities: ['**/**/*.entity.ts'] }
        : {}), // GLOB pattern doesnt work in app mode but works only in CLI mode
      migrationsTableName: process.env.TYPEORM_MIGRATIONS_TABLE,
      migrations: [getMigrationDirectory()], // workis only in cli mode // indicates that typeorm must load migrations from the given "migration" directory.
      cli: {
        migrationsDir: 'apps/scratch/src/migrations/root', //  indicates that the CLI must create new migrations in the "migration" directory.
      },
    };
  },
);
