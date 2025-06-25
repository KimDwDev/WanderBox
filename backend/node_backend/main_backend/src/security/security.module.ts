import { Global, Module } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { GoogleSignUpGuard } from "./guard";
import { GoogleSignUpPassportStrategy } from "./strategy";
import { DatabaseService } from "src/database";


@Global()
@Module({
  providers : [
    
    // 모듈
    ConfigService,
    DatabaseService,

    // 수출용
    GoogleSignUpPassportStrategy,
    GoogleSignUpGuard,
  ],
  exports : [
    GoogleSignUpPassportStrategy,
    GoogleSignUpGuard,
  ]
})
export class SecurityModule {

}