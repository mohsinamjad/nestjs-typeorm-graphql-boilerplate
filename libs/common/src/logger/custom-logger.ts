import { isFunction, isObject } from 'lodash';
import {
  createLogger as createWinstonLogger,
  format,
  Logger,
  LoggerOptions,
  transports,
} from 'winston';
import { ConfigService } from '@nestjs/config';

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

/* eslint-disable @typescript-eslint/no-explicit-any */
// https://github.com/winstonjs/winston/issues/890

export class V8StackError {
  stack: any;
  customStack: any;
  constructor(limit = 3) {
    // Use V8's feature to get a structured stack trace
    const oldStackTrace = Error.prepareStackTrace;
    const oldLimit = Error.stackTraceLimit;
    try {
      Error.stackTraceLimit = limit; // <- we only want the top couple of elements
      Error.prepareStackTrace = (err, structuredStackTrace) =>
        structuredStackTrace;
      Error.captureStackTrace(this, V8StackError);
      this.customStack = this.stack; // <- invoke the getter for 'stack'
    } finally {
      Error.stackTraceLimit = oldLimit;
      Error.prepareStackTrace = oldStackTrace;
    }
  }
}

/* eslint-enable @typescript-eslint/no-explicit-any */

function getAndFormatStackTraceElement(fn = 'anonymous'): string {
  const { stack } = new V8StackError();
  // position in stacktrace to find deepest caller
  const CALLER_INDEX = 2;
  const element = stack[CALLER_INDEX];
  const fName = element.getFileName();
  const fileName = fName.substr(fName.lastIndexOf('/') + 1);
  const functionName = element.getFunctionName() || fn;
  return `${functionName}(${fileName}:${element.getLineNumber()})`;
}

export function createLogger(moduleName = '', options: LoggerOptions): Logger {
  const logger = createWinstonLogger({
    ...options,
    level: new ConfigService().get('LOG_LEVEL') || 'info',
  });
  // Iterating over enum's keys
  const levels = Object.keys(logLevels);
  levels.forEach((level) => {
    const loggerOld = logger[level];
    logger[level] = (messageOrOption, metaOrCb, cb) => {
      const { message, ...meta } = isObject(messageOrOption)
        ? (messageOrOption as any)
        : { message: messageOrOption };
      const msg = message || messageOrOption;
      const opts = isFunction(metaOrCb) ? meta : { ...meta, ...metaOrCb };
      opts.sourceFn = getAndFormatStackTraceElement(
        opts.sourceFn || moduleName,
      );
      const callback = isFunction(metaOrCb) ? metaOrCb : cb;
      loggerOld.call(logger, msg, opts, callback);
    };
  });
  return logger;
}

const { Console } = transports;
export const customLogger = (moduleName?: string): Logger => {
  const logger = createLogger(moduleName, {
    format: format.json(),
    transports: [
      new Console({
        format: format.combine(
          format.errors({ stack: true }),
          format.colorize({ all: true }),
          format.timestamp(),
          format.align(),
          format.printf((info) => {
            const { timestamp, level, message, sourceFn, stack } = info;
            // pass sourceFn to override stack source method
            return `[${timestamp}] [${level}] [${'000'}] [${
              sourceFn || ''
            }] [${message.trim()}] ${stack || ''}`;
          }),
        ),
      }),
    ],
  });

  return logger;
};

export { Logger };
