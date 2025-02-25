import { api } from "../../config/axios";
import { UserLogin } from "../../interface/user";

export const Login = async(formdata: UserLogin)=>{
  try {
    const {data} = await api.post('/auth/login', formdata)
    return data
  } catch (error) {
    console.log(error)
  }
}
