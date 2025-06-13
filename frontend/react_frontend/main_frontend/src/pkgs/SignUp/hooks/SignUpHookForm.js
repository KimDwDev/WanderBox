import * as yup from "yup"
import { useForm } from "react-hook-form"
import { yupResolver } from "@hookform/resolvers/yup"


export const useSignUpForm = () => {

    const schema = yup.object({
      email : yup
      .string()
      .email("유효한 이메일 형식을 입력해주세요.")
      .required("이메일을 입력해주세요."),
  
      password : yup
      .string()
      .min(6, "비밀번호는 최소 6자 이상이어야 합니다.")
      .max(20, "비밀번호는 최대 20자 이내로 입력해주세요.")
      .matches(/^(?=.*[A-Za-z])(?=.*\d)(?=.*[^A-Za-z0-9]).+$/, "비밀번호는 영문·숫자·특수문자를 모두 포함해야 합니다.")
      .required("비밀번호를 입력해주세요."),
  
      confirm_password : yup
      .string()
      .oneOf([ yup.ref("password") ], "비밀번호가 일치하지 않습니다."),
  
      nickname : yup
      .string()
      .max(30, "닉네임은 30자 이내로 입력해주세요.")
      .required("닉네임을 입력해주세요.")
    })
    
    const { register, handleSubmit, formState : { errors } } = useForm({
      resolver : yupResolver(schema)
    })
  
    const onSubmit = (data) => {
      console.log(data)
    }

    return { register, handleSubmit, errors, onSubmit }
}