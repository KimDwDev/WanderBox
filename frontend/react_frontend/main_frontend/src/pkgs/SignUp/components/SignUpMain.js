

export const SignUpMain = ({ register, errors }) => {

  return (
    <div className = "signup-main-container">        
      {/* 이메일 */}
      <div className = "email-form">
        <label htmlFor = "signup-main-email-input">이메일</label>
        <input 
          type = "text" 
          id = "signup-main-email-input" 
          placeholder = "이메일을 입력하세요"
          { ...register("email") }
        />
        <div className = "error-message">
          { errors.email?.message && <p>{errors.email.message}</p> }
        </div>
      </div>

      {/* 비밀번호 */}
      <div className = "password-form">
        <label htmlFor = "signup-main-password-input">비밀번호</label>
        <input 
          type = "password"
          id = "signup-main-password-input"
          placeholder = "비밀번호를 입력하세요"
          { ...register("password") }
        />
        <div className = "error-message">
          { errors.password?.message && <p>{errors.password.message}</p> }
        </div>
      </div>

      {/* 비밀번호 확인 행 */}
      <div className = "password-confirm-form">
        <label htmlFor = "signup-main-password-confirm-inputs">비밀번호 확인</label>
        <input 
          type = "password"
          id = "signup-main-password-confirm-input"
          placeholder = "비밀번호를 다시 입력하세요"
          { ...register("confirm_password") }
        />
        <div className = "error-message">
          { errors.confirm_password?.message && <p>{errors.confirm_password.message}</p> }
        </div>
      </div>

      {/* 닉네임 행 */}
      <div className = "nickname-form">
        <label htmlFor = "signup-main-nickname-input">닉네임</label>
        <input 
          type = "text"
          id = "signup-main-nickname-input"
          placeholder = "닉네임을 입력하세요"
          { ...register("nickname") }
        />
        <div className = "error-message">
          { errors.nickname?.message && <p>{errors.nickname.message}</p> }
        </div>
      </div>
    </div>
  )
}