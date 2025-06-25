import { Body, Controller, Get, Post, UseGuards, UsePipes, ValidationPipe } from "@nestjs/common";
import { AuthSignUpService } from "../auth.service";
import { DtoAuthSignUpMain } from "src/dtos";
import { GoogleSignUpGuard } from "src/security/guard";


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
  async AuthSignUpMainController(@Body() dto : DtoAuthSignUpMain) : Promise<{message : string}> {
    return this.main.AuthSignUpMainService(dto)
  }

  @UseGuards(GoogleSignUpGuard)
  @Get("google")
  async AuthSignUpGoogleController() : Promise<string> {
    return "회원가입 완료(구글)"
  }

  @UseGuards(GoogleSignUpGuard)
  @Get("google/redirect")
  async AuthSignUpGoogleRedirectController() {
    return "안녕"
  }

  @Post("apple")
  async AuthSignUpAppleController() : Promise<string> {
    return "회원가입 완료(애플)"
  }

}