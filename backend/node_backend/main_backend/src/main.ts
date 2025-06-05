import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const config = app.get(ConfigService)

  // cors 정책 관련

  // host 
  const host_string : string = config.get<string>("NEST_APP_ALLOWED_HOSTS")

  if (!host_string || host_string.trim() == "") {
    throw new Error("환경변수에 호스트 이름을 지정하지 않았습니다")
  }

  const allowed_hosts : string[] = host_string
  .split(",")
  .map((h : string) => h.trim())
  .filter((h : string) => h.length > 0)

  app.enableCors({
    origin : allowed_hosts,
    allowedHeaders : [
      "Content-Type",
      "X-Requested-With",
    ],
    methods : ["GET", "POST", "OPTIONS"],
    credentials : true,
  })


  // port
  const port = config.get<string>("NEST_APP_PORT")
  if (!port || port.trim() == "") {
    throw new Error("환경변수에 port번호를 입력하지 않았습니다.")
  }

  const parse_port : number = parseInt(port, 10)
  if (isNaN(parse_port)) {
    throw new Error("포트 번호를 숫자로 변형할 수 없습니다.")
  }

  await app.listen(parse_port)
}
bootstrap();
