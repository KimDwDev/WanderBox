import { useCallback } from "react"

export const useSignUpHookGetToggle = (setToggleId) => {
  const clickToggleBtn = useCallback((event) => {

    if (event.target.className === "view-btn") {

      // 해당 값에 div박스를 가져온다
      const target_div = event.target.closest(".part-checkbox-row")

      // 해당 값에 id값을 가져온다
      const target_div_id = target_div.querySelector("input").id

      setToggleId(target_div_id)

    }

  }, [setToggleId])

  return { clickToggleBtn }
}