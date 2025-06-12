import { Body, Controller, Post, Res, UsePipes, ValidationPipe } from "@nestjs/common";
import { DtoAuthLoginMain } from "src/dtos";
import { AuthLoginService } from "../auth.service";
import { Response, response } from "express";
import { ConfigService } from "@nestjs/config";


@Controller("auth/login")
export class AuthLoginController {
  constructor (private main : AuthLoginService, private config : ConfigService) {}

  @UsePipes(
    new ValidationPipe({
      whitelist : true
    })
  )
  @Post("main")
  async AuthLoginMainController(@Body() dto : DtoAuthLoginMain, @Res({
    passthrough : true
  }) res :Response) : Promise<string[]> {
    const [ computer_number, access_token ] = await this.main.AuthLoginMainService(dto)

    res.cookie("access_token", access_token, {
      httpOnly : true,
      secure : this.config.get<boolean>("NEST_APP_SECURES"),
      sameSite : "lax",
      maxAge : 60 * 60 * 24000
    })

    return [ computer_number ]
  }

}