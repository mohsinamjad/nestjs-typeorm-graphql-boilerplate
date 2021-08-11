import { Injectable } from '@nestjs/common';
import { ContextIdFactory, ModuleRef } from '@nestjs/core';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';
import { AuthService } from '../auth.service';

// NOTE: only use auth service in strategies
@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private moduleRef: ModuleRef) {
    super({
      usernameField: 'email',
      passwordField: 'password',
      passReqToCallback: true,
    });
  }

  /**
   * if valid passport will add user in request
   * @param email
   * @param password
   * @returns boolean
   */
  async validate(
    request: Request,
    email: string,
    password: string,
  ): Promise<any> {
    // get unique contextId for request
    const contextId = ContextIdFactory.getByRequest(request);
    /* register request for further inject:[REQUEST] usage through out the scoped lifecycle
     * https://github.com/nestjs/nest/issues/4967
     */
    this.moduleRef.registerRequestByContextId(request, contextId);
    // getting request scoped service
    const authService = await this.moduleRef.resolve(AuthService, contextId);
    return await authService.validateUser(email, password);
  }
}
