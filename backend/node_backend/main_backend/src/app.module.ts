import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import * as CookieParser from "cookie-parser";
import { ConfigModule, ConfigService} from '@nestjs/config';
import { AuthModule } from './pkgs';
import { DatabaseModule } from './database';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [
    ConfigModule.forRoot({}),
    JwtModule.registerAsync({
      imports : [ ConfigModule ],
      useFactory : async (config : ConfigService) => ({
        secret : config.get<string>("NEST_APP_JWT_ACCESS_TOKEN"),
        signOptions : { expiresIn : config.get<string>("NEST_APP_JWR_ACCESS_TIME")}
      }),
      inject : [ConfigService],
    }),

    // 글로벌 모델들
    DatabaseModule,

    // 모듈들
    AuthModule,
  ],
  providers: [],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
    .apply(CookieParser())
    .forRoutes("*")
  }
}
