import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UserModule } from './modules/user/user.module';
import { PassportModule } from '@nestjs/passport';
import { LocalStrategy } from './passport-strategies/local.strategy';
import { AuthController } from './auth.controller';
import { JwtModule } from '@nestjs/jwt';
import { JWT_SECRET } from './constants';
import { JwtStrategy } from './passport-strategies/jwt.strategy';
import { RoleModule } from './modules/role/role.module';

@Module({
  imports: [
    UserModule,
    RoleModule,
    PassportModule,
    JwtModule.register({
      secret: JWT_SECRET,
      signOptions: { expiresIn: '10h' },
    }),
  ],
  providers: [AuthService, LocalStrategy, JwtStrategy],
  exports: [AuthService],
  controllers: [AuthController],
})
export class AuthModule {}
