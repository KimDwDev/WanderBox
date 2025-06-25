import { ExecutionContext, Injectable } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";
import { DatabaseService } from "src/database";


@Injectable()
export class GoogleSignUpGuard extends AuthGuard("google_signup") {
  constructor(private database:DatabaseService) {super()}

  async canActivate(context: ExecutionContext): Promise<boolean>  {

    
    const activate = await super.canActivate(context) as boolean

    // 예전에 홈페이지에 가입한 이력이 있는지 확인하는 로직 필요
    try {
      const request = context.switchToHttp().getRequest();

      console.log(request);

    } catch (err) {
      throw err;
    }

    return activate
  }

}