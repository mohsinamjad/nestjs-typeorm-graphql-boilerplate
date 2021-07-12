import { LoggerService } from '@nestjs/common';
import { customLogger } from './custom-logger';

const logger = customLogger('NEST');

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
