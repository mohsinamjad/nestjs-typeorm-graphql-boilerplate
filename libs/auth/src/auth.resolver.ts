import { Injectable, UseGuards } from '@nestjs/common';
import { Args, Context, Mutation } from '@nestjs/graphql';
import { AuthService } from './auth.service';
import { LocalAuthGuard } from './guards/local-auth-guard';
import { loginInput } from './resources/user/dto/user.dto';

@Injectable()
export class AuthResolver {
  constructor(private readonly authService: AuthService) {}

  @UseGuards(LocalAuthGuard)
  @Mutation(() => String)
  async login(
    @Context() ctx,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    @Args('data') loginCreds: loginInput,
  ): Promise<string> {
    const response = await this.authService.login(ctx?.req?.user);
    return response.access_token;
  }
}
