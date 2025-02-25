import React from 'react'
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import { api } from '../../../config/axios'
import { ICategory } from '../../../interface/product'

const AddCategory = () => {
  const { register, handleSubmit, formState: { errors } } = useForm<ICategory>()
  const navigate = useNavigate()
  const addcategory = async (data: ICategory) => {
    try {
      await api.post(`categories`, data)
      alert('Thêm mới thành công')
      navigate('/dashboard/list-categories')
    } catch (error) {
      console.log(error);
    }
  }
  return (
    <div className='max-w-2xl mx-auto py-4'>
      <h1 className='text-red-700 text-center font-bold text-[24px]'>Thêm mới danh mục</h1>
      <form onSubmit={handleSubmit(addcategory)} className='flex p-4 flex-col gap-2 [&_input]:border [&_input]:px-4 [&_input]:py-1'>
        <input {...register("name", { required: true })} type='text' placeholder='Tên danh mục' />
        {(errors.name?.type === "required") && <span className='text-red-600 text-[12px]'>Tên không để trống</span>}
        <input {...register("image")} type='text' placeholder='Ảnh danh mục' />
        <div className='flex justify-center'>
          <button className='bg-green-900 text-white px-4 py-2'>Thêm mới</button>
        </div>
      </form>
    </div>
  )
}

export default AddCategory