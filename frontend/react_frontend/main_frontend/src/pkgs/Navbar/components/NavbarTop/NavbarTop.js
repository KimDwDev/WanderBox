// css 파일
import "./assets/css/NavbarTop.css"

// components 들
import { NavbarTopLogo, NavbarTopMid } from "./components"

export const NavbarTop = () => {
  return (
    <div className = "navbartop-container">

      {/* 네브바 Logo를 담당 */}
      <NavbarTopLogo />

      {/* 네브바 mid를 담당 */}
      <NavbarTopMid />
    </div>
  )
}