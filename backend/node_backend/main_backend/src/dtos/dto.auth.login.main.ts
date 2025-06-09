import { IsEmail, IsNotEmpty, IsString, Matches, MaxLength, MinLength } from "class-validator";


export class DtoAuthLoginMain {

  // 이메일
  @IsNotEmpty({
    message : "이메일을 입력해주세요."
  })
  @IsEmail({}, {
    message : "유효한 이메일 주소를 입력해주세요."
  })
  @MaxLength(200, {
    message : "이메일은 최대 200자까지 입력할 수 있습니다."
  })
  email : string


  // 비밀번호
  @IsNotEmpty({
    message : "비밀번호를 입력해주세요."
  })
  @IsString({
    message : "비밀번호는 문자열이어야 합니다."
  })
  @MinLength(6, {
    message : "비밀번호는 최소 6자 이상이어야 합니다."
  })
  @MaxLength(20, {
    message : "비밀번호는 최대 20자까지 입력할 수 있습니다."
  })
  @Matches(
    /^(?=.*[A-Za-z])(?=.*\d)(?=.*[^A-Za-z0-9]).+$/,
    {
      message : "비밀번호는 영문자, 숫자, 특수문자를 모두 포함해야 합니다."
    }
  )
  password : string
}