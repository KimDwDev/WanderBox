// css 파일
import "./assets/css/SignUp.css"

// 컴퍼넌트 파일들
import { SignUpMain, SignUpMid, SignUpBottom, SignUpTop, SignUpToggle } from "./components"

// 임포트 파일
import { useState } from "react"

// hook 파일
import { useSignUpForm } from "./hooks"


export const SignUp = () => {

  // 토글이 올라오도록 처리해주는 변수
  const [ toggleId, setToggleId ] = useState(undefined)

  // 회원가입과 관련되었음
  const { register, handleSubmit, errors, onSubmit } = useSignUpForm()

  return (

    <div className = "signup-container">
      
      {/* 회원 가입 맨 위 */}
      <SignUpTop />

      {/* 회원 가입 중간 */}
      <SignUpMid />
      
      {/* 회원 가입이 진행된는 부분 */}
      <form onSubmit = {handleSubmit(onSubmit)}>
        {/* 회원 가입 메인 */}
        <SignUpMain register = { register } errors = { errors } />

        {/* 토글 부분 */}
        {
          toggleId && <SignUpToggle toggleId = {toggleId} setToggleId = {setToggleId}/>
        }
        {/* 회원 가입 아래부분 */}
        <SignUpBottom setToggleId = {setToggleId} />

        {/* 회원가입 버튼 */}
        <button type = "submit" className = "signup-container-submit-btn">회원 가입</button>

      </form>

    </div>

  )
}