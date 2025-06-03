import { useCallback } from "react"
import { useNavigate } from "react-router-dom"

export const useNavbarLeftLoginHookGoSignUpBtn = () => {
  const navigate = useNavigate()

  const clickSignUpBtnHook = useCallback((event) => {

    if (event.target.className === "signup-button") {
      navigate("/signup/")
    }

  }, [ navigate ])

  return { clickSignUpBtnHook }
}