// 패키지
import * as yup from "yup"
import { useForm } from "react-hook-form"
import { yupResolver } from "@hookform/resolvers/yup"


export const MainLeftLoginMain = () => {

  // 로그인을 위한 요소
  const schema = yup.object({
    email : yup
    .string()
    .email("올바른 이메일 형식을 입력해 주세요.")
    .required("이메일은 필수 입력 항목입니다."),

    password : yup
    .string()
    .min(6, "비밀번호는 최소 6자 이상이어야 합니다.")
    .max(20 , "비밀번호는 최대 20자 이하여야 합니다.")
    .required("비밀번호는 필수 입력 항목입니다.")
  })

  const { register, handleSubmit, formState : {errors} } = useForm({
    resolver : yupResolver(schema)
  })

  const onSubmit = (data) => {
    console.log(data)
  }

  return (
    <div className = "main-left-login-main-container">
      <form onSubmit = {handleSubmit(onSubmit)}>

        {/* ID 저장 체크 박스 */}
        <div className = "login-save-id">

          <input type = "checkbox" id = "main-left-login-main-saveId" className = "save-id-checkbox" />
          <label className = "save-id-label" htmlFor = "main-left-login-main-saveId">
            ID 저장
          </label>

        </div>

        {/* 이메일 비밀번호 누르는 장소 */}
        <div className = "email-password-div-box">

          <div className = "email-div-box">
            <input 
              type = "text"
              placeholder = "이메일"
              className = "email-input"
              { ...register("email") }
            />
            <div className = "error-msg">{ errors.email?.message && <p>{ errors.email.message }</p> }</div>
          </div>

          <div className = "password-div-box">
            <input
              type = "password"
              placeholder = "비밀번호"
              className = "password-input"
              { ...register("password") }
            />
            <div className = "error-msg">{ errors.password?.message && <p>{ errors.password.message }</p> }</div>
          </div>
        </div>

        {/* 로그인 버트 */}
        <button className = "login-button">로그인</button>
      </form>
    </div>
  )
}