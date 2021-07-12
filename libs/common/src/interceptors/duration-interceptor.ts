import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { customLogger } from '../logger';
const logger = customLogger('Duration Interceptor');

@Injectable()
export class DurationInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const ctx = context.switchToHttp();
    const req = ctx.getRequest<Request>();
    const now = Date.now();
    logger.info(`duration interceptor before...| ${req.url}`);
    return next
      .handle()
      .pipe(
        tap(() =>
          logger.info(
            `duration interceptor after... | ${req.url} | ${
              Date.now() - now
            }ms`,
          ),
        ),
      );
  }
}
