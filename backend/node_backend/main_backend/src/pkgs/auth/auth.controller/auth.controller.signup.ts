import { Body, Controller, Get, Post, Req, UseGuards, UsePipes, ValidationPipe } from "@nestjs/common";
import { AuthSignUpService } from "../auth.service";
import { DtoAuthSignUpGoogle, DtoAuthSignUpMain } from "src/dtos";
import { GoogleSignUpGuard } from "src/security/guard";
import { Request, request } from "express";


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

  // google을 이용해서 회원가입 하고 싶을때
  @UseGuards(GoogleSignUpGuard)
  @Get("google")
  async AuthSignUpGoogleController() : Promise<string> {
    return "회원가입 완료(구글)"
  }
  
  @UseGuards(GoogleSignUpGuard)
  @Get("google/redirect")
  async AuthSignUpGoogleRedirectController(@Req() req : Request) : Promise<string> {
    const googleSignUpDto = new DtoAuthSignUpGoogle;
    googleSignUpDto.id = req["wanderbox_data"]["id"];
    googleSignUpDto.email = req["wanderbox_data"]["email"];
    googleSignUpDto.provider = req["wanderbox_data"]["provider"];
    return this.main.AuthSignUpGoogleRedirectService(googleSignUpDto);
  }

  @Post("apple")
  async AuthSignUpAppleController() : Promise<string> {
    return "회원가입 완료(애플)"
  }

}