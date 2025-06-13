

export const SignUpToggle = ({ toggleId, setToggleId }) => {
  return (
    <div className = "signup-toggle-overlay">
      <div className = "signup-toggle-container">

        {/* 맨 위 */}
        <div className = "toggle-top">

          {/* x */}
          <div className = "toggle-top-x-div">
            <button 
            className = "toggle-top-x-button"
            onClick={() => setToggleId(undefined)}
            type = "button"
            >x</button>
          </div>

          {/* 설명 */}
          <div className = "toggle-top-text-div">
            <div className = "toggle-top-text-button">이용약간</div>
          </div>

        </div>

        {/* 내용이 들어갈 자리 */}
        <div className = "toggle-mid">

          <div className = "toggle-mid-text">
            {
              `
                ${toggleId}에 토글을 클릭했습니다.
              `
            }
          </div>

        </div>
      </div>
    </div>
  )
}