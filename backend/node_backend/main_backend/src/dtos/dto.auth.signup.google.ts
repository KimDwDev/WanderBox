import { IsEmail, IsNotEmpty, IsString } from "class-validator";


export class DtoAuthSignUpGoogle {

  @IsString()
  @IsNotEmpty()
  id : string;

  @IsNotEmpty()
  @IsEmail()
  email : string;

  @IsNotEmpty()
  @IsString()
  provider : string;

}