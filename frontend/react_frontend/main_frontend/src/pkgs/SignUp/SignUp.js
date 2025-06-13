// css 파일
import { useState } from "react"
import "./assets/css/SignUp.css"

// 컴퍼넌트 파일들
import { SignUpMain, SignUpMid, SignUpBottom, SignUpTop, SignUpToggle } from "./components"



export const SignUp = () => {

  // 토글이 올라오도록 처리해주는 변수
  const [ toggleId, setToggleId ] = useState(undefined)

  return (

    <div className = "signup-container">
      

      {/* 회원 가입 맨 위 */}
      <SignUpTop />

      {/* 회원 가입 중간 */}
      <SignUpMid />

      {/* 회원 가입 메인 */}
      <SignUpMain />

      {/* 토글 부분 */}
      {
        toggleId && <SignUpToggle toggleId = {toggleId} setToggleId = {setToggleId}/>
      }
      {/* 회원 가입 아래부분 */}
      <SignUpBottom setToggleId = {setToggleId} />

      {/* 회원가입 버튼 */}
      <button className = "signup-container-submit-btn">회원 가입</button>

    </div>

  )
}