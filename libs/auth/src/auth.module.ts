import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { CaslModule } from './casl/casl.module';
import { JWT_SECRET } from './constants';
import { RoleModule } from './resources/role/role.module';
import { UserModule } from './resources/user/user.module';
import { JwtStrategy } from './passport-strategies/jwt.strategy';
import { LocalStrategy } from './passport-strategies/local.strategy';
import { AuthResolver } from './auth.resolver';

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
  providers: [AuthService, LocalStrategy, JwtStrategy, AuthResolver],
  exports: [AuthService],
  controllers: [AuthController],
})
export class AuthModule {}
