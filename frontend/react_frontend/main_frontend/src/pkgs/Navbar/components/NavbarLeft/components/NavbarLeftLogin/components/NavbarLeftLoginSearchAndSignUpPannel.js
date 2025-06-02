

export const NavbarLeftLoginSearchAndSignUpPannel = () => {
  return (
    <div className = "navbar-left-login-searchandsignuppannel-container">

      {/* 아이디랑 비밀번호 찾기 */}
      <div className = "login-search-links">
        <button className = "email-search-button">이메일 찾기</button>
        <button className = "password-search-button">비밀번호 찾기</button>
      </div>  

      {/* 회원가입 버튼 */}
      <button className="signup-button">회원가입</button>

    </div>
  )
}