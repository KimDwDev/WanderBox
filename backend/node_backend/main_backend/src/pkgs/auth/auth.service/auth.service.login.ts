import { HttpException, HttpStatus, Injectable, Logger } from "@nestjs/common";
import { DatabaseService } from "src/database";
import { DtoAuthLoginMain, Payload, Sub } from "src/dtos";
import { PoolClient } from "pg"
import { ConfigService } from "@nestjs/config";

import * as argon from "argon2"
import * as uuid from "uuid"
import { UUID } from "crypto";
import { JwtService } from "@nestjs/jwt";

@Injectable()
export class AuthLoginService {
  constructor(private database : DatabaseService, private config : ConfigService, private jwt : JwtService) {}
  private logger = new Logger

  // computer_number, access_token 배출
  async AuthLoginMainService(dto : DtoAuthLoginMain) : Promise<string[]> {

    // 데이터 베이스 꺼내기 
    const pool = this.database.GetClient()
    const client : PoolClient = await pool.connect()

    // 초기 설정
    const user : {user_id : UUID, email : string, password : string, nickname : string, provider : string} = {
      user_id : uuid.NIL,
      email : "",
      password : "",
      nickname : "",
      provider : "",
    }

    try {

      // 트랜젝션 관리
      await client.query("BEGIN")

      // 이메일 로직 확인
      const email_bool = await this.AuthLoginMainCheckEmailFunc(client, dto.email, user)

      // 이 이메일이 구글이나 애플로 로그인한것인지 확인하는 로직 
      if ( user && user.provider ) {
        throw new HttpException({
          status : HttpStatus.EXPECTATION_FAILED,
          message : `해당 계정은 ${user.provider} 로그인으로만 이용 가능합니다.`
        }, HttpStatus.EXPECTATION_FAILED, {
          cause : `${user.provider} 로그인이 필요함`
        })
      }

      // 이메일 확인
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
      const tokens = await this.AuthLoginMainMakeJwtFunc(user.user_id, user.email, user.nickname)
      
      // 유저 정보 업데이트
      const [ computer_number, access_token ] = await this.AuthLoginMainUpdateUserFunc(client, user.user_id, tokens)

      await client.query("COMMIT")

      return [ computer_number, access_token ]

    } catch (err) {
      this.logger.log(`시스템 오류: ${err}`)
      try {
        await client.query("ROLLBACK")
      } catch (roolback_err) {
        this.logger.log("트랙잭션 롤백 실패")
      }
      throw err
    } finally {
      client.release()
    }
  }

  // 이메일 로직 함수
  async AuthLoginMainCheckEmailFunc(client : PoolClient, email : string, user : { user_id : UUID,  email : string, password : string, nickname : string, provider: string }) : Promise<boolean> {

    const { rows } = await client.query<{ user_id : UUID, email : string, hash : string, nickname : string, provider : string }>(`
      SELECT user_id, email, hash, nickname, provider FROM ${this.config.get<string>("NEST_APP_DATABASE_USER_TABLE")}
      WHERE email = $1
      `, [ email ])

    if (rows.length === 0) {
      return false
    }

    user.user_id = rows[0].user_id
    user.email = rows[0].email
    user.password = String(rows[0].hash)
    user.nickname = rows[0].nickname
    user.provider = rows[0].provider

    return true
  }

  // jwt 토큰화
  async AuthLoginMainMakeJwtFunc(user_id : UUID, email : string, nickname : string) : Promise<string[]> {

    // payload 제작
    const payload : Payload = {
      user_id,
      sub : {
        email,
        nickname
      }
    }

    // 토큰화 하기
    const secret_jwt_box : string[] = [ this.config.get<string>("NEST_APP_JWT_ACCESS_TOKEN"), this.config.get<string>("NEST_APP_JWT_REFRESH_TOKEN") ]
    const jwt_time_box : string[] = [ this.config.get<string>("NEST_APP_JWR_ACCESS_TIME"), this.config.get<string>("NEST_APP_JWT_REFRESH_TIME")  ]

    const MakeJwtFunc : Promise<string>[] = secret_jwt_box.map(async(secret, idx) => {
      try{
        const token = await this.jwt.signAsync(payload, {
          secret,
          expiresIn : jwt_time_box[idx]
      })
        return token}
      catch (err) {
        throw new HttpException({
          message : "JWT토큰을 생성하는데 오류가 발생했습니다.",
          status : HttpStatus.INTERNAL_SERVER_ERROR,
        }, HttpStatus.INTERNAL_SERVER_ERROR, {
          cause : `시스템 오류: JWT토큰을 만드는데 오류 발생 ${err}`
        })
      }
    })

    const tokens = await Promise.all(MakeJwtFunc)

    return tokens

  }

  // 유저 정보 업데이트
  async AuthLoginMainUpdateUserFunc(client : PoolClient, user_id : UUID, tokens : string[]) : Promise<string[]> {

    // uuid 생성
    const computer_number = uuid.v4()

    // 정보 부터 업데이트
    try {
        await client.query(`
        INSERT INTO ${this.config.get<string>("NEST_APP_DATABASE_USER_AUTH_TABLE")}
        (user_id, access_token, refresh_token, computer_number)
        VALUES
        ($1, $2, $3, $4) 
        ON CONFLICT (user_id)
        DO UPDATE 
        SET
          access_token = EXCLUDED.access_token,
          refresh_token = EXCLUDED.refresh_token,
          computer_number = EXCLUDED.computer_number
        `,
        [user_id, ...tokens, computer_number ])
    } catch (err) {
        this.logger.log(`시스템 오류: ${err}`)
        throw new HttpException({
          message : "데이터 베이스에 유저 정보를 업데이트 하는데 오류가 발생했습니다.",
          status : HttpStatus.INTERNAL_SERVER_ERROR,
        }, HttpStatus.INTERNAL_SERVER_ERROR, {
        cause : "시스템 오류: 데이터 베이스에 정보를 업데이트 하는데 오류가 발생했습니다."
        })

    }

    // access_token은 httpOnly token으로 보내야 하고 computer_number는 클라이언트에게 보내야 하기 때문에.
    return [computer_number, tokens[0]]
  }

}