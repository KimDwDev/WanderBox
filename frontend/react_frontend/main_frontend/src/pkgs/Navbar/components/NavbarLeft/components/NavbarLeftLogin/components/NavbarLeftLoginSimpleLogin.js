

export const NavbarLeftLoginSimpleLogin = () => {

  // 애플과 구글 로고 가져오기
  const aws_s3_bucket_name = process.env.REACT_APP_AWS_S3_BUCKET
  const aws_s3_region_name = process.env.REACT_APP_AWS_S3_REGION
  
  // 구글 로고
  const google_logo_name = "imgs/googleLogo.png"
  const google_logo = `https://${aws_s3_bucket_name}.s3.${aws_s3_region_name}.amazonaws.com/${google_logo_name}`

  // 애플 로고
  const apple_logo_name = "imgs/appleLogo.png"
  const apple_logo = `https://${aws_s3_bucket_name}.s3.${aws_s3_region_name}.amazonaws.com/${apple_logo_name}`

  return (
    <div className = "navbar-left-login-simplelogin-container">

      {/* 간편하게 로그인 하라는 문구가 있음 */}
      <div className = "simple-login-text">
        SNS 계정으로 간편 로그인
      </div>

      {/* 소셜 로그인 버튼 */}
      <div className = "simple-login-buttons">

        {/* 구글 이용 */}
        <button className = "social-button-google">

          {/* 구글 이미지 */}
          <img src = {google_logo} alt = "구글 로고" className = "google-logo"/>

          <span className = "google-text">google</span>
        </button>

        {/* 애플 이용 */}
        <button className = "social-button-apple">

          {/* 애플 이미지 */}
          <img src = {apple_logo} alt = "애플 로고" className = "apple-logo" />

          <span className = "apple-text">apple</span>
        </button>

      </div>

    </div>
  )
}