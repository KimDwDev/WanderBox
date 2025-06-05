import { Type } from "class-transformer"
import { IsBoolean, IsEmail, IsNotEmpty, IsString, Matches, MaxLength, MinLength } from "class-validator"

export class DtoAuthSignUpMain {

  // 이메일
  @IsNotEmpty({
    message : "이메일을 입력하세요."
  })
  @IsEmail({
    allow_utf8_local_part : false
  }, {
    message :"유효한 이메일 주소를 입력하세요."
  })
  @MaxLength(200, {
    message : "이메일은 200자 이내로 입력해 주세요."
  })
  email : string

  // 비밀번호
  @IsNotEmpty({
    message : "비밀번호를 입력하세요."
  })
  @IsString({
    message : "비밀번호는 문자열이어야 합니다."
  })
  @MinLength(
    6,
    {
      message : "비밀번호는 최소 6자 이상이어야 합니다."
    }
  )
  @MaxLength(
    20,
    {
      message : "비밀번호는 20자 이내로 입력해 주세요."
    }
  )
  @Matches(
    /^(?=.*[A-Za-z])(?=.*\d)(?=.*[^A-Za-z0-9]).+$/,
    {
      message : "비밀번호는 최소 1개 이상의 문자, 숫자, 특수문자를 모두 포함해야 합니다."
    }
  )
  password : string

  @IsNotEmpty({
    message : "닉네임을 입력하세요."
  })
  @IsString({
    message : "닉네임은 문자열이어야 합니다."
  })
  @MaxLength(30, {
    message : "닉네임은 30자 이내로 입력해 주세요."
  })
  nickname : string

  @IsNotEmpty({
    message : "약관 동의 여부를 보내주세요."
  })
  @Type(() => Boolean)
  @IsBoolean({
    message : "약관 동의 여부는 true 혹은 false이어야 합니다."
  })
  term_agree_3 : boolean

}