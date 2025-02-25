import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import { api } from '../../../config/axios';
import IProduct from '../../../interface/product';


const ListProducts = () => {
  const [products,setProduct] = useState<IProduct[]>([])
  const handleLoad = async ()=>{
      try {
          const {data} = await api.get(`products`)
          setProduct(data)
      } catch (error) {
        console.log(error)
      }
  }
  useEffect(()=>{ 
    handleLoad()
  },[])
  const onDelete = async(id:number|string)=>{
    try {
      if (confirm("Bạn chắc chứ?")){
          await api.delete(`products/${id}`)        
          const newproducts = products.filter(item=>item.id!=id)          
          alert('Xóa thành công')
          setProduct(newproducts)
      }
    } catch (error) {
        console.log(error);        
    }
  }
  
  return (
    <>     
      <h1 className='text-[36px] text-[#acaa13] mb-[60px] text-center'>Danh sách sản phẩm:</h1>
      <table className='[&_*]:text-left [&_td]:px-[10px] [&_td]:py-2 [&_th]:px-[10px] max-w-[700px] mx-auto border [&_td]:border [&_th]:border'>
        <thead>
          <tr>
            <th className='w-[50px]'>STT</th>
            <th className='w-[300px]'>Tên sản phẩm</th>
            <th className='w-[150px]'>Giá tiền</th>
            <th className='w-[300px]'>Hình ảnh</th>
            <th className='w-[300px]'>Danh mục</th>
            <th className='w-[300px]'>Mô tả ngắn</th>
            <th className='w-[300px]'>Mô tả chi tiết</th>
            <th className='w-[150px]'>Thao tác</th>
          </tr>
        </thead>
        <tbody>
          {
            products.map((item,index)=>(
              <tr key={item.id}>
                  <td>{index+1}</td>
                  <td>{item.name}</td>
                  <td>{item.price}</td>
                  <td><img src={item.image} alt="" /></td>
                  <td>{item.category}</td>
                  <td>{item.shortDesc}</td>
                  <td>{item.description}</td>
                  <td className='flex'>
                      <Link to={`/dashboard/edit-product/${item.id}`} className='bg-[#3c11e8] text-white px-[15px] py-[4px] rounded'>Sửa</Link>
                      <button onClick={()=>onDelete(`${item.id}`)} className='bg-[#7a0a0c] text-white px-[15px] py-[4px] rounded'>Xóa</button>
                  </td>
              </tr>
            ))
          }
        </tbody>
      </table>      
    </>
  )
}

export default ListProducts