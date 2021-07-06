import { Injectable, Request } from '@nestjs/common';
import { Args, Mutation } from '@nestjs/graphql';
import { AuthService } from './auth.service';
import { loginInput } from './modules/user/dto/user.dto';
import { LocalStrategy } from './passport-strategies/local.strategy';

@Injectable()
export class AuthResolver {
  constructor(
    private readonly authService: AuthService,
    private readonly localStrategy: LocalStrategy,
  ) {}

  @Mutation(() => String)
  async login(
    @Request() req,
    @Args('data') { email, password }: loginInput,
  ): Promise<string> {
    const user = await this.localStrategy.validate(email, password);
    const response = await this.authService.login(user);
    return response.access_token;
  }
}
