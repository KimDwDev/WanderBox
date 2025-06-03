// 모듈들
import { useNavbarLeftLoginHookGoSignUpBtn } from "../hooks"

export const MainLeftLoginSearchAndSignUpPannel = () => {

  const { clickSignUpBtnHook } = useNavbarLeftLoginHookGoSignUpBtn()

  return (
    <div className = "main-left-login-searchandsignuppannel-container">

      {/* 아이디랑 비밀번호 찾기 */}
      <div className = "login-search-links">
        <button className = "email-search-button">이메일 찾기</button>
        <button className = "password-search-button">비밀번호 찾기</button>
      </div>  

      {/* 회원가입 버튼 */}
      <button className="signup-button" onClick = {clickSignUpBtnHook}>회원가입</button>

    </div>
  )
}