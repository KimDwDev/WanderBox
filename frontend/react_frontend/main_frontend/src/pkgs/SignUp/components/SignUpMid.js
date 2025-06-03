

export const SignUpMid = () => {

  // aws에 버킷이름과 지역이름
  const aws_s3_bucket_name = process.env.REACT_APP_AWS_S3_BUCKET
  const aws_region_name = process.env.REACT_APP_AWS_S3_REGION

  // 구글 이름
  const google_logo_name = "imgs/googleLogo.png"
  const google_logo = `https://${aws_s3_bucket_name}.s3.${aws_region_name}.amazonaws.com/${google_logo_name}`

  // 애플 이름
  const apple_logo_name = "imgs/appleLogo.png"
  const apple_logo = `https://${aws_s3_bucket_name}.s3.${aws_region_name}.amazonaws.com/${apple_logo_name}`

  return (
    <div className = "signup-mid-container">

      {/* 구글 회원가입 */}
      <button className = "social-google-btn">
        <img 
          src = {google_logo}
          alt = "구글 로고"
          className = "google-logo"
        />
        <span>구글 회원가입</span>
      </button>

      {/* 애플 회원가입 */}
      <button className = "social-apple-btn">
        <img 
          src = {apple_logo}
          alt = "애플 로고"
          className = "apple-logo"
        />
        <span>애플 회원가입</span>
      </button>

    </div>
  )
}