import { useCallback } from "react"

export const useNavbarTopLogoHookClickMain = () => {
    const clickLogo = useCallback((event) => {

    if (event.target.className === "navbartop-logo-img") {
      window.location.href = "/"
    }

  },[ ])

  return { clickLogo }
}