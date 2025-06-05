import { Module } from '@nestjs/common';
import { AuthLoginController, AuthSignUpController } from './auth.controller';
import { AuthLoginService, AuthSignUpService } from './auth.service';

@Module({
  controllers: [

    AuthSignUpController,
    AuthLoginController,

  ],
  providers: [

    AuthSignUpService,
    AuthLoginService,
  
  ]
})
export class AuthModule {}
