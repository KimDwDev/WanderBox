// css 파일
import "./assets/css/MainLeft.css"

// 컴퍼넌트 파일
import { MainLeftLogin } from "./components"

export const MainLeft = () => {
  return (
    <div className = "mainleft-container">

      {/* 로그인을 담당하는 부분 */}
      <MainLeftLogin />

    </div>
  )
}