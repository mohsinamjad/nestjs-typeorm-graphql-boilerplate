import { LoggerService } from '@nestjs/common';
import { logger } from './custom-logger';

export class NestLogger implements LoggerService {
  log(message: string) {
    logger.info(message);
  }
  error(error: string) {
    logger.error(error);
  }
  warn(message: string) {
    logger.warn(message);
  }
  debug(message: string) {
    logger.debug(message);
  }
  verbose(message: string) {
    logger.verbose(message);
  }
}
