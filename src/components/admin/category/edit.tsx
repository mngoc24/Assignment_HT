import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate, useParams } from 'react-router-dom';
import { api } from '../../../config/axios';
import { ICategory } from '../../../interface/product';

const EditCategory = () => {
  const { register, handleSubmit, formState: { errors }, reset } = useForm<ICategory>();
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    const getCategoryById = async () => {
      try {
        const { data } = await api.get(`categories/${id}`);
        reset({
          name: data.name,
          image: data.image,
        });
      } catch (error) {
        console.log('Error fetching category:', error);
      }
    };
    getCategoryById();
  }, []);

  const editCategory = async (data: ICategory) => {
    try {
      await api.put(`categories/${id}`, data);
      alert('Cập nhật danh mục thành công');
      navigate('/dashboard/list-categories');
    } catch (error) {
      console.log('Error updating category:', error);
    }
  };

  return (
    <div className="max-w-2xl mx-auto py-4">
      <h1 className="text-red-700 text-center font-bold text-[24px]">Chỉnh sửa danh mục</h1>
      <form onSubmit={handleSubmit(editCategory)} className="flex p-4 flex-col gap-2 [&_input]:border [&_input]:px-4 [&_input]:py-1">
        <input {...register('name', { required: 'Tên danh mục không được để trống' })} type="text" placeholder="Tên danh mục"/>
        {errors.name && <span className="text-red-600 text-[12px]">{errors.name.message}</span>}
        <input {...register('image', { required: 'Ảnh danh mục không được để trống' })} type="text" placeholder="Ảnh danh mục"/>
        {errors.image && <span className="text-red-600 text-[12px]">{errors.image.message}</span>}
        <div className="flex justify-center">
          <button className="bg-green-900 text-white px-4 py-2">Cập nhật</button>
        </div>
      </form>
    </div>
  );
};

export default EditCategory;
