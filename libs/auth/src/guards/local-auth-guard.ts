import { Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

// local is default strategy name defined in passport
@Injectable()
export class LocalAuthGuard extends AuthGuard('local') {}
