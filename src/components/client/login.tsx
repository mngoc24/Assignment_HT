
import { useForm } from 'react-hook-form'
import axios from 'axios'
import { IUser } from '../../interface/user'
import { Link } from 'react-router-dom'

const Login = () => {
  const { register, handleSubmit } = useForm<IUser>()
  const onSubmit = async (user: IUser) => {
    try {
      const { data } = await axios.post(` http://localhost:3000/login`, user)
      console.log(data);
      localStorage.setItem("token", data.aaccessToken)
      alert("Login success")
    } catch (error: any) {
      if (error.response) {
        alert(error.response.data)
      }
    }
  }
  return (
    <div className='max-w-3xl mx-auto py-4'>
      <h1 className='text-red-700 text-center font-bold text-[24px]'>Login</h1>
      <form onSubmit={handleSubmit(onSubmit)} className='flex p-4 flex-col gap-2 [&_input]:border [&_input]:px-4 [&_input]:py-1'>
        <input {...register('email')} type='text' placeholder='Email' />
        <input {...register('password')} type='text' placeholder='Mật khẩu' />
        <div className='flex justify-center'>
          <button className='bg-purple-900 text-white px-4 py-2'>Login</button>
        </div>
        <p className="text-center">
          Chưa có tài khoản?
          <span className="text-green-600">
            <Link to="/register">Đăng kí</Link>
          </span>
        </p>
      </form>
    </div>
  )
}

export default Login