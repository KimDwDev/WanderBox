

export class MainLeftLoginFunctionForm{

  constructor (url) {
    this.url = url
  }

  async MainLoginForm(datas, setError) {

    try {

      const response = await fetch(this.url, {
        method : "POST",
        headers : {
          "Content-Type" : "application/json; charset=utf-8",
          "X-Requested-With" : "XMLHttpRequest",
        },
        body : JSON.stringify(datas),
        credentials : "include",
      })

      if (!response.ok) {

        if (response.status === 404) {
          alert("클라이언트에 보내는 폼에 문제가 있습니다.")
          throw new Error("클라이언트 폼에 문제 발생")
        } else if (response.status === 409){
          setError("email", {
            type : "manual",
            message : "이메일 주소를 다시 확인해 주세요."
          })
          throw new Error("이메일 주소를 다시 확인해 주세요.")
        } else if (response.status === 424) {
          setError("password", {
            type : "manual",
            message : "비밀번호가 일치하지 않습니다.",
          })
          throw new Error("비밀번호가 일치하지 않습니다.")
        } else if (response.status === 417) {
          setError("email", {
            type : "manual",
            message : "해당 계정은 구글 또는 애플 로그인으로만 이용 가능합니다.",
          })
          throw new Error("해당 계정은 구글 또는 애플 로그인으로만 이용 가능합니다.")
        } else if (response.status === 500) {
          alert("서버에 오류가 발생했습니다.")
          throw new Error("서버에 오류가 발생했습니다.")
        } else {
          alert("오류가 발생했습니다.")
          throw new Error(`오류가 발생했습니다: ${response.status}`)
        }
      }

      const res_data = await response.json()
      return res_data

    } catch (err) {
      throw err
    }
  }
}