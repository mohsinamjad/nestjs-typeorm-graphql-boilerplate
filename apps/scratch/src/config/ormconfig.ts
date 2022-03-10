import { ConfigModule, ConfigService } from '@nestjs/config';
import {
  TypeOrmModuleAsyncOptions,
  TypeOrmModuleOptions,
} from '@nestjs/typeorm';

function getMigrationDirectory(configService: ConfigService) {
  const directory =
    configService.get('NODE_ENV') === 'migration'
      ? `${__dirname}/apps/scratch/src`
      : `${__dirname}/dist/apps/scratch/src`;
  return `${directory}/migrations/**/*{.ts,.js}`;
}

export default class TypeOrmConfig {
  static getOrmConfig(configService: ConfigService): TypeOrmModuleOptions {
    return {
      type: 'postgres',
      host: configService.get('TYPEORM_HOST'),
      username: configService.get('TYPEORM_USERNAME'),
      password: configService.get('TYPEORM_PASSWORD') as string,
      database: configService.get('TYPEORM_DATABASE'),
      port: parseInt(configService.get('TYPEORM_PORT')),
      logging: configService.get('TYPEORM_LOGGING') === 'true',
      migrationsRun: configService.get('TYPEORM_MIGRATIONS_RUN') === 'true',
      synchronize: true, //configService.get('TYPEORM_SYNCHRONIZE') === 'true',
      autoLoadEntities: true,
      migrationsTableName: configService.get('TYPEORM_MIGRATIONS_TABLE'),
      migrations: [getMigrationDirectory(configService)],
      cli: {
        migrationsDir: 'apps/scratch/src/migrations',
      },
    };
  }
}

export const typeOrmConfigAsync: TypeOrmModuleAsyncOptions = {
  imports: [ConfigModule],
  inject: [ConfigService],
  useFactory: async (
    configService: ConfigService,
  ): Promise<TypeOrmModuleOptions> => TypeOrmConfig.getOrmConfig(configService),
};
