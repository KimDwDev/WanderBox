import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import * as CookieParser from "cookie-parser"
import { ConfigModule} from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({}),
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
