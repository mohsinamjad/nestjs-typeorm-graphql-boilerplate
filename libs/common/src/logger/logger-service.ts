import { Injectable, LoggerService } from '@nestjs/common';
import { logger } from './custom-logger';

@Injectable()
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
  info(message: string) {
    logger.info(message);
  }
}
