import { HttpException, HttpStatus, Injectable, Logger } from "@nestjs/common";
import { DatabaseService } from "src/database";
import { DtoAuthLoginMain } from "src/dtos";
import { PoolClient } from "pg"
import { ConfigService } from "@nestjs/config";

import * as argon from "argon2"
import * as uuid from "uuid"
import { UUID } from "crypto";

@Injectable()
export class AuthLoginService {
  constructor(private database : DatabaseService, private config : ConfigService) {}
  private logger = new Logger

  async AuthLoginMainService(dto : DtoAuthLoginMain) : Promise<string> {

    // 데이터 베이스 꺼내기 
    const pool = this.database.GetClient()
    const client : PoolClient = await pool.connect()

    // 초기 설정
    const user : {user_id : UUID, email : string, password : string, nickname : string} = {
      user_id : uuid.NIL,
      email : "",
      password : "",
      nickname : ""
    }

    try {

      // 트랜젝션 관리
      await client.query("BEGIN")

      // 이메일 확인
      const email_bool = await this.AuthLoginMainCheckEmailFunc(client, dto.email, user)

      if (!email_bool) {
        throw new HttpException({
          mesaage : "이메일을 다시 확인해주시길 바랍니다.",
          status : HttpStatus.CONFLICT
        }, HttpStatus.CONFLICT, {
          cause : "(시스템 오류): 이메일 오류"
        })
      }

      // 비밀번호 확인
      const password_bool = await argon.verify(user.password, dto.password)

      if (!password_bool) {
        throw new HttpException({
          message : "비밀번호를 다시 확인해주세요",
          status : HttpStatus.FAILED_DEPENDENCY
        }, HttpStatus.FAILED_DEPENDENCY, {
          cause : "(시스템 오류): 다른 비밀번호"
        })
      }

      // JWT 토큰화 

      await client.query("COMMIT")

    } catch (err) {

      try {
        await client.query("ROLLBACK")
      } catch (roolback_err) {
        this.logger.log("트랙잭션 롤백 실패")
      }
      throw err
    } finally {
      client.release()
    }


    return "로그인 되었습니다."
  }

  // 이메일 로직 함수
  async AuthLoginMainCheckEmailFunc(client : PoolClient, email : string, user : { user_id : UUID,  email : string, password : string, nickname : string }) : Promise<boolean> {

    const { rows } = await client.query<{ user_id : UUID, email : string, hash : string, nickname : string }>(`
      SELECT user_id, email, hash, nickname FROM ${this.config.get<string>("NEST_APP_DATABASE_USER_TABLE")}
      WHERE email = $1
      `, [ email ])

    if (rows.length === 0) {
      return false
    }

    user.user_id = rows[0].user_id
    user.email = rows[0].email
    user.password = String(rows[0].hash)
    user.nickname = rows[0].nickname

    return true
  }

}