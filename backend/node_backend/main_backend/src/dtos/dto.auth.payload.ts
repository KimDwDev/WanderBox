import { Type } from "class-transformer";
import { IsEmail, IsNotEmpty, IsString, IsUUID, MaxLength, ValidateNested } from "class-validator";
import { UUID } from "crypto";


export class Sub {

  @IsNotEmpty()
  @IsEmail()
  email : string 
  
  @IsNotEmpty()
  @IsString()
  @MaxLength(30)
  nickname : string
}

export class Payload {

  @IsNotEmpty()
  @IsUUID()
  user_id : UUID

  @Type(() => Sub)
  @ValidateNested()
  sub : Sub

}