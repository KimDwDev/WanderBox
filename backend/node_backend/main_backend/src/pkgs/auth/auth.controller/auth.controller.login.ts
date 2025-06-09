import { Body, Controller, Post, UsePipes, ValidationPipe } from "@nestjs/common";
import { DtoAuthLoginMain } from "src/dtos";
import { AuthLoginService } from "../auth.service";


@Controller("auth/login")
export class AuthLoginController {
  constructor (private main : AuthLoginService) {}

  @UsePipes(
    new ValidationPipe({
      whitelist : true
    })
  )
  @Post("main")
  async AuthLoginMainController(@Body() dto : DtoAuthLoginMain) : Promise<string> {
    return this.main.AuthLoginMainService(dto)
  }

}