// css 파일
import "./assets/css/Navbar.css"

// component 파일
import { NavbarLeft, NavbarMid, NavbarTop } from "./components"

export const Navbar = () => {

  return (
    <div className = "navbar-container">

      {/* 네브바에 가장 위쪽 */}
      <NavbarTop />

      {/* 네브바에 중간 */}
      <NavbarMid />

      {/* 네브바에 왼쪽 */}
      <NavbarLeft />

    </div>
  )

}