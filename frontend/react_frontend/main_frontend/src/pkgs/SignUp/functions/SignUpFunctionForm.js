

export class SignUpFunctionForm {

  constructor(url) {
    this.url = url
  }

  async SignUpFormMainFunc(datas, setError) {

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

    // 오류가 발생할시 
    if (!response.ok) {
      
      if (response.status === 404) {
        alert("클라이언트에 값을 다시 확인해주시길 바랍니다.")
        throw new Error("클라이언트에 값을 다시 확인해주시길 바랍니다.")
      } else if (response.status === 417) {
        setError("email", {
          type : "manual",
          message : "중복된 이메일 입니다.",
        })
        throw new Error("이메일이 중복되었습니다.")
      } else if (response.status === 409) {
        setError("nickname", {
          type : "manual",
          message : "중복된 닉네임 입니다."
        })
        throw new Error("닉네임이 중복되었습니다.")
      } else if (response.status === 500) {
        alert("서버에 오류가 발생했습니다.")
        throw new Error("서버에 오류가 발생했습니다.")
      } else {
        alert("오류 발생")
        throw new Error(`오류 발생: ${response.text}`)
      }
    } 

    const res_data = await response.json()
    return res_data

    } catch (err) {
      throw err
    }
  }

}