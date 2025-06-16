import { useSignUpHookAllCheck, useSignUpHookGetToggle } from "../hooks"


export const SignUpBottom = ({ setToggleId }) => {
  
  // 모두 체크가 되도록 해주는 함수
  const { clickAllBotton } = useSignUpHookAllCheck()

  // 보기 버튼을 클릭했을때 설명이 나오도록 하는 함수
  const { clickToggleBtn } = useSignUpHookGetToggle(setToggleId)


  return (
    <div className = "signup-bottom-container">

      {/* 전체 동의 */}
      <div className = "checkbox-row">
        <input type = "checkbox" id = "signup-toggle-check-all" onChange = {clickAllBotton}/>
        <label htmlFor = "signup-toggle-check-all">전체 동의</label>
      </div>

      {/* 부분 동의 */}
      <div className = "part-checkbox-div">

        {/* 만 14세 이상 */}
        <div className = "part-checkbox-row">
          <input type = "checkbox" id = "signup-toggle-check_1" />
          <label htmlFor = "signup-toggle-check_1">{"(필수) 만 14세 이상"}</label>
        </div>

        {/* 회원가입 약관 동의 */}
        <div className = "part-checkbox-row">
          <input type = "checkbox" id = "signup-toggle-check_2" />
          <label htmlFor = "signup-toggle-check_2">{"(필수) 회원가입 약관 동의"}</label>
          <button className = "view-btn" onClick = {clickToggleBtn} type = "button">보기 &gt;</button>
        </div>

        {/* 개인정보 수집 및 이용 동의 */}
        <div className = "part-checkbox-row">
          <input type = "checkbox" id = "signup-toggle-check_3" />
          <label htmlFor = "signup-toggle-check_3">{"(필수) 개인정보 수집 및 이용 동의"}</label>
          <button className = "view-btn" onClick = {clickToggleBtn} type = "button">보기 &gt;</button>
        </div>

        {/* 추가 사항 */}
        <div className = "part-checkbox-row">
          <input type = "checkbox" id = "signup-toggle-check_choice" />
          <label htmlFor = "signup-toggle-check_choice">{"(추가) 추가 사항"}</label>
          <button className = "view-btn" onClick = {clickToggleBtn} type = "button">보기 &gt;</button>
        </div>

      </div>

    </div>
  )
}