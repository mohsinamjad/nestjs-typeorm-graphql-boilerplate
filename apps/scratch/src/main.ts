import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as helmet from 'helmet';
import { NestLogger } from '@libs/common/logger/logger-service';
import * as compression from 'compression';
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    logger: new NestLogger(),
    cors: {
      origin: '*',
      credentials: true,
    },
  });
  app.use(
    helmet({
      contentSecurityPolicy:
        process.env.NODE_ENV === 'production' ? undefined : false,
    }),
  );
  app.use(compression());

  const configService = app.get(ConfigService);
  await app.listen(configService.get('PORT'));
}
bootstrap();
