import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable()
export class DurationInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const ctx = context.switchToHttp();
    const req = ctx.getRequest<Request>();
    const now = Date.now();
    console.log(`duration interceptor before...| ${req.url}`);
    return next
      .handle()
      .pipe(
        tap(() =>
          console.log(
            `duration interceptor after... | ${req.url} | ${
              Date.now() - now
            }ms`,
          ),
        ),
      );
  }
}
