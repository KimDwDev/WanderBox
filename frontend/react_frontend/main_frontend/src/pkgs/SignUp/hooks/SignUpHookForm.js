import * as yup from "yup"
import { useForm } from "react-hook-form"
import { yupResolver } from "@hookform/resolvers/yup"
import { SignUpFunctionForm } from "../functions"
import { useNavigate } from "react-router-dom"

export const useSignUpForm = () => {
    const navigate = useNavigate()

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
    
    const { register, handleSubmit, formState : { errors }, setError } = useForm({
      resolver : yupResolver(schema)
    })
  
    const onSubmit = async (data) => {
      try {
        // 필수 사항을 확인 
        const terms = document.querySelectorAll(".part-checkbox-div .part-checkbox-row")

        for ( let i = 0; i < 3; i ++ ) {

          const term = terms[i].querySelector("input").checked

          if (term === false) {
            alert("필수 사항은 모두 체크해주셔야 합니다.")
            throw new Error("필수 사항은 모두 체크해주셔야 합니다.")
          }

        }
        
        data["term_agree_3"] = terms[3].querySelector("input").checked
        
        // 초기설정
        const backend_url = process.env.REACT_APP_BACKEND_NODE_HOST
        const url = `${backend_url}/auth/signup/main`
        const signup_term_class = new SignUpFunctionForm(url)

        // 회원가입 실행
        const res_datas = await signup_term_class.SignUpFormMainFunc(data, setError)

        alert(res_datas["message"])
  
        navigate("/")

      } catch (err) {
        throw err
      }
    }

    return { register, handleSubmit, errors, onSubmit }
}