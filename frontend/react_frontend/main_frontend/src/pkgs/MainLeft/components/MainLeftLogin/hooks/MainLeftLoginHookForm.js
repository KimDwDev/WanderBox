// 패키지
import * as yup from "yup"
import { useForm } from "react-hook-form"
import { yupResolver } from "@hookform/resolvers/yup"
import { MainLeftLoginFunctionForm } from "../functions"

export const useMainLeftLoginHookForm = () => {
    // 로그인을 위한 요소
  const schema = yup.object({
    email : yup
    .string()
    .email("올바른 이메일 형식을 입력해 주세요.")
    .required("이메일은 필수 입력 항목입니다."),

    password : yup
    .string()
    .min(6, "비밀번호는 최소 6자 이상이어야 합니다.")
    .max(20 , "비밀번호는 최대 20자 이하여야 합니다.")
    .required("비밀번호는 필수 입력 항목입니다.")
  })

  const { register, handleSubmit, formState : {errors}, setError } = useForm({
    resolver : yupResolver(schema)
  })

  const onSubmit = async (data) => {

    const url = process.env.REACT_APP_BACKEND_NODE_HOST

    const login_class = new MainLeftLoginFunctionForm(`${url}/auth/login/main`) 

    const res_data = await login_class.MainLoginForm(data, setError)

    if (res_data) {
      console.log(res_data)
    }

  }

  return { register, handleSubmit, errors, onSubmit }
}