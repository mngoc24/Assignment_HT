import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate, useParams } from 'react-router-dom';
import IProduct, { ICategory, ProductInput } from '../../../interface/product';
import { api } from '../../../config/axios';

const EditProduct = () => {
  const { register, handleSubmit, formState: { errors }, reset } = useForm<IProduct>();
  const navigate = useNavigate();
  const params = useParams();
  const [categories, setCategories] = useState<ICategory[]>([]);

  useEffect(() => {
    const getProductById = async () => {
      try {
        const { data } = await api.get(`products/${params.id}`);
        reset({
          name: data.name,
          image: data.image,
          price: data.price,
          category: data.category,
        });
      } catch (error) {
        console.log(error);
      }
    };
    const fetchCategories = async () => {
      try {
        const { data } = await api.get('categories');
        setCategories(data);
      } catch (error) {
        console.log(error);
      }
    };
    getProductById();
    fetchCategories();
  }, [params.id, reset]);

  const onSubmit = async (data: ProductInput) => {
    try {
      await api.put(`products/${params.id}`, data);
      alert('Cập nhật thành công');
      navigate('/dashboard/list-products');
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="max-w-2xl mx-auto py-4">
      <h1 className="text-red-700 text-center font-bold text-[24px]">Cập nhật sản phẩm</h1>
      <form onSubmit={handleSubmit(onSubmit)} className="flex p-4 flex-col gap-2 [&_select]:border [&_input]:border [&_input]:px-4 [&_input]:py-1">
        <input {...register("name", { required: "Tên không được để trống" })} type="text" placeholder="Tên sản phẩm" />
        {errors.name && <span className="text-red-600 text-[12px]">{errors.name.message}</span>}
        <input {...register("image", { required: "Ảnh sản phẩm không được để trống" })} type="text" placeholder="Ảnh sản phẩm" />
        {errors.image && <span className="text-red-600 text-[12px]">{errors.image.message}</span>}
        <input {...register("price", {required: "Giá không được để trống", validate: (value: any) => (!isNaN(value) && Number(value) > 10000) || "Giá phải lớn hơn 10.000"})} type="text" placeholder="Giá sản phẩm"/>
        {errors.price && <span className="text-red-600 text-[12px]">{errors.price.message}</span>}
        <select {...register("category", { required: "Vui lòng chọn danh mục" })}>
          <option value="">Chọn danh mục</option>
          {categories.map((category) => (
            <option key={category.catId} value={category.name}>
              {category.name}
            </option>
          ))}
        </select>
        {errors.category && <span className="text-red-600 text-[12px]">{errors.category.message}</span>}

        <input {...register("shortDesc")} type="text" placeholder='Mô tả ngắn' />
        
        <input {...register("description")} type="text" placeholder='Mô tả chi tiết'/>
        
        <div className="flex justify-center">
          <button className="bg-green-900 text-white px-4 py-2">Cập nhật</button>
        </div>
      </form>
    </div>
  );
};

export default EditProduct;
