import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import IProduct, { ICategory } from '../../../interface/product';
import { useForm } from 'react-hook-form';
import { api } from '../../../config/axios';

const AddProduct = () => {
  const { register, handleSubmit, formState: { errors } } = useForm<IProduct>();
  const [categories, setCategories] = useState<ICategory[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const { data } = await api.get('categories');
        setCategories(data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchCategories();
  }, []);

  const addProduct = async (data: IProduct) => {
    try {
      await api.post('products', data);
      alert('Thêm mới sản phẩm thành công!');
      navigate('/dashboard/list-products');
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="max-w-2xl mx-auto py-4">
      <h1 className="text-red-700 text-center font-bold text-[24px]">Thêm mới sản phẩm</h1>
      <form onSubmit={handleSubmit(addProduct)} className="flex p-4 flex-col gap-2 [&_input]:border [&_select]:border [&_input]:px-4 [&_input]:py-1">
        <input {...register("name", { required: "Tên không được để trống" })} type="text" placeholder="Tên sản phẩm"/>
        {errors.name && <span className="text-red-600 text-[12px]">{errors.name.message}</span>}

        <input {...register("image", { required: "Ảnh sản phẩm không được để trống" })} type="text" placeholder="Ảnh sản phẩm"/>
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

        <input {...register('shortDesc', { required: "Mô tả ngắn không được để trống" })} type="text" placeholder="Mô tả ngắn"/>
        {errors.shortDesc && <span className="text-red-600 text-[12px]">{errors.shortDesc.message}</span>}

        <input {...register('description', { required: "Mô tả chi tiết không được để trống" })} type="text" placeholder="Mô tả chi tiết"/>
        {errors.description && <span className="text-red-600 text-[12px]">{errors.description.message}</span>}

        <div className="flex justify-center">
          <button className="bg-green-900 text-white px-4 py-2">Thêm mới</button>
        </div>
      </form>
    </div>
  );
};

export default AddProduct;
