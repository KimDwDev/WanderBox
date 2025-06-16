// 패키지
import { useMainLeftLoginHookForm } from "../hooks"


export const MainLeftLoginMain = () => {
  const { register, handleSubmit, errors, onSubmit } = useMainLeftLoginHookForm()

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