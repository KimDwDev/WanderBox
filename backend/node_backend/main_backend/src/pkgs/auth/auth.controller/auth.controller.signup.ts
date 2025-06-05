import { Body, Controller, Post, UsePipes, ValidationPipe } from "@nestjs/common";
import { AuthSignUpService } from "../auth.service";
import { DtoAuthSignUpMain } from "src/dtos";


@Controller("auth/signup")
export class AuthSignUpController {
  constructor(private main : AuthSignUpService) {}

  // 자사의 회원가입을 이용하고 싶을때
  @UsePipes(
    new ValidationPipe({
      whitelist : true
    })
  )
  @Post("main")
  async AuthSignUpMainController(@Body() dto : DtoAuthSignUpMain) : Promise<string> {
    return this.main.AuthSignUpMainService(dto)
  }

  @Post("google")
  async AuthSignUpGoogleController() : Promise<string> {
    return "회원가입 완료(구글)"
  }

  @Post("apple")
  async AuthSignUpAppleController() : Promise<string> {
    return "회원가입 완료(애플)"
  }

}