// 모듈들
import { HttpException, HttpStatus, Injectable, Logger } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { Pool, PoolClient } from "pg"
import * as argon from "argon2"

// 사용하는 모듈
import { DatabaseService } from "src/database";
import { DtoAuthSignUpMain } from "src/dtos";

@Injectable()
export class AuthSignUpService {
  constructor (private database : DatabaseService, private config: ConfigService) {}
  private log = new Logger

  async AuthSignUpMainService(dto : DtoAuthSignUpMain) : Promise<string> {

    // 데이터 베이스 객체 가져오기
    const pool = this.database.GetClient()
    const client : PoolClient = await pool.connect()

    // 회원가입 로직
    try {
      // 트랙잭션
      await client.query("BEGIN")

      // 이메일 중복성 확인
      // 개선사항: 인덱스를 확인하고 빠르게 데이터를 찾는 로직으로 변환
      const email_bool : boolean = await this.AuthSignUpMainCheckEmailFunc(client,dto.email)

      if ( !email_bool ) {
        throw new HttpException({
          message : "이미 존재하는 이메일 입니다.",
          status : HttpStatus.EXPECTATION_FAILED,
        }, HttpStatus.EXPECTATION_FAILED, {
          cause : "시스템 오류: 이메일 중복"
        })
      }      
  
      // 닉네임 중복성 확인
      // 개선사항: 인덱스를 확인하고 빠르게 데이터를 찾는 로직으로 변환
      const nickname_bool : boolean = await this.AuthSignUpMainCheckNickNameFunc(client, dto.nickname)

      if (!nickname_bool) {
        throw new HttpException({
          message : "이미 존재하는 닉네임 입니다.",
          status : HttpStatus.CONFLICT,
        }, HttpStatus.CONFLICT, {
          cause : "시스템 오류: 닉네임 중복"
        })
      }

      // 비밀번호 해시화
      const hash : string = await argon.hash(dto.password)

      if ( !hash ) {
        throw new HttpException({
          message : "비밀번호 해싱화 오류",
          status : HttpStatus.INTERNAL_SERVER_ERROR,
        }, HttpStatus.INTERNAL_SERVER_ERROR, {
          cause : "시스템 오류: 비밀번호를 해쉬화 하는데 오류가 발생했습니다."
        })
      }
      
      // 저장
      const message = await this.AuthSignUpMainSaveDatabaseFunc(client, dto, hash)

      await client.query("COMMIT")
      this.log.log(message)
    } catch (err) {

      try {
        await client.query("ROLLBACK")
      } catch (roolbacke_err) {
        this.log.error("트랙잭션 롤백 실패")
      }
      this.log.error(err)
      throw err
    } finally {
      client.release()      
    }

    return "회원가입 완료"
  }
  
  // 이메일 확인
  async AuthSignUpMainCheckEmailFunc(client : PoolClient, email : string) : Promise<boolean> {

    const {rows : existing} = await client.query<{id:number}>(
      `
      SELECT id FROM ${this.config.get<string>("NEST_APP_DATABASE_USER_TABLE")}
      WHERE email = $1
      `,
      [email]
    );

    if ( existing.length > 0 ) {
      return false
    }

    return true
  }

  // 닉네임 확인
  async AuthSignUpMainCheckNickNameFunc(client : PoolClient, nickname : string) : Promise<boolean> {

    const { rows : existing } = await client.query(
      `
      SELECT id FROM ${this.config.get<string>("NEST_APP_DATABASE_USER_TABLE")}
      WHERE nickname = $1
      `,
      [nickname]
    )

    if ( existing.length > 0 ) {
      return false
    }
    
    return true
  }
  
  // 회원가입
  async AuthSignUpMainSaveDatabaseFunc(client : PoolClient, dto : DtoAuthSignUpMain, hash : string) : Promise<string> {

    const _ = await client.query(
      `
      INSERT INTO ${this.config.get<string>("NEST_APP_DATABASE_USER_TABLE")}
      (email, hash, nickname, term_agree_3)
      VALUES
      ($1, $2, $3, $4)
      `,
      [ dto.email, hash, dto.nickname, dto.term_agree_3 ]
    )

    return "데이터 베이스에 회원정보 저장 완료"
  }

}