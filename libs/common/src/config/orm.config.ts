import { ConfigModule } from '@nestjs/config';
import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { join } from 'path';
import { ConnectionOptions, createConnection } from 'typeorm';
import { PostgresConnectionOptions } from 'typeorm/driver/postgres/PostgresConnectionOptions';
import { dbConfiguration } from './db-config';

type Mutable<T> = {
  -readonly [k in keyof T]: T[k];
};

if (!process.env.APP_PATH) {
  console.error('APP_PATH environment variable must be set to run migrations');
}

console.debug(`APP Env Path: ${join(process.env.APP_PATH, 'env/.env')}`);

ConfigModule.forRoot({
  isGlobal: true,
  ignoreEnvFile: false,
  load: [dbConfiguration],
  envFilePath: join(process.env.APP_PATH, 'env/.env'),
});

export const config = dbConfiguration();

async function makeSchema(tenantConfig: PostgresConnectionOptions) {
  const appConnection = await createConnection({
    schema: 'public',
    name: tenantConfig.name,
    type: tenantConfig.type,
    host: tenantConfig.host,
    username: tenantConfig.username,
    password: tenantConfig.password,
    database: tenantConfig.database,
    port: tenantConfig.port,
    synchronize: false,
  } as ConnectionOptions);

  await appConnection
    .createQueryRunner()
    .createSchema(tenantConfig.schema, true);
  await appConnection.close();
}

async function getAsyncConfig() {
  const ormConfig: Mutable<TypeOrmModuleOptions> = config;
  if (!ormConfig) throw new Error(`Config not found for provided env`);
  ormConfig.migrations = [
    join(process.env.APP_PATH, 'src/migrations/*{.ts,.js}'),
  ];
  ormConfig.cli = {
    migrationsDir: join(process.env.APP_PATH, 'src/migrations'),
  };
  ormConfig.entities = ['**/**/*.entity.ts'];
  await makeSchema(ormConfig as any);
  console.info(
    `Running migrations on config : ${JSON.stringify(ormConfig, null, 2)}`,
  );
  return ormConfig;
}

export default getAsyncConfig();
