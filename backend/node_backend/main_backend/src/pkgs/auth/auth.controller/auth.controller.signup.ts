import { Controller, Post } from "@nestjs/common";
import { AuthSignUpService } from "../auth.service";


@Controller("auth/signup")
export class AuthSignUpController {
  constructor(private main : AuthSignUpService) {}

  @Post("main")
  async AuthSignUpMain() : Promise<string> {
    return "회원가입 완료"
  }

  @Post("google")
  async AuthSignUpGoogle() : Promise<string> {
    return "회원가입 완료(구글)"
  }

  @Post("apple")
  async AuthSignUpApple() : Promise<string> {
    return "회원가입 완료(애플)"
  }

}