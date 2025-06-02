import { useNavbarTopLogoHookClickMain } from "../hooks"

export const NavbarTopLogo = () => {
  
  // aws 버킷이름
  const aws_bucket_name = process.env.REACT_APP_AWS_S3_BUCKET
  const aws_region_name = process.env.REACT_APP_AWS_S3_REGION
  const img_name = "imgs/mainlogo.png"

  // 이미의 url 
  const logo_img_url = `https://${aws_bucket_name}.s3.${aws_region_name}.amazonaws.com/${img_name}`

  // 로고를 클릭하면 메인화면으로 간다
  const { clickLogo } = useNavbarTopLogoHookClickMain()

  return (
    <div className = "navbartop-logo-container">
      
      {/* 이미지 */}
      <img src={ logo_img_url } alt="WanderBox Logo" className = "navbartop-logo-img" onClick = {clickLogo} />

    </div>
  )
}