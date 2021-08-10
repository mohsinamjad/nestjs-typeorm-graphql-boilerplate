// used for cli e.g migration
// npm run typeorm:migrate:up -- --config ./apps/cmms/src/config/ormconfig.ts

import { ConfigModule } from '@nestjs/config';
import { join } from 'path';
import dbConfiguration from './db.config';

ConfigModule.forRoot({
  isGlobal: true,
  ignoreEnvFile: false,
  load: [dbConfiguration],
  envFilePath: join(
    __dirname,
    `../../env/.env.${process.env.NODE_ENV || 'dev'}`,
  ),
});
const config = dbConfiguration();
export default config;
