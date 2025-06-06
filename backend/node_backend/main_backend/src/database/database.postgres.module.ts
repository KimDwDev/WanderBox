import { Global, Module } from "@nestjs/common";
import { DatabaseService } from "./database.postgres.servcie";
import { ConfigService } from "@nestjs/config";

@Global()
@Module({
  providers : [
    ConfigService,
    DatabaseService
  ],
  exports : [
    DatabaseService
  ]
})
export class DatabaseModule {}