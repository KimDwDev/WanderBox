import { useCallback } from "react"

export const useSignUpHookAllCheck = () => {

  const clickAllBotton = useCallback((event) => {

    if (event.target.id === "signup-toggle-check-all") {
      
      // 초기 설정
      const subCheckClass = document.querySelectorAll(".signup-bottom-container .part-checkbox-div .part-checkbox-row")
      const all_check_value = event.target.checked

      subCheckClass.forEach((checkBox) => {
        checkBox.querySelector("input").checked = all_check_value
      })

    }

  }, [])

  return { clickAllBotton }

}