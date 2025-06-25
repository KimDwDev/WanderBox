import { ExecutionContext, HttpException, HttpStatus, Injectable, Logger } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";
import { DatabaseService } from "src/database";
import { Pool, PoolClient } from "pg";
import { ConfigService } from "@nestjs/config";


@Injectable()
export class GoogleSignUpGuard extends AuthGuard("google_signup") {
  private logger = new Logger
  constructor(private database:DatabaseService, private config : ConfigService) {super()}

  async canActivate(context: ExecutionContext): Promise<boolean>  {

    
    const activate = await super.canActivate(context) as boolean

    // 예전에 홈페이지에 가입한 이력이 있는지 확인하는 로직 필요
    // 이미 가입한 전적이 있는가 확인
    const pool : Pool = this.database.GetClient();
    const client : PoolClient = await pool.connect();
    try {
      const request = context.switchToHttp().getRequest();

      // 값을 읽고 검증 시작
      const { id, email, provider } = this.GetContextData(request);

      
      // 트랙젝션
      await client.query("BEGIN")

      // 유저의 정보를 가져옴
      const dbData = {
        provider : "",
        provider_id : "",
      }
      const unautorized_bool = await this.GetUserData(client, email, dbData);
      if (unautorized_bool) {
        // 만약 provider와 id가 일치하다면 기존의 가입한적있는 유저
        if (id === dbData.provider_id && provider === dbData.provider) throw new HttpException({
          message : "기존에 가입했었던 유저입니다.",
          status : HttpStatus.CONFLICT,
        }, HttpStatus.CONFLICT, {
          cause : "(시스템 오류): 가입 유저"
        })

        // id나 provider에 값이 없다면 메인 페이지로 가입했던 유저
        if ( !dbData.provider || !dbData.provider_id ) throw new HttpException({
          message : "메인 페이지로 가입했었던 유저입니다.",
          status : HttpStatus.NOT_ACCEPTABLE
        }, HttpStatus.NOT_ACCEPTABLE, {
          cause : "(시스템 오류): 메인 페이지 가입 유저",
        })

        // provider가 다르다면 
        if ( dbData.provider !== provider ) throw new HttpException({
          message : "애플로 가입했었던 유저입니다.",
          status : HttpStatus.EXPECTATION_FAILED
        }, HttpStatus.EXPECTATION_FAILED, {
          cause : "(시스템 오류): 애플로 가입한 유저"
        })
      }
      context.switchToHttp().getRequest()["wanderbox_data"] = {
        id, email, provider
      }

      await client.query("COMMIT");

    } catch (err) {
      try {
        await client.query("ROLLBACK");
      } catch (roolbacke_err) {
        throw new HttpException({
          message : "롤백 하는데 오류가 발생했습니다.",
          status : HttpStatus.INTERNAL_SERVER_ERROR,
        }, HttpStatus.INTERNAL_SERVER_ERROR, {
          cause : "(시스템 오류): 롤백 오류"
        })
      }
      this.logger.log(err.cause)
      throw err;
    } finally {
      client.release();
    }

    return activate
  }

  GetContextData(request : any) : {id : string, email : string, provider : string} {
      const requestValue = request.user;
      const email = requestValue.emails[0].value;
      const provider = requestValue.provider;
      const id = requestValue.id;
      return {id, email, provider};
  }

  async GetUserData(client : PoolClient, email : string, dbData : { provider : string, provider_id : string }) : Promise<boolean> {

    const { rows } = await client.query(`
      SELECT provider, provider_id FROM ${this.config.get<string>("NEST_APP_DATABASE_USER_TABLE")}
      WHERE email = $1
      `, [ email ]);
    
    if (rows.length === 0) return false;
    
    dbData.provider = rows[0]["provider"];
    dbData.provider_id = rows[0]["provider_id"];
    return true;
  }

}