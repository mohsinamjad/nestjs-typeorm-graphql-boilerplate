import { ConfigModule } from '@nestjs/config';
import { join } from 'path';
import dbConfiguration from '../../../config/db.config';

ConfigModule.forRoot({
  isGlobal: true,
  ignoreEnvFile: false,
  load: [dbConfiguration],
  envFilePath: join(
    __dirname,
    `../../env/.env.${process.env.NODE_ENV || 'dev'}`,
  ),
});

const defaultOrmConfig = dbConfiguration();

export default {
  ...defaultOrmConfig,
  name: 'test',
  database: 'test',
  synchronize: true,
  migrations: ['apps/scratch/src/migrations/non-root/*{.ts,.js}'],
  cli: {
    migrationsDir: 'apps/scratch/src/migrations/non-root',
  },
};
