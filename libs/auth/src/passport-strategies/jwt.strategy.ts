import { Injectable } from '@nestjs/common';
import { ContextIdFactory, ModuleRef } from '@nestjs/core';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { AuthService } from '..';
import { JWT_SECRET } from '../constants';

// NOTE: only use auth service in strategies
@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private moduleRef: ModuleRef) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: JWT_SECRET,
      passReqToCallback: true,
    });
  }

  /**
   *  validates access_token
   * @param payload : parsed access_token
   * @returns boolean
   */
  async validate(request: Request, payload: any) {
    // get unique contextId for request
    const contextId = ContextIdFactory.getByRequest(request);
    /* register request for further inject:[REQUEST] usage through out the scoped lifecycle
     * https://github.com/nestjs/nest/issues/4967
     */
    this.moduleRef.registerRequestByContextId(request, contextId);
    // getting request scoped service
    const authService = await this.moduleRef.resolve(AuthService, contextId);
    return authService.getByToken(payload);
  }
}
