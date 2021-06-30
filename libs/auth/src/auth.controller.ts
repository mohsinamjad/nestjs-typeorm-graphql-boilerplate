import { Controller, Request, Post, UseGuards, Get } from '@nestjs/common';
import { AuthService } from './auth.service';
import { JwtAuthGuard } from './guards/jwt-auth-guard';
import { LocalAuthGuard } from './guards/local-auth-guard';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  /**
   * invoke passport-local custom configured logic,
   * validating the credentials, and assigning the user property to the Request object
   * @param req
   * @returns user
   */
  @UseGuards(LocalAuthGuard) // it will invoke passport local strategy validate call
  @Post('login')
  async login(@Request() req) {
    return this.authService.login(req.user);
  }

  /**
   * invoke passport-jwt custom configured logic,
   * validating the JWT present in headers as access_token,
   * and assigning the user property to the Request object
   * @param req
   * @returns user
   */
  @UseGuards(JwtAuthGuard)
  @Get('profile')
  getProfile(@Request() req) {
    return req.user;
  }
}
