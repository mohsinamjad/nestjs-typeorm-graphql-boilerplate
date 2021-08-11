// used for cli e.g migration
// npm run typeorm:migrate:up -- --config ./apps/cmms/src/config/ormconfig.ts

import { Logger } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { join } from 'path';
import { ConnectionOptions, createConnection } from 'typeorm';
import dbConfiguration from './db.config';

type Mutable<T> = {
  -readonly [k in keyof T]: T[k];
};

const logger = new Logger('Migration:cli');
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

async function getAsyncConfig() {
  let ormConfig: Mutable<TypeOrmModuleOptions> = config;
  if (process.env.TENANT_ID) {
    const defaultConnection = await createConnection(
      ormConfig as ConnectionOptions,
    );
    const [
      tenantConfig,
    ] = await defaultConnection
      .createQueryBuilder()
      .select()
      .from('tenants', 'tenant')
      .where('tenant.name = :name', { name: process.env.TENANT_ID })
      .execute();
    if (!tenantConfig)
      throw new Error(`Config not found for ${process.env.TENANT_ID}`);

    ormConfig = { ...config, ...JSON.parse(tenantConfig.dbConfig) };
  }
  ormConfig.migrations = ormConfig.migrations.map((path: string) =>
    join(process.cwd(), path),
  );

  logger.log(
    `Running migrations on config : ${JSON.stringify(ormConfig, null, 2)}`,
  );
  return ormConfig;
}
export default getAsyncConfig();
