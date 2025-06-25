import { Module } from '@nestjs/common';
import { AuthLoginController, AuthSignUpController } from './auth.controller';
import { AuthLoginService, AuthSignUpService } from './auth.service';
import { DatabaseService } from 'src/database';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { GoogleSignUpPassportStrategy } from 'src/security/strategy';
import { GoogleSignUpGuard } from 'src/security/guard';

@Module({
  controllers: [
    // 자체 컨트롤러
    AuthSignUpController,
    AuthLoginController,
  ],
  providers: [
    // 자체 서비스
    AuthSignUpService,
    AuthLoginService,

    // 외부 서비스
    DatabaseService,
    GoogleSignUpPassportStrategy,
    GoogleSignUpGuard,

    // 또 다른 서비스
    ConfigService,
    JwtService,
  ]
})
export class AuthModule {}
