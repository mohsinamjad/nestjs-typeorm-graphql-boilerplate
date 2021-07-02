const connectionOptions = {
  synchronize: true,
  dropSchema: false,
  migrationsRun: false,
  name: 'default',
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'postgres',
  password: 'password',
  database: 'nestDB',
  logging: true,
  migrationsTableName: 'typeorm_migrations',
  migrations: [getMigrationDirectory()],
  cli: {
    migrationsDir: 'apps/scratch/src/migrations',
  },
};

function getMigrationDirectory() {
  const directory =
    process.env.NODE_ENV === 'migration'
      ? `${__dirname}/apps/scratch/src`
      : `${__dirname}/dist/apps/scratch/src`;
  return `${directory}/migrations/**/*{.ts,.js}`;
}

module.exports = connectionOptions;
