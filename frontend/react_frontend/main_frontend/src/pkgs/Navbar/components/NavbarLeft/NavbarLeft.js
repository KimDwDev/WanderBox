// css 파일
import "./assets/css/NavbarLeft.css"

// 컴퍼넌트 파일
import { NavbarLeftLogin } from "./components"

export const NavbarLeft = () => {
  return (
    <div className = "navbarleft-container">

      {/* 로그인을 하는 장소 */}
      <NavbarLeftLogin />

    </div>
  )
}