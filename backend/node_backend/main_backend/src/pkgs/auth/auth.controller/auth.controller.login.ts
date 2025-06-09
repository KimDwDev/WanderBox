import { Body, Controller, Post, UsePipes, ValidationPipe } from "@nestjs/common";
import { DtoAuthLoginMain } from "src/dtos";


@Controller("auth/login")
export class AuthLoginController {

  @UsePipes(
    new ValidationPipe({
      whitelist : true
    })
  )
  @Post("main")
  async AuthLoginMainController(@Body() dto : DtoAuthLoginMain) : Promise<string> {

    return "로그인 되었습니다."
  }

}