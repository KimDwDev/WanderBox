import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import * as CookieParser from "cookie-parser";
import { ConfigModule} from '@nestjs/config';
import { AuthModule } from './pkgs';
import { DatabaseModule } from './database';

@Module({
  imports: [
    ConfigModule.forRoot({}),

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
