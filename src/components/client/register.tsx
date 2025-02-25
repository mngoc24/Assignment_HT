

import axios from 'axios'
import { useForm } from 'react-hook-form'
import { Link } from 'react-router-dom'
import { IUser } from '../../interface/user'

const Register = () => {
    const { register, handleSubmit, formState: { errors } } = useForm<IUser>()
    const onSubmit = async (user: IUser) => {
        try {
            await axios.post(`http://localhost:3000/register`, user)
            alert('Register success')
        } catch (error: any) {
            if (error.response) {
                alert(error.response.data)
            }
        }
    }
    return (
        <>
            <div className='max-w-3xl mx-auto py-4'>
                <h1 className='text-red-700 text-center font-bold text-[24px]'>Register</h1>
                <form onSubmit={handleSubmit(onSubmit)} className='flex p-4 flex-col gap-2 [&_input]:border [&_input]:px-4 [&_input]:py-1'>
                    <input {...register('username')} type='text' placeholder='Họ tên' />
                    <input {...register('email', { required: true, pattern: /^\S+@(\S+\.)+[a-zA-Z]{2,6}$/ })} type='text' placeholder='Email' />
                    {(errors.email) && <span className='text-red-600 text-[12px]'>Email không đúng định dạng</span>}
                    <input {...register('password')} type='text' placeholder='Mật khẩu' />
                    
                    <div className='flex justify-center'>
                        <button className='bg-green-900 text-white px-4 py-2'>Register</button>
                    </div>
                    <p className="text-center">
                        Đã có tài khoản?
                        <span className="text-green-600">
                            <Link to="/login">Đăng nhập</Link>
                        </span>
                    </p>
                </form>
            </div>
        </>
    )
}

export default Register