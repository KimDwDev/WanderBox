// css 파일
import "./assets/css/NavbarLeftLogin.css"

// 컴퍼넌트 파일
import { NavbarLeftLoginMain, NavbarLeftLoginSearchAndSignUpPannel, NavbarLeftLoginSimpleLogin } from "./components"

export const NavbarLeftLogin = () => {
  return (
    <div className = "navbar-left-login-container">
      
      {/* 로그인이 이루어지는 메인 장소 */}
      <NavbarLeftLoginMain />

      {/* 아이디 비밀번호 찾기 등이 이루어지는 장소 */}
      <NavbarLeftLoginSearchAndSignUpPannel />

      {/* 구글 애플등에 로그인이 이루어 지는 장소 */}
      <NavbarLeftLoginSimpleLogin />

    </div>
  )
}