// css 파일
import "./assets/css/SignUp.css"

// 컴퍼넌트 파일들
import { SignUpMain, SignUpMid, SignUpBottom, SignUpTop } from "./components"



export const SignUp = () => {
  return (

    <div className = "signup-container">
      

      {/* 회원 가입 맨 위 */}
      <SignUpTop />

      {/* 회원 가입 중간 */}
      <SignUpMid />

      {/* 회원 가입 메인 */}
      <SignUpMain />
      
      {/* 회원 가입 아래부분 */}
      <SignUpBottom />

      {/* 회원가입 버튼 */}
      <button className = "signup-container-submit-btn">회원 가입</button>

    </div>

  )
}