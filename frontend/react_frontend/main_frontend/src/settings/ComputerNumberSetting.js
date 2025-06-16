import { useEffect, useState } from "react"

export const useComputerNumberSetting = () => {

  const [ computerNumber, setComputerNumber ] = useState(undefined)

  useEffect(() => {

    // 쿠키에 데이터가 존재하는지 확인
    const init_cokkie = localStorage.getItem("wanderbox_computer_number")

    if (init_cokkie) {
      setComputerNumber(init_cokkie)
    }
  }, [])

  return { computerNumber, setComputerNumber }
}