import { Injectable, Logger } from "@nestjs/common";
import { DtoAuthSignUpMain } from "src/dtos";


@Injectable()
export class AuthSignUpService {
  constructor () {}
  private log = new Logger

  async AuthSignUpMainService(dto : DtoAuthSignUpMain) : Promise<string> {

    this.log.log(dto.email, dto.password, dto.nickname, dto.term_agree_3)
    
    return "회원가입 완료"

  } 

}