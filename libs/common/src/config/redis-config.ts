import { registerAs } from '@nestjs/config';
import { RedisModuleOptions } from 'nestjs-redis';

export const redisConfiguration = registerAs(
  'redisConfig',
  (): RedisModuleOptions => ({
    host: process.env.REDIS_HOST,
    port: parseInt(process.env.REDIS_PORT),
    password: process.env.REDIS_PASSWORD || '',
  }),
);
