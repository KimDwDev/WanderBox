

export const NavbarLeftLoginMain = () => {
  return (
    <div className = "navbar-left-login-main-container">

      {/* ID 저장 체크 박스 */}
      <div className = "login-save-id">

        <input type = "checkbox" id = "navbar-left-login-main-saveId" className = "save-id-checkbox" />
        <label className = "save-id-label" htmlFor = "navbar-left-login-main-saveId">
          ID 저장
        </label>

      </div>

      {/* 이메일 비밀번호 누르는 장소 */}
      <div className = "email-password-div-box">

        <div className = "email-div-box">
          <input 
            type = "text"
            placeholder = "이메일"
            className = "email-input"
          />
        </div>

        <div className = "password-div-box">
          <input
            type = "password"
            placeholder = "비밀번호"
            className = "password-input" 
          />
        </div>
      </div>

      {/* 로그인 버트 */}
      <button className = "login-button">로그인</button>
    </div>
  )
}