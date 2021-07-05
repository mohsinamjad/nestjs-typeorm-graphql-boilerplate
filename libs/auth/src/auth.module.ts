import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { CaslModule } from './casl/casl.module';
import { JWT_SECRET } from './constants';
import { RoleModule } from './modules/role/role.module';
import { UserModule } from './modules/user/user.module';
import { JwtStrategy } from './passport-strategies/jwt.strategy';
import { LocalStrategy } from './passport-strategies/local.strategy';

@Module({
  imports: [
    UserModule,
    RoleModule,
    PassportModule,
    CaslModule,
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
