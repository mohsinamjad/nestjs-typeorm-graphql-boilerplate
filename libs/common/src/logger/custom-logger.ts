import { ConfigService } from '@nestjs/config';
import {
  createLogger as createWinstonLogger,
  format,
  Logger,
  transports,
} from 'winston';
import WinstonRotate from 'winston-daily-rotate-file';

/**
 * Logging levels in winston conform to the severity ordering
 * Each level is given a specific integer priority
 * from 0 (error) to 6 (silly) (highest to lowest).
 * this can be configured using env variable LOG_LEVEL
 */
export enum logLevels {
  error = 'error',
  warn = 'warn',
  info = 'info',
  http = 'http',
  verbose = 'verbose',
  debug = 'debug',
  silly = 'silly',
}

export const logLevelMapping = {
  [logLevels.silly]: 6,
  [logLevels.debug]: 5,
  [logLevels.verbose]: 4,
  [logLevels.http]: 3,
  [logLevels.info]: 2,
  [logLevels.warn]: 1,
  [logLevels.error]: 0,
};

function createConsoleTransport(options) {
  return new transports.Console({
    format: format.combine(
      format.errors({ stack: true }),
      format.colorize({ all: true }),
      format.timestamp(),
      format.align(),
      format.printf((info) => {
        const { timestamp, level, message, stack } = info;
        // pass sourceFn to override stack source method
        return `[${timestamp}] [${level}] [${message.trim()}] ${stack || ''}`;
      }),
    ),
    ...options,
  });
}

function createFileRotateTransport(options) {
  return new WinstonRotate(options);
}

// we pass this function an array of transport objects
// each transport object has 2 properties: type & options
function getLoggerTransports(transports) {
  return transports.map((transport) => {
    const { type, options } = transport;
    switch (type) {
      case 'console':
        return createConsoleTransport(options);
      case 'file-rotate':
        return createFileRotateTransport(options);
    }
  });
}

// our export function which will be invoked by our singleton

export const createLogger = (
  transports: [{ type: string; options: any }],
  level = new ConfigService().get('LOG_LEVEL') || logLevels.info,
): Logger =>
  createWinstonLogger({
    format: format.json(),
    level,
    transports: getLoggerTransports(transports),
  });

export const logger = createLogger([
  {
    type: 'console',
    options: {},
  },
]);

export { Logger };
