import { Injectable, Logger, OnModuleDestroy, OnModuleInit } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { Pool, Client } from "pg"

@Injectable()
export class DatabaseService implements OnModuleInit, OnModuleDestroy {

  private pool : Pool
  private log = new Logger

  constructor (private config: ConfigService) {}

  async onModuleInit() {

    // 데이터베이스 연결
    this.pool = new Pool({
      host : this.config.get<string>("NEST_APP_DATABASE_HOST"),
      port : this.config.get<number>("NEST_APP_DATABASE_PORT"),
      user : this.config.get<string>("NEST_APP_DATABASE_USER"),
      password : this.config.get<string>("NEST_APP_DATABASE_PASSWORD"),
      database : this.config.get<string>("NEST_APP_DATABASE_NAME"),
    })

    // connect가 연결 될때 마다 스키마 설정 
    this.pool.on("connect", (client : Client) => {
      client.query(`SET search_path TO ${this.config.get("NEST_APP_DATABASE_SCHEMA")}`)
    })
    
    // 에러 상황 확인
    this.pool.on("error", (err : Error) => {
      this.log.error(`에러 발생: 에러내용 ${err}`)
    })

  }

  async onModuleDestroy() {
    await this.pool.end()
    this.log.log("데이터 베이스가 닫힙니다.")
  }

  GetClient() : Pool {
    return this.pool
  }

}