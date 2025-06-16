// css 파일
import "./assets/css/MainLeftLogin.css"

// 컴퍼넌트 파일
import { MainLeftLoginMain, MainLeftLoginSearchAndSignUpPannel, MainLeftLoginSimpleLogin } from "./components"

export const MainLeftLogin = () => {
  

  return (
    <div className = "main-left-login-container">
      
      {/* 로그인이 이루어지는 메인 장소 */}
      <MainLeftLoginMain />

      {/* 아이디 비밀번호 찾기 등이 이루어지는 장소 */}
      <MainLeftLoginSearchAndSignUpPannel />

      {/* 구글 애플등에 로그인이 이루어 지는 장소 */}
      <MainLeftLoginSimpleLogin />

    </div>
  )
}